import electronProxy from 'src/electronProxy.js';

class AppRemote {
    constructor() {
    }
    openFileDialog() {
        return new Promise((resolve, reject) => {
            electronProxy.openFileDialog((err, cfgObj) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(cfgObj);
            })
        });
    }
    
}

export default new AppRemote();