import Dispatcher from 'src/dispatcher.js';
import ActionTypes from 'actions/ActionTypes.js';

const Actions = {
    getTemplates() {
        Dispatcher.dispatch({
            type: ActionTypes.GET_TEMPLATES,
        });
    },
    updateCheckField(fieldName, fieldValue, checkState) {
        Dispatcher.dispatch({
            type: ActionTypes.UPDATE_CHECK_FIELD,
            fieldName, 
            fieldValue,
            checkState
        });
    },
    updatePagination(pageNum) {
        Dispatcher.dispatch({
            type: ActionTypes.UPDATE_PAGINATION,
            pageNum
        });
    },
    updateKeyword(keyword) {
        Dispatcher.dispatch({
            type: ActionTypes.UPDATE_KEYWORD,
            keyword
        });
    },
    updateSelectedStyle(selectedStyleId) {
        Dispatcher.dispatch({
            type: ActionTypes.UPDATE_SELECTED_STYLE,
            selectedStyleId
        });
    }
}

export default Actions;