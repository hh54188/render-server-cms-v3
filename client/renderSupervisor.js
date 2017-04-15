const net = require('net');
const util = require('./util.js');
const path = require('path');
const child_process = require('child_process');
require('node-oojs');
const rsPath = require('./rsPath.js');

let _rsProcess = null;
let _pathStr = '';
let _production = false;


function setRenderServerPath(path_str, production) {
    console.log(path_str, production);
    _pathStr = path_str;
    _production = production == undefined ? false : !!production;
    rsPath.setRenderServerPath(path_str, production);
}

// http://stackoverflow.com/questions/29860354/in-nodejs-how-do-i-check-if-a-port-is-listening-or-in-use
function portInUse(port, callback) {
    var server = net.createServer(function(socket) {
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
    if (portNumber && util.validatePortNumber(portNumber)){
        portInUse(portNumber, function (returnValue) {
            callback(null, returnValue);
        })
    } else {
        callback('error');
    }
}

function lunch() {
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
            cwd: renderServerRootPath
        }
    );
}

function kill() {
    if (_rsProcess) {
        _rsProcess.kill();
    }
}

function getConfig(callback) {
    let renderSrcPath = rsPath.getSrcPath();
	oojs.setPath(renderSrcPath);
	var configObj = oojs.using('rs.common.config.global');
	configObj = oojs.reload('rs.common.config.global');

    let absolutePath = _pathStr;
    let enableProductionDir = _production;
    let port = configObj.server.port;
    let dbName = configObj.db.database;
    let dbAccount = configObj.db.readUsername;
    let dbPassword = configObj.db.readPassword;
    let dbPort = configObj.db.port;

    getRunningState(port, (error, boolResult) => {
        let isRunning = boolResult;
        callback({
            isRunning,
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

module.exports = {
    setRsPath: setRenderServerPath,
    getConfig: getConfig,
    lunch: lunch,
    kill: kill
}