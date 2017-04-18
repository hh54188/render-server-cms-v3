import Dispatcher from 'src/dispatcher.js';
import ActionTypes from 'actions/ActionTypes.js';
import {Map} from 'immutable';
import myEmitter from 'src/myEmitter.js';
import ConfigRemote from 'remotes/ConfigRemote.js';
import ConfigActions from 'actions/ConfigActions.js';
import AppActions from 'actions/AppActions.js';

class ConfigStore {
    constructor() {

        this._config = Map();
        this._configBackup = this._config;
        this._ui =  Map({
            loading: true,
            dataIsDirty: false
        });

        Dispatcher.register((payload) => {
            switch (payload.type) {
                case ActionTypes.UPDATE_ALL_RS_CONFIG:
                    ConfigRemote.getConfig().then((cfgObj) => {
                        console.log(cfgObj);
                        this._config = Map(cfgObj);
                        this._configBackup = Map(cfgObj);
                        this._ui = this._ui.set('loading', false);
                        myEmitter.emit('CONFIG_STORE_CHANGED');                        
                    }, (errMessage) => {
                        AppActions.selectRsDirectory();
                    })
                break;
                case ActionTypes.UPDATE_RS_CONFIG:
                    this._config = this._config.set(payload.fieldName, payload.value);
                    
                    if (JSON.stringify(this._config.toJSON()) 
                        !== JSON.stringify(this._configBackup.toJSON())) {
                        this._ui = this._ui.set('dataIsDirty', true);
                    } else {
                        this._ui = this._ui.set('dataIsDirty', false);
                    }

                    myEmitter.emit('CONFIG_STORE_CHANGED');
                break;
                case ActionTypes.RESTORE_RS_CONFIG:
                    this._ui = this._ui.set('dataIsDirty', false);                    
                    this._config = this._configBackup;
                    console.log('ConfigStore.js: RESTORE_RS_CONFIG--->', this._config.toJS());
                    myEmitter.emit('CONFIG_STORE_CHANGED');              
                break;
                case ActionTypes.LUNCH_RS:
                    this._config = this._config.set('lunchState', '');                        
                    this._config = this._config.set('lunchInfo', '');                        
                    ConfigRemote.lunchRenderServer();
                    myEmitter.emit('CONFIG_STORE_CHANGED');
                    break;
                case ActionTypes.UPDATE_RENDER_STATE:
                    let errorMessage = payload.errorMessage;
                    let lunchState = payload.lunchState;
                    let info = payload.info;
                    
                    console.log(errorMessage, lunchState, info);

                    this._config = this._config.set('lunchState', errorMessage || lunchState);
                    this._config = this._config.set('lunchInfo', info);

                    myEmitter.emit('CONFIG_STORE_CHANGED');
                    break;
                case ActionTypes.STOP_RS:
                    ConfigRemote.stopRenderServer();
                    break;
                case ActionTypes.RESTART_RS:
                    ConfigRemote.restartRenderServer();                
                    break;
                case ActionTypes.SAVE_RS_CONFIG:
                    this._ui = this._ui.set('dataIsDirty', false);
                    this._ui = this._ui.set('loading', true);

                    // ConfigRemote.save(this._config.toJSON()).then((message) => {
                    //     this._ui = this._ui.set('loading', false);                    
                    // }, (failedMessage) => {
                    //     this._ui = this._ui.set('loading', false);
                    //     ConfigActions.restoreConfig();
                    //     AppActions.showErrorModal(failedMessage.toString());
                    // });

                    myEmitter.emit('CONFIG_STORE_CHANGED');                    
                break;
            }
        });

        ConfigActions.updateAllConfig();        
    }
    getConfig() {
        return this._config;
    }
    getUIState() {
        return this._ui;
    }
}

export default new ConfigStore();
