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
            dataIsDirty: false,
            lunchFailedInfo: ''
        });

        Dispatcher.register((payload) => {
            switch (payload.type) {
                // 更新所有配置
                case ActionTypes.UPDATE_ALL_RS_CONFIG:
                    ConfigRemote.getConfig().then((cfgObj) => {

                        this._config = Map(cfgObj);
                        this._configBackup = Map(cfgObj);

                        this._ui = this._ui.set('loading', false);
                        myEmitter.emit('CONFIG_STORE_CHANGED');                        

                    }, (errMessage) => {
                        AppActions.selectRsDirectory();
                    })
                break;
                // 修改单个配置字段
                case ActionTypes.UPDATE_RS_CONFIG:
                    this._config = this._config.set(payload.fieldName, payload.value);
                    
                    // console.log('modified config--->', JSON.stringify(this._config.toJSON()));
                    // console.log('origin config--->', JSON.stringify(this._configBackup.toJSON()));

                    if (JSON.stringify(this._config.toJSON()) 
                        !== JSON.stringify(this._configBackup.toJSON())) {
                        this._ui = this._ui.set('dataIsDirty', true);
                    } else {
                        this._ui = this._ui.set('dataIsDirty', false);
                    }

                    myEmitter.emit('CONFIG_STORE_CHANGED');
                break;
                // 撤销修改
                case ActionTypes.RESTORE_RS_CONFIG:
                    this._ui = this._ui.set('dataIsDirty', false);                    
                    this._config = Map(this._configBackup.toJS());
                    console.log('ConfigStore.js: RESTORE_RS_CONFIG--->', this._config.toJS());
                    myEmitter.emit('CONFIG_STORE_CHANGED');              
                break;
                // 启动 RS
                case ActionTypes.LUNCH_RS:
                    this._config = this._config.set('lunchState', '');
                    this._config = this._config.set('lunchInfo', '');

                    this._configBackup = this._configBackup.set('lunchState', '');
                    this._configBackup = this._configBackup.set('lunchInfo', '');

                    this._ui = this._ui.set('lunchFailedInfo', '');                       
                    ConfigRemote.lunchRenderServer();
                    myEmitter.emit('CONFIG_STORE_CHANGED');
                    break;
                // 获取 RS 启动状态
                case ActionTypes.UPDATE_RENDER_STATE:
                    let lunchState = payload.lunchState;
                    let info = payload.info;
                    
                    // console.log(lunchState, info);

                    this._config = this._config.set('lunchState', lunchState);
                    this._config = this._config.set('lunchInfo', info == undefined ? '' : info);

                    this._configBackup = this._configBackup.set('lunchState', lunchState);
                    this._configBackup = this._configBackup.set('lunchInfo', info == undefined ? '' : info);

                    if (lunchState === 'FAILED' || lunchState === 'TIMEOUT') {
                        this._ui = this._ui.set('lunchFailedInfo', info);
                    }

                    myEmitter.emit('CONFIG_STORE_CHANGED');
                    break;
                // 终止运行 RS
                case ActionTypes.STOP_RS:
                    ConfigRemote.stopRenderServer();
                    break;
                // 重新启动 RS
                case ActionTypes.RESTART_RS:
                    this._ui = this._ui.set('lunchFailedInfo', '');
                    myEmitter.emit('CONFIG_STORE_CHANGED');                                        
                    ConfigRemote.restartRenderServer();                
                    break;
                case ActionTypes.CLOSE_LUNCH_ERROR_DIALOG:
                    this._ui = this._ui.set('lunchFailedInfo', '');
                    myEmitter.emit('CONFIG_STORE_CHANGED');                
                    break;
                // 上传更新后的配置
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
