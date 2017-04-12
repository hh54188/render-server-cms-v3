import Dispatcher from 'src/dispatcher.js';
import ActionTypes from 'actions/ActionTypes.js';

const Actions = {
    updateConfig(fieldName, value) {
        Dispatcher.dispatch({
            type: ActionTypes.UPDATE_RS_CONFIG,
            fieldName,
            value
        });
    },
    restoreConfig() {
        Dispatcher.dispatch({
            type: ActionTypes.RESTORE_RS_CONFIG
        });
    },
    saveConfig() {
        Dispatcher.dispatch({
            type: ActionTypes.SAVE_RS_CONFIG
        })
    },
    lunchRenderService() {
        Dispatcher.dispatch({
            type: ActionTypes.LUNCH_RS
        });
    },
    restartRenderService() {
        Dispatcher.dispatch({
            type: ActionTypes.RESTART_RS
        });
    },
    stopRenderService() {
        Dispatcher.dispatch({
            type: ActionTypes.STOP_RS
        });
    }
}

export default Actions;