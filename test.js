
// ---
// var path = require('path');
// var lunchRender = require('./server/lunch-render-server.js');
// lunchRender.setRenderServerPath(
//     path.join('.', '..', 'render-server'),  
//     true
// );
// lunchRender.lunch();
// setTimeout(function() {
//     lunchRender.kill();
// }, 1000 * 2);

// ---
// var rsPath = require('./server/rs-path.js');
// rsPath.setRenderServerPath('D:\render-server');
// var rootPath = rsPath.getRootPath();
// var srcPath = rsPath.getSrcPath();
// var configFilePath = rsPath.getConfigFilePath();
// var cacheFolderPath = rsPath.getCacheFolderPath();
// var templateFolderPath = rsPath.getTemplateFolderPath();
// var styleFolderPath = rsPath.getStyleFolderPath();

// ---
// var monitorConfig = require('./server/monitor-tool-config.js');
// var config = monitorConfig.getConfig();
// console.log(config);

// ---
// var checkRenderRunning = require('./server/check-render-is-running.js');
// checkRenderRunning.getRunningState(function (isRunning) {
//     console.log(isRunning);
// });

// ---
// var renderConfig = require('./server/get-render-config.js');
// var config = renderConfig.getConfig();
// console.log(config);

// ---
// var fs = require('fs');
// var path = require('path');
// var renderServerPath = 'D:\render-server';
// console.log(path.normalize(renderServerPath));
// var p = path.relative(path.join('.', '..'), renderServerPath);
// console.log(p);