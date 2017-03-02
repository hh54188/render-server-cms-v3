var path = require('path');
var fs = require('fs');
var util = require('./util.js');

var REQUEST_FOLDER_NAME = 'request';
var CREATIVE_JS_NAME = 'creative.js';
var RENDER_SERVER_PATH = '.';
var isProduction = false;


function setRenderServerPath(renderServerPath) {
    RENDER_SERVER_PATH = renderServerPath.replace(/\r/g, '\\r')
                                .replace(/\n/g, '\\n')
                                .replace(/\s/g, '\\s');

    if (!util.isAbsolutePath(RENDER_SERVER_PATH)) {
        RENDER_SERVER_PATH = path.resolve(RENDER_SERVER_PATH);
    }
}

function getRenderServerPath() {
    return RENDER_SERVER_PATH;
}

function getRootPath(isProduction) {
    return path.join(RENDER_SERVER_PATH, (isProduction? 'production': ''))
}

function getSrcPath(isProduction) {
	return path.resolve(path.join(getRootPath(isProduction), 'src'));
}

function getConfigFilePath() {
    return path.join(getSrcPath(), 'rs', 'common', 'config', 'global.js');   
}

function getCacheFolderPath(isProduction) {
    return path.resolve(path.join(getRootPath(isProduction), 'cache'));
}

function getTemplateFolderPath(isProduction) {
    return path.resolve(path.join(getCacheFolderPath(isProduction), 'template'));
}

function getStyleFolderPath(isProduction) {
    return path.resolve(path.join(getCacheFolderPath(isProduction), 'style'));
}


module.exports = {
    setRenderServerPath: setRenderServerPath,
    getRenderServerPath: getRenderServerPath,
    getRootPath: getRootPath,
    getSrcPath: getSrcPath,
    getConfigFilePath: getConfigFilePath,
    getCacheFolderPath: getCacheFolderPath,
    getTemplateFolderPath: getTemplateFolderPath,
    getStyleFolderPath: getStyleFolderPath
}