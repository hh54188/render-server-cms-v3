import {Map} from 'immutable';
import myEmitter from 'src/myEmitter.js';
import Dispatcher from 'src/dispatcher.js';
import ActionTypes from 'actions/ActionTypes.js';
import AppRemote from 'remotes/AppRemote.js';

import AppActions from 'actions/AppActions.js';
import ConfigActions from 'actions/ConfigActions.js';

class AppStore {
    constructor() {
        this._ui = Map({
            showErrorModal: false,
            errorModalMessage: '',

            showSelectDirectoryModal: false,
            rsDirectoryIsWrong: false
        });

        Dispatcher.register((payload) => {
            switch(payload.type) {
                case ActionTypes.OPEN_DIRECTORY_DIALOG:
                    AppRemote.openFileDialog().then((directoryPathsArr) => {
                        console.log('AppStore: directory--->', directoryPathsArr[0]);
                        AppActions.closeDirectoryDialog();
                        ConfigActions.updateAllConfig();
                    }, (errorMessage) => {
                        console.log('AppStore: errorMessage--->', errorMessage);                        
                        AppActions.setDirectoryDialogError();
                    });
                    break;
                case ActionTypes.SET_DIRECTORY_DIALOG_ERROR:
                    this._ui = this._ui.set('rsDirectoryIsWrong', true);
                    myEmitter.emit('APP_STORE_CHANGED');
                    break;
                case ActionTypes.CLOSE_DIRECTORY_DIALOG:
                    this._ui = this._ui.set('showSelectDirectoryModal', false);
                    myEmitter.emit('APP_STORE_CHANGED');                    
                    break;                    
                case ActionTypes.SELECT_RS_DIRECTORY:
                    this._ui = this._ui.set('showSelectDirectoryModal', true);
                    myEmitter.emit('APP_STORE_CHANGED');                    
                    break;
                case ActionTypes.SHOW_ERROR_MODAL:
                    this._ui = this._ui.set('showErrorModal', true);
                    this._ui = this._ui.set('errorModalMessage', payload.message);
                    myEmitter.emit('APP_STORE_CHANGED');
                    break;
                case ActionTypes.CLOSE_ERROR_MODAL:
                    this._ui = this._ui.set('showErrorModal', false);
                    myEmitter.emit('APP_STORE_CHANGED');
                    break;
            }
        });

    }
    getUIState() {
        return this._ui;
    }    
}

export default new AppStore();