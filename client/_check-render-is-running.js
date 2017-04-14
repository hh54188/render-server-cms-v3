var checkPortService = require('./check-port-in-use.js');
var util = require('util');
var port = '8124';

module.exports = {
	setRenderPort: function (number) {
		if (util.validatePortNumber(number)) {
			port = number
		}
	},
	getRunningState: function (callback) {
		if (port){
			checkPortService.portInUse(port, function (returnValue) {
				callback(returnValue);
			})
		}
	}
}