import {Map} from 'immutable';
import myEmitter from 'src/myEmitter.js';
import Dispatcher from 'src/dispatcher.js';
import ActionTypes from 'actions/ActionTypes.js';
import electronHelper from 'src/electronHelper.js';

class AppStore {
    constructor() {
        this.initialize();
        
        this._ui = Map({
            showErrorModal: false,
            errorModalMessage: '',

            showSelectDirectoryModal: false,
            rsDirectoryIsWrong: false
        });

        Dispatcher.register((payload) => {
            switch(payload.type) {
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
    initialize() {
        electronHelper.readConfigFile();
    }
    getUIState() {
        return this._ui;
    }    
}

export default new AppStore();