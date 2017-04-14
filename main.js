const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

const path = require('path');
const url = require('url');

const ipc = require('electron').ipcMain;
const dialog = require('electron').dialog;

const rsPath = require('./client/rs-path.js');
const render = require('./client/render.js');

const fs = require('fs');

ipc.on('open-directory-dialog', (event) => {
    dialog.showOpenDialog({
        properties: ['openDirectory']
    }, (directory) => {
        if (directory) {
            event.sender.send('selected-directory', directory);
        }
    })
})

ipc.on('read-config-file', (event) => {
    const readFileFailed = (errorMessage) => { event.sender.send('read-config-failed', errorMessage); }
    const readFileSuccessed = (cfgObj) => { event.sender.send('read-config-successed', cfgObj); }
    let fileContent = '';
    
    try {
        fileContent = fs.readFileSync(path.join(__dirname, 'config.json'), 'utf-8');
    } catch(e) {
        readFileFailed("Config file doesn't exist");
        return;
    }

    // 文件内容格式被修改，无法转化为JSON读取
    try {
        fileContent = JSON.parse(fileContent);
    } catch(e) {
        readFileFailed("Config file content can't be parsed to JSON");
        return;
    }

    // 配置文件中rs路径不存在
    if (!fileContent.path) {
        readFileFailed("Config 'path' value doesn't exist");
        return;
    }

    // 配置文件中rs路径存在但在系统中找不到
    if (!checkFileExist(fileContent.path)) {
        readFileFailed("The file of the path doesn't exist ");
        return;
    }    

    // 配置文件中rs路径是一个文件非文件夹
    if (!checkFileIsFolder(fileContent.path)) {
        readFileFailed("The file of the path is not a directory");
        return;
    }

    // 配置文件中目录并非是rs目录
    if (!checkDirectoryIsRS(fileContent.path)) {
        readFileFailed("The directory is not render server directory");
        return;
    }

    let srcPath = rsPath.setRenderServerPath(fileContent.path, false).getSrcPath();
    let cfgObj = render.getConfig(srcPath);
    console.log(cfgObj);
    readFileSuccessed(fileContent);
    
});

function checkFileExist(path_string) {
    return fs.existsSync(path_string);
}

function checkFileIsFolder(path_string) {
    return fs.lstatSync(path_string).isDirectory();
}

function checkDirectoryIsRS(path_string) {
    let files = fs.readdirSync(path_string);
    if (!files || !files.length) {
        return false;
    }

    if (files.indexOf('production') < -1 
        || files.indexOf('master.js') < -1
        || files.indexOf('cache') < -1) {
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