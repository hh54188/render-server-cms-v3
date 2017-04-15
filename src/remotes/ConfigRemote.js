import electronProxy from 'src/electronProxy.js';

class ConfigRemote {
    constructor() {
    }
    getConfig() {
        return new Promise((resolve, reject) => {
            electronProxy.readConfigFile((err, cfgObj) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(cfgObj);
            })
        });
    }
}

export default new ConfigRemote();