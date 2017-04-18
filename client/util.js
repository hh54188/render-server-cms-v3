var fs = require('fs');

module.exports = {
    isFunctionType: function (val) {
        return Object.prototype.toString.call(val) == '[object Function]' ? true : false;
    },
    isDirectory: function (pathString) {
        var states = fs.lstatSync(pathString);
        return states.isDirectory();
    },
    isFile: function (pathString) {
        var states = fs.lstatSync(pathString);
        return states.isFile();
    },
    checkPathIsAvailable: function (path) {
        var checkExist = fs.lstatSync || fs.statSync || fs.existsSync;
        try {
            checkExist(path);
        } catch (e) {
            return false;
        }
        return true;        
    },
    validatePortNumber: function (number) {
        var PORT_REGEX = /^0*(?:6553[0-5]|655[0-2][0-9]|65[0-4][0-9]{2}|6[0-4][0-9]{3}|[1-5][0-9]{4}|[1-9][0-9]{1,3}|[0-9])$/;
        if (PORT_REGEX.test(number)) {
            return true;
        }
        return false;
    },
    isAbsolutePath: function (path) {
        var result = false;
        if (/^(?:[a-z]+:)?\/\//i.test(path)) {
            result = true;
        }
        return result;
    },
    validateJSON: function (jsonString) {
        try {
            JSON.parse(jsonString);
        } catch(e) {
            return false;
        }

        return true;
    },
    validateLayoutJS: function (layoutContent) {
        try {
            eval(layoutContent);
        } catch (e) {
            return false;
        }
        return true;
    }
}