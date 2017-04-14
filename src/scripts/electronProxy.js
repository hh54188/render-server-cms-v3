const electron = require('electron')

window.electronProxy = {
    getElectron() {
        return electron;
    }
}