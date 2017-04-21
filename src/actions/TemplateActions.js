import Dispatcher from 'src/dispatcher.js';
import ActionTypes from 'actions/ActionTypes.js';

const Actions = {
    getTemplates() {
        Dispatcher.dispatch({
            type: ActionTypes.GET_TEMPLATES,
        });        
    }
}

export default Actions;