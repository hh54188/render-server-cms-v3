class ElectronHelper {
    constructor() {
        this.electronProxy = window.electronProxy;
        this.electron = this.electronProxy.getElectron();
        this.ipc = electron.ipcRenderer;

        this.ipc.on('selected-directory', (event, directory) => {
            console.log(directory);
        });

        this.ipc.on('read-config-failed', (event, errorMessage) => {
            console.log('read-config-failed', errorMessage);
        });        

        this.ipc.on('read-config-successed', (event, cfgObj) => {
            console.log('read-config-successed', cfgObj);
        });                
    }
    openFileDialog() {
        this.ipc.send('open-directory-dialog');
    }
    readConfigFile() {
        this.ipc.send('read-config-file');
    }
}

export default new ElectronHelper();