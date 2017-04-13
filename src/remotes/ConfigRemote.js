import cmsCfg from 'src/config.js';

class ConfigRemote {
    constructor() {
    }
    save() {
        return new Promise((resolve, reject) => {
            fetch(cmsCfg.CONFIG_UPLOAD_URL).then(() => {
                resolve('success');
            }, (error) => {
                reject(error);
            });
        })
    }
}

export default new ConfigRemote();