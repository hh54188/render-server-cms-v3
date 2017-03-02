var path = require('path');
var fs = require('fs');
var PubSub = require('pubsub-js');
var rsPath = require('../global-services/rs-path-classic.js');
var diffService = require('../services/diff-object.js');
var checkRenderIsRunning = require('../services/check-render-is-running.js');
// var monitorConfig = require('../services/monitor-config.js');
require('node-oojs'); // 需要本地安装node-oojs

// 获取cms的配置内容，主要有
// 1. 监视的render server目录
// 2. 是否监视目录下的production文件夹
function getCMSConfig() {
	var cmsConfigFilePath = path.join('.', 'config.js');
	var cmsConfigContent = fs.readFileSync(cmsConfigFilePath, 'utf-8');
	var cmsConfigObject = JSON.parse(cmsConfigContent);
	return cmsConfigObject;
}

function getState() {
	rsPath.updateRenderServerBasic(getCMSConfig());
	console.log('src path--->', rsPath.getSrcPath());
	// 如果cms config设置错误的话，这里有可能会报错
	oojs.setPath(rsPath.getSrcPath());
	var configObj = oojs.using('rs.common.config.global');
	configObj = oojs.reload('rs.common.config.global');
	var renderServerAbsolutePath = rsPath.getRootPath();
	// 相对于node执行目录"."，而非相对于当前文件目录__dirname
	var renderServerRelativePath = path.relative(path.join('.'), rsPath.getRootPath());
	checkRenderIsRunning.setRenderPort(configObj.server.port);
	return {
	    rs: {
	        isRunning: checkRenderIsRunning.getRenderState(),
	        directoryName: rsPath.getRenderServerDirName(),
	        absoluteDirectoryPath: renderServerAbsolutePath,
	        relativeDirectoryPath: renderServerRelativePath,
	        isProduction: rsPath.checkIsProduction(),
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

function updateCMSConfigFile(property, value) {
	var cmsConfigFilePath = path.join('.', 'config.js');
	var cmsConfigContent = fs.readFileSync(cmsConfigFilePath, 'utf-8');
	var cmsConfigObject = JSON.parse(cmsConfigContent);
	cmsConfigObject[property] = value;
	fs.writeFileSync(cmsConfigFilePath, JSON.stringify(cmsConfigObject, null, 4));
}

function updateConfigFile(diffArr) {
	var configFilePath = rsPath.getConfigFilePath();
	var content = fs.readFileSync(configFilePath, 'utf-8');
	var cmsConfigBeUpdated = false;

	diffArr.forEach(function (diffPair) {
		var path = diffPair.path;
		var oldValue = diffPair.oldValue;
		var newValue = diffPair.newValue;

		if (path.indexOf('directoryName') > -1) {
			updateCMSConfigFile('render_server_folder', newValue);
			rsPath.updateRenderServerDirName(newValue);
			cmsConfigBeUpdated = true;
			return;
		}

		if (path.indexOf('isProduction') > -1) {
			updateCMSConfigFile('production', newValue);
			rsPath.updateProductionFlag(newValue);
			cmsConfigBeUpdated = true;
			return;
		}

		content = content.replace(oldValue, newValue);
	});

	fs.writeFileSync(configFilePath, content);
	// 如果配置文件遭到了修改，则所有数据都需要重新读取
	// 所以需要把新的数据推送给客户端
	if (cmsConfigBeUpdated) {
		PubSub.publish('CONFIG_STATE_UPDATED');
	}
}

var _state = getState();

PubSub.subscribe('CONFIG_STATE_UPDATED', function () {
	console.log('------CONFIG_STATE_UPDATED------');
	var diffs = diffService.diff(_state, _state = getState());
	console.log('diffs--->', diffs);
	console.log('state--->', _state);
	PubSub.publish('PUSH_CONFIG_STATE_UPDATED', diffs);
});

module.exports = {
	getState: function () {
		return _state;
	},
	updateConfigFile: updateConfigFile
}