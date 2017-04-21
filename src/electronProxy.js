import myEmitter from 'src/myEmitter.js';

class ElectronProxy {
    constructor() {
        this.electronProxy = window.electronProxy;
        this.electron = this.electronProxy.getElectron();
        this.ipc = electron.ipcRenderer;

        this.readConfigFileCallbackQueue = [];
        this.openDirectoryDialogCallbackQueue = [];
        this.getTemplatesCallbackQueue = [];

        setInterval(() => {
            this.ipc.send('get-render-state');
        }, 1000 * 1);

        this.ipc.on('render-lunched', (event, lunchState, info) => {
            myEmitter.emit('RENDER_STATE_CHANGED', lunchState, info);
        });

        this.ipc.on('templates-received', (event, error, styles) => {
            let queueName = 'getTemplatesCallbackQueue';
            this.invokeCallback(queueName, error, styles);
        });

        this.ipc.on('directory-selected', (event, errorMessage, directory) => {
            let queueName = 'openDirectoryDialogCallbackQueue';
            this.invokeCallback(queueName, errorMessage, directory);
        });

        this.ipc.on('config-readed', (event, errorMessage, cfgObj) => {
            let queueName = 'readConfigFileCallbackQueue';
            this.invokeCallback(queueName, errorMessage, cfgObj);
        });
    }
    kill() {
        this.ipc.send('kill-render');
    }
    lunch(callback) {
        this.ipc.send('lunch-render');
    }
    getTemplates(callback) {
        this.getTemplatesCallbackQueue.push(callback);
        this.ipc.send('get-templates');
    }
    invokeCallback(queueName, errorMessage, value) {
        while (this[queueName].length) {
            let callback = this.popCallbackQueue(queueName);
            callback(errorMessage, value);
        }
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