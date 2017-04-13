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
        })
    }
}

export default Actions;