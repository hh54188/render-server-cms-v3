var fs = require('fs');
var path = require('path');

var toolConfigFilePath = path.join('.', 'config.json');

function getConfig() {
	var result = '';	
	try {
		result = JSON.parse(fs.readFileSync(toolConfigFilePath, 'utf-8'));
	} catch (e) {
		console.log('config.js syntax error------>', e);
	}
	return result;
}


module.exports = {
	getConfig: getConfig,
	getToolConfigPath: function () {
		return toolConfigFilePath;
	}
}
