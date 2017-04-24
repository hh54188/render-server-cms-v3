import Dispatcher from 'src/dispatcher.js';
import ActionTypes from 'actions/ActionTypes.js';
import {Map} from 'immutable';
import myEmitter from 'src/myEmitter.js';
import TemplateActions from 'actions/TemplateActions.js';
import TemplateRemote from 'remotes/TemplateRemote.js';

class TemplateStore {
    constructor() {

        this._model = Map({
            styles: [],
            templates: [],
            styleIds: [],
            filters: {
                searchKeyword: '',
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
                    unselectedStyleIds: [],
                    selectedStyleIds: []
                },
                pagination: {
                    countPerPage: 10,
                    total: 0,
                    cur: 1
                }
            }
        });

        this.updateFilterCheckedField = this.updateFilterCheckedField.bind(this);

        this._ui = Map({});

        Dispatcher.register((payload) => {
            switch(payload.type) {
                case ActionTypes.GET_TEMPLATES:
                    TemplateRemote.getTemplates().then((styles) => {
                        this._model = this._model.set('styles', styles);
                        this._model = this._model.set('templates', this.collectTemplates());
                    }, (error) => {

                    });
                    myEmitter.emit('TEMPLATE_STORE_CHANGED');                    
                    break;
                case ActionTypes.UPDATE_CHECK_FIELD:
                    // console.log(payload.fieldName, payload.fieldValue, payload.checkState);
                    this.updateFilterCheckedField(
                        payload.fieldName, 
                        payload.fieldValue, 
                        payload.checkState
                    );
                    this._model = this._model.set('templates', this.collectTemplates());
                    myEmitter.emit('TEMPLATE_STORE_CHANGED');                    
                    break;
            }
        });

        TemplateActions.getTemplates();
    }
    filterTemplate(template) {
        let filters = this._model.get('filters');
        let flag = false;

        let templateFilters = filters.template;
        let filterSizeType = templateFilters.sizeType;
        let filterValueType = templateFilters.valueType;
        let filterRenderEngine = templateFilters.renderEngine;
        let filterCreativeType = templateFilters.creativeType;

        let styleFilters = filters.style;
        let filterFlowType = filters.flowType;
        let filterLayout = filters.layout;
        let filterAttachType = filters.attachType;
        let filterUnselectedStyleIds = filters.unselectedStyleIds;
        let filterSelectedStyleIds = filters.selectedStyleIds;

        let sizeInfoArr = template.size;
        // debugger
        for (let i = 0; i < sizeInfoArr.length; i++) {
            let sizeInfoItem = sizeInfoArr[i];
            let tplSizeType = sizeInfoItem.sizeType;
            let tplValueType = sizeInfoItem.valueType;

            for (let j = 0; j < filterSizeType.length; j++) {
                let filterSizeValue = filterSizeType[j];
                if (tplSizeType == filterSizeValue) {
                    flag = true;
                }
            }
            
            if (!flag) return false;
            flag = false;

            for (let k = 0; k < filterValueType.length; k++) {
                let filterValueValue = filterValueType[k];
                if (tplValueType == filterValueValue) {
                    flag = true;
                }
            }

            if (!flag) return false;
            flag = false;
        }
        // debugger
        let tplRenderEngine = template.renderEngine;
        if (tplRenderEngine) {
            for (let l = 0; l < filterRenderEngine.length; l++) {
                let filterRenderEngineValue = filterRenderEngine[l];
                if (tplRenderEngine.indexOf(filterRenderEngineValue) > -1) {
                    flag = true;
                }                
            }
        } else {
            flag = true;
        }
        
        if (!flag) return false;
        
        return true;
    }
    collectTemplates() {
        let styles = this._model.get('styles');
        let allTemplates = [];
        styles.forEach((styleItem) => {
            let templates = styleItem.templates;
            allTemplates = allTemplates.concat(templates.filter((templateItem) => {
                return this.filterTemplate(templateItem);
            }));
        });

        // pagition

        console.log('templates length--->', allTemplates.length);
        return allTemplates;
    }
    updateFilterCheckedField(fieldName, fieldValue, checkState) {
        let filters = this._model.get('filters');
        let fields = fieldName.split('.');
        
        let categoryKey = fields[0];
        let fieldKey = fields[1];

        // console.log(categoryKey, fieldKey);
        // console.log(filters[categoryKey][fieldKey], fieldValue, checkState);
        
        let fieldIndex = -1;
        if ((fieldIndex = filters[categoryKey][fieldKey].indexOf(fieldValue)) >= 0) {
            filters[categoryKey][fieldKey].splice(fieldIndex, 1);
        } else {
            filters[categoryKey][fieldKey].push(fieldValue);
        }

        this._model = this._model.set('filters', filters);
    }
    getTemplatesModel() {
        return this._model;
    }
}

export default new TemplateStore();