import Dispatcher from 'src/dispatcher.js';
import ActionTypes from 'actions/ActionTypes.js';

const Actions = {
    showErrorModal(message) {
        Dispatcher.dispatch({
            type: ActionTypes.SHOW_ERROR_MODAL,
            message: message 
        });
    },
    closeErrorModal() {
        Dispatcher.dispatch({
            type: ActionTypes.CLOSE_ERROR_MODAL
        });
    },
    selectRsDirectory() {
        Dispatcher.dispatch({
            type: ActionTypes.SELECT_RS_DIRECTORY
        });
    },
    openDirectoryDialog() {
        Dispatcher.dispatch({
            type: ActionTypes.OPEN_DIRECTORY_DIALOG
        });        
    }
}

export default Actions;