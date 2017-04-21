const net = require('net');
const util = require('./util.js');
const path = require('path');
const child_process = require('child_process');
require('node-oojs');
const rsPath = require('./rsPath.js');
const fs = require('fs');

let _rsProcess = null;
let _pathStr = '';
let _production = false;


function setRenderServerPath(path_str, production) {
    console.log('renderSupervisor: setRenderServerPath--->', path_str, production);
    _pathStr = path_str;
    _production = production == undefined ? false : !!production;
    rsPath.setRenderServerPath(path_str, production);
}

// http://stackoverflow.com/questions/29860354/in-nodejs-how-do-i-check-if-a-port-is-listening-or-in-use
function portInUse(port, callback) {
    let server = net.createServer(function(socket) {
        socket.write('Echo server\r\n');
        socket.pipe(socket);
    });

    server.listen(port);
    server.on('error', function (e) {
        callback(true);
    });
    
    server.on('listening', function (e) {
        server.close();
        callback(false);
    });
};

function getRunningState(portNumber, callback) {

    if (util.isFunctionType(portNumber)) {
        callback = portNumber;

        let renderSrcPath = rsPath.getSrcPath();
        oojs.setPath(renderSrcPath);
        var configObj = oojs.using('rs.common.config.global');
        configObj = oojs.reload('rs.common.config.global');
        portNumber = configObj.server.port;
    }


    if (portNumber && util.validatePortNumber(portNumber)){
        portInUse(portNumber, function (returnValue) {
            callback(null, returnValue);
        })
    } else {
        callback('error');
    }
}

function lunch(failCallback) {
    let renderServerRootPath = rsPath.getRootPath();

    if (_rsProcess) {
        kill();
    }

    if (!renderServerRootPath) {
        return;
    }
    
    _rsProcess = child_process.fork(
        path.join(renderServerRootPath, 'master.js'),
        {
            cwd: renderServerRootPath,
            silent: true
        }
    );

    _rsProcess.stdout.on('data', (data) => {
        console.log('stdout--->', data.toString());
    });

    _rsProcess.stderr.on('data', (data) => {
        console.log('stderr--->', data.toString());       
        this.kill();
        if (failCallback) {
            failCallback(data.toString());
        }
    })
}

function kill() {
    if (_rsProcess) {
        _rsProcess.kill();
    }
}

function convertToBoolean(value) {
    if (value === 'true') {
        return true;
    }
    return false;
}

function getConfig(callback) {
    let renderSrcPath = rsPath.getSrcPath();
    console.log('renderSupervisor.js renderSrcPath--->', renderSrcPath);
	oojs.setPath(renderSrcPath);
	var configObj = oojs.using('rs.common.config.global');
	configObj = oojs.reload('rs.common.config.global');

    let absolutePath = _pathStr;
    let enableProductionDir = convertToBoolean(_production);
    let port = configObj.server.port.toString();
    let dbName = configObj.db.database.toString();
    let dbAccount = configObj.db.readUsername.toString();
    let dbPassword = configObj.db.readPassword.toString();
    let dbPort = configObj.db.port.toString();

    getRunningState(port, (error, boolResult) => {
        let lunchState = boolResult == false ? 'OFFLINE': 'SUCCESS';
        let lunchInfo = '';
        callback({
            lunchState,
            lunchInfo,
            absolutePath,
            enableProductionDir,
            port,
            dbName,
            dbAccount,
            dbPassword,
            dbPort      
        });
    });
}

function collectTemplates() {
    let allStyles = [];
    let allTemplates = [];

    let styleFileNames = fs.readdirSync(rsPath.getStyleFolderPath());
    allStyles = styleFileNames.map((fileName) => {
        let fileContent = fs.readFileSync(rsPath.getStyleFile(fileName), 'utf-8');
        let styleObj = JSON.parse(fileContent);
        let templates = styleObj.template.map((templateId) => {
            templateId = templateId.toString();
            let templateDescContent = fs.readFileSync(rsPath.getTemplateJsonFilePath(templateId), 'utf-8');
            let templateDescObj = JSON.parse(templateDescContent);
            return templateDescObj;
        });
        allTemplates = allTemplates.concat(templates);
        styleObj.templates = templates;
        return styleObj;
    });

    return allStyles;
    // console.log(allStyles);
    // console.log(allTemplates);
}

module.exports = {
    setRsPath: setRenderServerPath,
    isRunning: getRunningState,
    getConfig: getConfig,
    lunch: lunch,
    kill: kill,
    collectTemplates: collectTemplates
}