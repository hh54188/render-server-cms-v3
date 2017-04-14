var watch = require('watch');
var fs = require('fs');
var path = require('path');
var tool = require('./tool.js');
var render = require('./render.js');
var rsPath = require('./rs-path.js');
var util = require('./util');

function update(callback) {
    var toolConfig = tool.getConfig();

    var renderServerPath = toolConfig.path;
    var isProduction = toolConfig.production;
    rsPath.setRenderServerPath(renderServerPath, isProduction);

    var toolConfigPath = tool.getToolConfigPath();
    var renderConfigFilePath = rsPath.getConfigFilePath();
    var renderRootPath = rsPath.getRootPath();

    var renderConfig = render.getConfig(rsPath.getSrcPath());
    var renderPortNumber = renderConfig.rs.port;
    var renderIsRunning = render.getRunningState(renderPortNumber, function (err, isRunning) {
        renderConfig.rs.path = renderServerPath;
        renderConfig.rs.workPath = renderRootPath;
        renderConfig.rs.production = isProduction;
        callback(renderConfig);
    });
}

function gatherTempalteInfo() {
    var styleFolderPath = rsPath.getStyleFolderPath();
    var styleFiles = fs.readdirSync(styleFolderPath);
    styleFiles.forEach(function (fileName) {
        styleFilePath = rsPath.getStyleFile(fileName);
        var styleObj = JSON.parse(fs.readFileSync(styleFilePath, 'utf-8'));
    });

    var templateFolderPath = rsPath.getTemplateFolderPath();
    var templatesFoldersAndFiles = fs.readdirSync(templateFolderPath);
    templatesFoldersAndFiles.forEach(function (name) {
        if (name.indexOf('json') > -1) {
            var templateJSONFilePath = rsPath.getSubTemplateFolderAndFilePath(name);
            var templateDescObj = JSON.parse(fs.readFileSync(templateJSONFilePath, 'utf-8'));
        } else {
            var templateSubFolderPath = rsPath.getSubTemplateFolderAndFilePath(name);
            var filesInTemplateFolder = fs.readdirSync(templateSubFolderPath);
            filesInTemplateFolder.forEach(function (fileName) {
                if (fileName.indexOf('request') > -1)  {
                    var requestFolderPath = path.join(templateSubFolderPath, 'request');
                } else {

                }
            });
        }
    });
}

update(function () {
    gatherTempalteInfo();
});


 