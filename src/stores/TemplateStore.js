import Dispatcher from 'src/dispatcher.js';
import ActionTypes from 'actions/ActionTypes.js';
import {Map} from 'immutable';
import myEmitter from 'src/myEmitter.js';
import TemplateActions from 'actions/TemplateActions.js';
import TemplateRemote from 'remotes/TemplateRemote.js';

class TemplateStore {
    constructor() {

        let _modal = Map({
            styles: [],
            templates: [],
            styleIds: [],
            filters: {}
        });

        let _ui = Map({
            pagination: {
                total: 0,
                cur: 0
            } 
        })

        Dispatcher.register((payload) => {
            switch(payload.type) {
                case ActionTypes.GET_TEMPLATES:
                    TemplateRemote.getTemplates().then((styles) => {
                        debugger
                    }, (error) => {
                        debugger
                    });
                    break;
            }
        });

        TemplateActions.getTemplates();
    }
    getTemplates() {

    }
}

export default new TemplateStore();