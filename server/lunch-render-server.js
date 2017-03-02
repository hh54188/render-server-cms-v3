var path = require('path');
var child_process = require('child_process');
var _renderServerPath = '';
var _isProduction = false;
var _rsProcess = null;
 

function setRenderServerPath(renderServerPath, isProduction) {
    _renderServerPath = renderServerPath;
    _isProduction = isProduction;
}

function lunch() {
    if (_rsProcess) {
        kill();
    }

    if (!_renderServerPath) {
        return;
    }
    
    _rsProcess = child_process.fork(
        path.join(_renderServerPath, (_isProduction? 'production': ''),'master.js'),
        {
            cwd: _renderServerPath
        }
    );
}

function kill() {
    if (_rsProcess) {
        _rsProcess.kill();
    }
}

module.exports = {
    lunch: lunch,
    kill: kill,
    setRenderServerPath: setRenderServerPath
}