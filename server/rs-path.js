var path = require('path');
var fs = require('fs');
var util = require('./util.js');

var REQUEST_FOLDER_NAME = 'request';
var CREATIVE_JS_NAME = 'creative.js';
var RENDER_SERVER_PATH = '.';
var _isProduction = false;


function setRenderServerPath(renderServerPath, isProduction) {
    RENDER_SERVER_PATH = renderServerPath.replace(/\r/g, '\\r')
                                .replace(/\n/g, '\\n')
                                .replace(/\s/g, '\\s');
    _isProduction = isProduction;

    if (!util.isAbsolutePath(RENDER_SERVER_PATH)) {
        RENDER_SERVER_PATH = path.resolve(RENDER_SERVER_PATH);
    }
}

function getRenderServerPath() {
    return RENDER_SERVER_PATH;
}

function getRootPath(isProduction) {
    isProduction = isProduction == undefined ? _isProduction : isProduction;
    return path.join(RENDER_SERVER_PATH, (isProduction? 'production': ''))
}

function getSrcPath(isProduction) {
    isProduction = isProduction == undefined ? _isProduction : isProduction;    
	return path.resolve(path.join(getRootPath(isProduction), 'src'));
}

function getConfigFilePath() {
    return path.join(getSrcPath(), 'rs', 'common', 'config', 'global.js');   
}

function getCacheFolderPath(isProduction) {
    isProduction = isProduction == undefined ? _isProduction : isProduction;    
    return path.resolve(path.join(getRootPath(isProduction), 'cache'));
}

function getTemplateFolderPath(isProduction) {
    isProduction = isProduction == undefined ? _isProduction : isProduction;    
    return path.resolve(path.join(getCacheFolderPath(isProduction), 'template'));
}

function getSubTemplateFolderAndFilePath(name, isProduction) {
    isProduction = isProduction == undefined ? _isProduction : isProduction;    
    return path.resolve(path.join(getTemplateFolderPath(isProduction), name));
}

function getStyleFolderPath(isProduction) {
    isProduction = isProduction == undefined ? _isProduction : isProduction;    
    return path.resolve(path.join(getCacheFolderPath(isProduction), 'style'));
}

function getStyleFile(fileName, isProduction) {
    isProduction = isProduction == undefined ? _isProduction : isProduction;    
    return path.resolve(path.join(getStyleFolderPath(isProduction), fileName));
}


module.exports = {
    setRenderServerPath: setRenderServerPath,
    getRenderServerPath: getRenderServerPath,
    getRootPath: getRootPath,
    getSrcPath: getSrcPath,
    getConfigFilePath: getConfigFilePath,
    getCacheFolderPath: getCacheFolderPath,
    getTemplateFolderPath: getTemplateFolderPath,
    getSubTemplateFolderAndFilePath: getSubTemplateFolderAndFilePath,
    getStyleFolderPath: getStyleFolderPath,
    getStyleFile: getStyleFile
}