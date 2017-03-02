var path = require('path');
var fs = require('fs');
var rsPath = require('./rs-path.js');
require('node-oojs');

function getConfig() {
	oojs.setPath(rsPath.getSrcPath());
	var configObj = oojs.using('rs.common.config.global');
	configObj = oojs.reload('rs.common.config.global');
	return {
	    rs: {
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

module.exports = {
	getConfig: getConfig
}