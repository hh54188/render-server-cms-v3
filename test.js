var rsPath = require('./server/rs-path.js');

var a = rsPath.getRootPath();
var b = rsPath.getSrcPath();
var c = rsPath.getConfigFilePath();
var d = rsPath.getCacheFolderPath();
var e = rsPath.getTemplateFolderPath();
var f = rsPath.getStyleFolderPath();

console.log(rsPath.checkPathIsAvailable(a));
console.log(rsPath.checkPathIsAvailable(b));
console.log(rsPath.checkPathIsAvailable(c));
console.log(rsPath.checkPathIsAvailable(d));
console.log(rsPath.checkPathIsAvailable(e));
console.log(rsPath.checkPathIsAvailable(f));