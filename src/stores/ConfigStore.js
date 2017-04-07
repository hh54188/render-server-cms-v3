import Dispatcher from 'src/dispatcher.js';
import {Map} from 'immutable';

class ConfigStore {
    constructor() {
        this._eventQueue = [];
        this._config = Map({
            isRunning: false,
            absolutePath: 'D:\\render-server',
            enableProductionDir: true,
            port: '8124',
            dbName: 'nova_ts_liguangyi',
            dbAccount: 'root',
            dbPassword: '123456',
            dbPort: '8877'    
        });
        this._ui =  Map({
            loading: false
        });
    }
    getConfig() {
        return this._config;
    }
    getUIState() {
        return this._ui;
    }
    addListener(callback) {
        this._eventQueue.push(callback);
    }
}

export default new ConfigStore();
