var fs = require('fs');

module.exports = {
    checkPathIsAvailable: function (path) {
        var checkExist = fs.lstatSync || fs.statSync || fs.existsSync;
        try {
            checkExist(path);
        } catch (e) {
            return false;
        }
        return true;        
    },
    isAbsolutePath: function (path) {
        var result = false;
        if (/^(?:[a-z]+:)?\/\//i.test(path)) {
            result = true;
        }
        return result;
    }
}