const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

const path = require('path');
const url = require('url');

const ipc = require('electron').ipcMain;
const dialog = require('electron').dialog;

const renderSupervisor = require('./client/renderSupervisor.js');

const fs = require('fs');

let manualLunch = false;

// ipcMain 不能主动触发事件，只能被动的响应来自ipcRender的请求
ipc.on('get-render-state', (event) => {

    // 如果用户正在主动（手动）启动RS
    // 则不响应来自client查询 RS 运行状态的请求
    if (manualLunch) {
        return;
    }
    
    renderSupervisor.isRunning((error, result) => {
        if (result) {
            event.sender.send('render-lunched', 'RUNNING');
            return;
        }

        event.sender.send('render-lunched', 'OFFLINE');
    });
});

ipc.on('get-templates', (event) => {
    let styles = [];
    let error = ''
    try {
        styles = renderSupervisor.collectTemplates();
    } catch (e) {
        error = e.toString();
    }
    event.sender.send('templates-received', error, styles);
});

ipc.on('kill-render', (event) => {
    renderSupervisor.kill();
}); 

ipc.on('lunch-render', (event) => {

    manualLunch = true;
    let timer;
    renderSupervisor.kill();
    renderSupervisor.lunch((errorInfo) => {
        clearInterval(timer);
        console.log('main.js: lunch failed!', 'FAILED', errorInfo);        
        event.sender.send('render-lunched', 'FAILED', errorInfo);
        manualLunch = false;        
    });

    let maxTimeout = 30;
    let timeoutCount = maxTimeout;
    timer = setInterval(() => {
        timeoutCount--;
        console.log('main.js: lunch timeCount--->', timeoutCount);
        renderSupervisor.isRunning((error, result) => {
            if (error) {
                console.log('main.js: lunch failed!', 'FAILED', error);

                renderSupervisor.kill();
                clearInterval(timer);

                event.sender.send('render-lunched', 'FAILED', error);                
                manualLunch = false;

                return;
            }

            // 如果端口已经被占用，表示运行成功
            if (result) {
                console.log('main.js: lunch success!', 'Cost', maxTimeout - timeoutCount, 'seconds');
                clearInterval(timer);
                
                event.sender.send('render-lunched', 'RUNNING');
                manualLunch = false;

                return;                  
            }

            // 如果已经超时并且端口号仍未被占用
            // 表示启动失败
            if (!timeoutCount && !result) {
                console.log('main.js: lunch failed! Timeout!');
                
                renderSupervisor.kill();                
                clearInterval(timer);
                
                event.sender.send('render-lunched', 'TIMEOUT');
                manualLunch = false;

                return;
            }

            event.sender.send('render-lunched', 'WAITING', timeoutCount);
        });
    }, 1000);
})

ipc.on('open-directory-dialog', (event) => {
    dialog.showOpenDialog({
        properties: ['openDirectory']
    }, (directoryPathArr) => {
        if (directoryPathArr && directoryPathArr.length) {
            let directoryPath = directoryPathArr[0];
            let errorMessage = pathIsNotAvailable(directoryPath);

            if (!errorMessage) {
                let fileContent = fs.readFileSync(path.join(__dirname, 'config.json'), 'utf-8');
                let configObj = JSON.parse(fileContent);

                configObj.path = directoryPath;
                fs.writeFileSync(path.join(__dirname, 'config.json'), JSON.stringify(configObj), 'utf-8');
            }

            event.sender.send('directory-selected', errorMessage, directoryPath);
        }
    })
})

ipc.on('read-config-file', (event) => {
    const readFileCallback = (errorMessage, cfgObj) => {
        console.log('main.js: readFileCallback--->', cfgObj);
        event.sender.send('config-readed', errorMessage, cfgObj);}
    let fileContent = '';
    
    try {
        fileContent = fs.readFileSync(path.join(__dirname, 'config.json'), 'utf-8');
    } catch(e) {
        readFileCallback("Config file doesn't exist");
        return;
    }

    // 文件内容格式被修改，无法转化为JSON读取
    try {
        fileContent = JSON.parse(fileContent);
    } catch(e) {
        readFileCallback("Config file content can't be parsed to JSON");
        return;
    }

    // 配置文件中rs路径不存在
    if (!fileContent.path) {
        readFileCallback("Config 'path' value doesn't exist");
        return;
    }

    let errorMessage = ''
    if (errorMessage = pathIsNotAvailable(fileContent.path)) {
        readFileCallback(errorMessage);
        return;        
    }
    console.log('main.js: config.json--->', fileContent);
    renderSupervisor.setRsPath(fileContent.path, fileContent.production);
    renderSupervisor.getConfig((cfgObj) => {
        cfgObj.watchFileChange = fileContent.watch === "false" ? false : true;
        console.log('main.js: config object--->', cfgObj);
        readFileCallback(null, cfgObj);
    })
});

function checkFileExist(path_string) {
    return fs.existsSync(path_string);
}

function checkFileIsFolder(path_string) {
    return fs.lstatSync(path_string).isDirectory();
}

function pathIsNotAvailable(path_string) {
    
    // 配置文件中rs路径存在但在系统中找不到
    if (!checkFileExist(path_string)) {
        return "The file of the path doesn't exist ";
    }    
    // 配置文件中rs路径是一个文件非文件夹
    if (!checkFileIsFolder(path_string)) {
        return "The file of the path is not a directory";        
    }

    // 配置文件中目录并非是rs目录
    if (!checkDirectoryIsRS(path_string)) {
        return "The directory is not render server directory";        
    }

    return false;
}

function checkDirectoryIsRS(path_string) {
    let files = fs.readdirSync(path_string);
    if (!files || !files.length) {
        return false;
    }

    if (files.indexOf('production') < 0 
        || files.indexOf('master.js') < 0
        || files.indexOf('cache') < 0) {
        return false;
    }

    return true;
}

let mainWindow;

function createWindow () {
    // 启动时全屏化
    // 以供调试使用
    // 正式发布时无需该段代码
    const screenElectron = electron.screen;
    const mainScreen = screenElectron.getPrimaryDisplay();
    const dimensions = mainScreen.size;
    const screenWidth = dimensions.width;
    const screenHeight = dimensions.height;

    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: screenWidth, 
        height: screenHeight,
    })

    // mainWindow.setMenu(null);

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }))

    // Open the DevTools.
    mainWindow.webContents.openDevTools()

    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}
app.on('ready', createWindow)

app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.    
    if (mainWindow === null) {
        createWindow()
    }
});