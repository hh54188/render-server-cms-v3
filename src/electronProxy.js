class ElectronProxy {
    constructor() {
        this.electronProxy = window.electronProxy;
        this.electron = this.electronProxy.getElectron();
        this.ipc = electron.ipcRenderer;

        this.readConfigFileCallbackQueue = [];
        this.openDirectoryDialogCallbackQueue = [];

        this.ipc.on('selected-directory-successed', (event, directory) => {
            let queueName = 'openDirectoryDialogCallbackQueue';
            while (this[queueName].length) {
                let callback = this.popCallbackQueue(queueName);
                console.log('electronProxy: selected-directory-successed--->', directory);
                callback(null, directory);
            }            
        });

        this.ipc.on('selected-directory-failed', (event, errorMessage) => {
            let queueName = 'openDirectoryDialogCallbackQueue';
            while (this[queueName].length) {
                let callback = this.popCallbackQueue(queueName);
                console.log('electronProxy: selected-directory-failed--->', errorMessage);
                callback(errorMessage);
            }            
        });        

        this.ipc.on('read-config-failed', (event, errorMessage) => {
            let queueName = 'readConfigFileCallbackQueue';
            while (this[queueName].length) {
                let callback = this.popCallbackQueue(queueName);
                console.log('electronProxy: read-config-failed--->', errorMessage);
                callback(errorMessage);
            }
        });        

        this.ipc.on('read-config-successed', (event, cfgObj) => {
            let queueName = 'readConfigFileCallbackQueue';
            while (this[queueName].length) {
                let callback = this.popCallbackQueue(queueName);
                console.log('electronProxy: read-config-successed--->', cfgObj);
                callback(null, cfgObj);
            }            
        });                
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