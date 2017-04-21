import Dispatcher from 'src/dispatcher.js';
import ActionTypes from 'actions/ActionTypes.js';
import {Map} from 'immutable';
import myEmitter from 'src/myEmitter.js';
import TemplateActions from 'actions/TemplateActions.js';
import TemplateRemote from 'remotes/TemplateRemote.js';

class TemplateStore {
    constructor() {

        let _model = Map({
            styles: [],
            templates: [],
            styleIds: [],
            filters: {
                template: {
                    sizeType: [1, 2],
                    valueType: [1, 2],
                    renderEngine: ['otpl', 'layout'],
                    creativeType: [0, 1, 2, 4, 7, -1]
                },
                style: {
                    flowType: [1, 2],
                    layout: [1, 2, 4, -1],
                    attachType: [0, 16, 1024, -1],
                    specifiedStyleIds: []
                },
                pagination: {
                    countPerPage: 10,
                    total: 0,
                    cur: 0
                }
            }
        });

        let _ui = Map({});

        Dispatcher.register((payload) => {
            switch(payload.type) {
                case ActionTypes.GET_TEMPLATES:
                    TemplateRemote.getTemplates().then((styles) => {
                        console.log(styles);
                    }, (error) => {

                    });
                    break;
            }
        });

        TemplateActions.getTemplates();
    }
    updateTemplates() {

    }
    getTemplates() {

    }
}

export default new TemplateStore();