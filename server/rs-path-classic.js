var path = require('path');
var fs = require('fs');

function checkPathIsAvailable(path) {
	var checkExist = fs.lstatSync || fs.statSync || fs.existsSync;
	try {
        checkExist(path);
    } catch (e) {
    	return false;
    }
    return true;
}

var REQUEST_FOLDER_NAME = 'request';
var CREATIVE_JS_NAME = 'creative.js';

var renderServerDirName = 'render-server'
var isProduction = false;
var configFilePath = path.join('.', 'config.js');

// 默认该预览工具文件夹会和render-server放在同一级别（将来也可以支持用户自由配置）
function getRootPath(forceInProduction) {
	return path.resolve(
		path.join('.', '..', renderServerDirName, (isProduction? 'production': ''))
	);
}

function getSrcPath() {
	return path.resolve(path.join(getRootPath(), 'src'));
}

function getClassicTemplateRootPath() {
	return path.resolve(path.join(getRootPath(), 'src', 'rs', 'template'));
}

function getClassicTemplateFolderPath(templateName) {
	return path.join(
		getClassicTemplatePath(), 
		templateName
	);
}

function getClassicTemplateRequestFolderPath(templateName) {
	return path.join(
		getClassicTemplateFolderPath(templateName), 
		REQUEST_FOLDER_NAME
	);
}

function getClassicTemplateRequestFilePath(templateName, requestInfoName) {
	return path.join(
		getClassicTemplateRequestFolderPath(templateName), 
		requestInfoName
	);
}

module.exports = {
	updateRenderServerBasic: function (config) {
		isProduction = config.production;
		renderServerDirName = config.render_server_folder;		
	},
	updateRenderServerDirName: function (name) {
		renderServerDirName = name;
	},
	updateProductionFlag: function (val) {
		isProduction = val;
	},
	getRenderServerDirName: function () {
		return renderServerDirName;
	},
	getConfigFilePath: function () {
		return path.join(getSrcPath(), 'rs', 'common', 'config', 'global.js');
	},
	checkIsProduction: function () {
		return isProduction;
	},
	getRootPath: function () {
		return getRootPath();
	},
	getSrcPath: function () {
		return getSrcPath();
	},
	getTemporarySrcPath: function (inProduction) {
		return path.resolve(path.join('.', '..', renderServerDirName, (inProduction ? 'production': ''), 'src'));
	},
	getInterfaceProtoPath: function (inProduction) {
		return path.join('.', '..', renderServerDirName, (inProduction ? 'production': ''), 'interface', 'rs.proto');
	},
	getProtocolProtoPath: function (inProduction) {
		return path.join('.', '..', renderServerDirName, (inProduction ? 'production': ''), 'src', 'rs', 'api', 'protocol', 'rs.proto');
	},
	getStyleTypeFilePath: function (inProduction) {
		return path.join('.', '..', renderServerDirName, (inProduction ? 'production': ''), 'src', 'rs', 'common', 'model', 'styleType.js');
	},
	Classic: {
		getTemplateRootPath: getClassicTemplateRootPath,
		getTemplateFolderPath: getClassicTemplateFolderPath,
		getTemplateRequestFolderPath: getClassicTemplateRequestFolderPath,
		getTemplateRequestFilePath: getClassicTemplateRequestFilePath
	}
}