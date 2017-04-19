import electronProxy from 'src/electronProxy.js';
import myEmitter from 'src/myEmitter.js';
import ConfigActions from 'actions/ConfigActions.js';

class ConfigRemote {
    constructor() {
        myEmitter.on('RENDER_STATE_CHANGED', (lunchState, info) => {
            // console.log('ConfigRemote.js: RENDER_STATE_CHANGED--->', lunchState, info);
            ConfigActions.updateRenderState(lunchState, info);
        })
    }
    getConfig() {
        return new Promise((resolve, reject) => {
            electronProxy.readConfigFile((err, cfgObj) => {
                console.log('ConfigRemote.js: getConfig--->', cfgObj);
                if (err) {
                    reject(err);
                    return;
                }
                resolve(cfgObj);
            })
        });
    }
    stopRenderServer() {
        electronProxy.kill();
    }
    restartRenderServer() {
        electronProxy.lunch();        
    }
    lunchRenderServer() {
        electronProxy.lunch();
    }
}

export default new ConfigRemote();