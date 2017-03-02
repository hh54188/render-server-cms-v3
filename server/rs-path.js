var path = require('path');
var fs = require('fs');

var REQUEST_FOLDER_NAME = 'request';
var CREATIVE_JS_NAME = 'creative.js';
var RENDER_SERVER_DIRNAME = 'render-server';
var isProduction = false;

function checkPathIsAvailable(path) {
	var checkExist = fs.lstatSync || fs.statSync || fs.existsSync;
	try {
        checkExist(path);
    } catch (e) {
    	return false;
    }
    return true;
}

function getRootPath(isProduction) {
	return path.resolve(
		path.join('.', '..', RENDER_SERVER_DIRNAME, (isProduction? 'production': ''))
	);
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
    checkPathIsAvailable: checkPathIsAvailable,
    getRootPath: getRootPath,
    getSrcPath: getSrcPath,
    getConfigFilePath: getConfigFilePath,
    getCacheFolderPath: getCacheFolderPath,
    getTemplateFolderPath: getTemplateFolderPath,
    getStyleFolderPath: getStyleFolderPath
}