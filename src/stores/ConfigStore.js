import Dispatcher from 'src/dispatcher.js';

class ConfigStore {
    constructor() {
        this._eventQueue = [];
        this._config = {
            isRunning: false,
            absolutePath: 'D:\\render-server',
            enableProductionDir: true,
            port: '8124',
            dbName: 'nova_ts_liguangyi',
            dbAccount: 'root',
            dbPassword: '123456',
            dbPort: '8877'    
        };
    }
    getConfig() {
        return this._config;
    }
    addListener(callback) {
        this._eventQueue.push(callback);
    }
}

export default new ConfigStore();
