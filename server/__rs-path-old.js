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
var RENDER_SERVER_DIRNAME = 'render-server';
var isProduction = false;

var configFilePath = path.join('.', 'config.js');
// 可能出现缺少字段，格式不正确，没法转换为JSON等问题
// 就不一一处理了
// 统一捕获错误
try {
	if (checkPathIsAvailable(configFilePath)) {
		var config = JSON.parse(fs.readFileSync(configFilePath, 'utf-8'));
		isProduction = config.production ? config.production : isProduction;
		RENDER_SERVER_DIRNAME = config.render_server_folder ? config.render_server_folder : RENDER_SERVER_DIRNAME;
	};	
} catch (e) {
	console.log("config.js syntax error--->", e);
}

// 默认该预览工具文件夹会和render-server放在同一级别（将来也可以支持用户自由配置）
var RS_ROOT = path.resolve(path.join('.', '..', RENDER_SERVER_DIRNAME, (isProduction? 'production': '')));
var RS_SRC = path.resolve(path.join(RS_ROOT, 'src'));
var RS_CLASSIC_TEMPLATE = path.resolve(path.join(RS_ROOT, 'src', 'rs', 'template'));

var RS_STANDARDIZE_CACHE = path.resolve(path.join(RS_ROOT, 'cache'));
var RS_STANDARDIZE_TEMPLATE = path.resolve(path.join(RS_STANDARDIZE_CACHE, 'template'));
var RS_STANDARDIZE_STYLE = path.resolve(path.join(RS_STANDARDIZE_CACHE, 'style'));

// Classic
function getClassicTemplateFolderPath(templateName) {
	return path.join(RS_CLASSIC_TEMPLATE, templateName);
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

// Standardize
function getStandardizeTemplateFolderPath(templateName) {
	return path.join(RS_STANDARDIZE_TEMPLATE, templateName);
}

function getStandardizeTemplateRequestFolderPath(templateName) {
	return path.join(
		getStandardizeTemplateFolderPath(templateName), 
		REQUEST_FOLDER_NAME
	);
}

function getStandardizeTemplateRequestFilePath(templateName, requestInfoName) {
	return path.join(
		getStandardizeTemplateRequestFolderPath(templateName), 
		requestInfoName
	);	
}

// Standarize Only
function getStandardizeTemplateStylePath(styleName) {
	return path.join(
		RS_STANDARDIZE_STYLE,
		styleName
	);
}

function getStandardizeCreativePath(templateName) {
	return path.join(
		getStandardizeTemplateFolderPath(templateName),
		CREATIVE_JS_NAME
	);
}

module.exports = {
	getRenderServerDirName () {
		return RENDER_SERVER_DIRNAME;
	},
	getConfigFilePath: function () {
		return path.join(RS_ROOT, 'src', 'rs', 'common', 'config', 'global.js');
	},
	checkIsProduction: function () {
		return isProduction;
	},
	enbaleProduction: function () {
		isProduction = true;
	},
	getRSRootPath: function () {
		return RS_ROOT;
	},
	getSrcPath: function () {
		return RS_SRC;
	},
	Classic: {
		getTemplateRootPath: function () {
			return RS_CLASSIC_TEMPLATE;
		},
		getTemplateFolderPath: getClassicTemplateFolderPath,
		getTemplateRequestFolderPath: getClassicTemplateRequestFolderPath,
		getTemplateRequestFilePath: getClassicTemplateRequestFilePath
	},
	Standarize: {
		getCacheRootPath: function () {
			return RS_STANDARDIZE_CACHE;
		},
		getTemplateRootPath: function () {
			return RS_STANDARDIZE_TEMPLATE;
		},
		getStyleRootPath: function () {
			return RS_STANDARDIZE_STYLE;
		},
		getTemplateFolderPath: getStandardizeTemplateFolderPath,
		getTemplateRequestFolderPath: getStandardizeTemplateRequestFolderPath,
		getTemplateRequestFilePath: getStandardizeTemplateRequestFilePath,
		getStylePath: getStandardizeTemplateStylePath,
		getCreativePath: getStandardizeCreativePath
	}
}