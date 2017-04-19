import myEmitter from 'src/myEmitter.js';

class ElectronProxy {
    constructor() {
        this.electronProxy = window.electronProxy;
        this.electron = this.electronProxy.getElectron();
        this.ipc = electron.ipcRenderer;

        this.readConfigFileCallbackQueue = [];
        this.openDirectoryDialogCallbackQueue = [];

        setInterval(() => {
            this.ipc.send('get-render-state');
        }, 1000 * 1);

        this.ipc.on('render-lunched', (event, lunchState, info) => {
            // console.log('electronProxy.js: render-lunched', lunchState, info);
            myEmitter.emit('RENDER_STATE_CHANGED', lunchState, info);
        })

        this.ipc.on('directory-selected', (event, errorMessage, directory) => {
            let queueName = 'openDirectoryDialogCallbackQueue';
            while (this[queueName].length) {
                let callback = this.popCallbackQueue(queueName);
                callback(errorMessage, directory);
            }
        });

        this.ipc.on('config-readed', (event, errorMessage, cfgObj) => {
            console.log('electronProxy.js:config-readed--->', cfgObj);
            let queueName = 'readConfigFileCallbackQueue';
            while (this[queueName].length) {
                let callback = this.popCallbackQueue(queueName);
                callback(errorMessage, cfgObj);
            }
        });                
    }
    kill() {
        this.ipc.send('kill-render');
    }
    lunch(callback) {
        this.ipc.send('lunch-render');
    }
    popCallbackQueue(queueName) {
        return this[queueName].pop();
    }
    openFileDialog(callback) {
        this.openDirectoryDialogCallbackQueue.push(callback);
        this.ipc.send('open-directory-dialog');
    }
    readConfigFile(callback) {
        this.readConfigFileCallbackQueue.push(callback);
        this.ipc.send('read-config-file');
    }
}

export default new ElectronProxy();