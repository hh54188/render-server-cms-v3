var net = require('net');
var util = require('./util.js');
var path = require('path');
var child_process = require('child_process');
require('node-oojs');
var _renderServerPath = '';
var _isProduction = false;
var _rsProcess = null;
var _port = '8124';

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

function lunch(renderServerRoot) {
    if (_rsProcess) {
        kill();
    }

    if (!renderServerRoot) {
        return;
    }
    
    _rsProcess = child_process.fork(
        path.join(renderServerRoot, 'master.js'),
        {
            cwd: renderServerRoot
        }
    );
}

function kill() {
    if (_rsProcess) {
        _rsProcess.kill();
    }
}

function getConfig(renderSrcPath) {
	oojs.setPath(renderSrcPath);
	var configObj = oojs.using('rs.common.config.global');
	configObj = oojs.reload('rs.common.config.global');
	return {
	    rs: {
	        port: configObj.server.port
	    },
	    db: {
	        name: configObj.db.database,
	        port: configObj.db.port,
	        host: configObj.db.host,
	        account: configObj.db.readUsername,
	        password: configObj.db.readPassword
	    }
	}
}

module.exports = {  
    getConfig: getConfig,
    getRunningState: getRunningState,
    lunch: lunch,
    kill: kill
}