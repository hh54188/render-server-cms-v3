var fs = require('fs');
var path = require('path');

var toolConfigFilePath = path.join('.', 'config.js');

function getLatestConfig() {
	var result = '';	
	try {
		result = fs.readFileSync(toolConfigFilePath, 'utf-8');
	} catch (e) {
		console.log('config.js syntax error------>', e);
	}
	return result;
}

var _config = getLatestConfig();

module.exports = {
	getConfig: function () {
		return _config;
	}
}
