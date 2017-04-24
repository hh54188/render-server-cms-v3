import React from 'react';
import {
    Table, Icon, 
    Form, Input, 
    Button, Checkbox, 
    Message, Label, 
    Accordion, Segment, 
    Menu, Dropdown,
    Popup, Divider
} from 'semantic-ui-react'

import TabContainer from 'components/Tab/TabContainer.js';
import TabHeaderView from 'components/Tab/TabHeader.js';
import TabContentView from 'components/Tab/TabContent.js';
import TemplateActions from 'actions/TemplateActions.js';

export default class TemplateView extends React.Component {
    constructor() {
        super();
        this.validateCheckFieldResult = this.validateCheckFieldResult.bind(this);
        this.bindCheckFieldChangeHandler = this.bindCheckFieldChangeHandler.bind(this);
    }
    validateCheckFieldResult(fieldName, inputValue) {
        let filters = this.props.data.get('filters');
        let fields = fieldName.split('.');
        let fieldValue = filters;

        fields.forEach((name) => {
            fieldValue = fieldValue[name];
        });

        if (fieldValue.indexOf(inputValue) > -1) {
            return true;
        }

        return false;
    }
    bindCheckFieldChangeHandler(fieldName, filedValue) {
        return (event, data) => {
            TemplateActions.updateCheckField(fieldName, filedValue, data.checked);
        }
    }
    render() {
        let fieldLabelWidth = 5;
        let fieldActionWidth = 11;
        let styleOptions = [];

        let rows = [];

        this.props.data.get('templates').forEach((tpl, index) => {
            rows.push(
                <Table.Row key={index}>
                    <Table.Cell >
                        <Icon name='folder' /> node_modules
                    </Table.Cell>
                    <Table.Cell collapsing>
                        <Popup trigger={<Button icon={"content"} basic={true} size={'small'} content="模板描述" />}>
                            <Popup.Content>
                                <pre>
                                    {/*{JSON.stringify(data, null, 2) }*/}
                                </pre>
                            </Popup.Content>
                        </Popup>
                        <Popup trigger={<Button icon={"content"} basic={true} size={'small'} content="所属样式描述" />}>
                            <Popup.Content>
                                Hello World
                            </Popup.Content>
                        </Popup>                        
                        <Button icon={"configure"} basic={true} size={'small'} content="测试模板" />                                
                        {/*<Popup trigger={<Button icon={"warning sign"} color={'red'} size={'small'} content="存在错误" />}>
                            <Popup.Content>
                                Hello World
                            </Popup.Content>
                        </Popup>*/}
                    </Table.Cell>
                </Table.Row>
            );
        });

        let filtersOfTemplate = this.props.data.get('filters').template;
        let filtersOfStyle = this.props.data.get('filters').style;

        return (
            <div>
                <Accordion>
                    <Accordion.Title>
                        <Icon name='dropdown' />
                        <label>过滤模板</label>
                    </Accordion.Title>
                    <Accordion.Content active>
                        <Segment>
                            <Form>
                                <Divider horizontal><span>模板属性筛选</span></Divider>                                
                                <Form.Group inline>
                                    <Form.Field  width={fieldLabelWidth}>
                                        <label>尺寸类型（sizeType）</label>
                                    </Form.Field>
                                    <Form.Field width={fieldActionWidth}>
                                        <Form.Checkbox onChange={this.bindCheckFieldChangeHandler('template.sizeType', 1)} checked={this.validateCheckFieldResult('template.sizeType', 1)} name="sizeType" value="1" label='像素' />
                                        <Form.Checkbox onChange={this.bindCheckFieldChangeHandler('template.sizeType', 2)} checked={this.validateCheckFieldResult('template.sizeType', 2)} name="sizeType" value="2" label='比例' />
                                    </Form.Field>
                                </Form.Group>

                                <Form.Group inline>
                                    <Form.Field  width={fieldLabelWidth}>
                                        <label>尺寸值类型（valueType）</label>
                                    </Form.Field>
                                    <Form.Field width={fieldActionWidth}>
                                        <Form.Checkbox onChange={this.bindCheckFieldChangeHandler('template.valueType', 1)}  checked={this.validateCheckFieldResult('template.valueType', 1)} name="valueType" value="1" label='固定' />
                                        <Form.Checkbox onChange={this.bindCheckFieldChangeHandler('template.valueType', 2)}  checked={this.validateCheckFieldResult('template.valueType', 2)} name="valueType" value="2" label='范围' />
                                    </Form.Field>
                                </Form.Group>

                                <Form.Group inline>
                                    <Form.Field  width={fieldLabelWidth}>
                                        <label>模板引擎（renderEngine）</label>
                                    </Form.Field>
                                    <Form.Field width={fieldActionWidth}>
                                        <Form.Checkbox onChange={this.bindCheckFieldChangeHandler('template.renderEngine', 'otpl')} checked={this.validateCheckFieldResult('template.renderEngine', 'otpl')} name="renderEngine" value="otpl" label='otpl' />
                                        <Form.Checkbox onChange={this.bindCheckFieldChangeHandler('template.renderEngine', 'layout')} checked={this.validateCheckFieldResult('template.renderEngine', 'layout')} name="renderEngine" value="layout" label='layout' />
                                    </Form.Field>
                                </Form.Group>

                                <Form.Group inline>
                                    <Form.Field  width={fieldLabelWidth}>
                                        <label>创意类型（creative）</label>
                                    </Form.Field>
                                    <Form.Checkbox onChange={this.bindCheckFieldChangeHandler('template.creativeType', 0)} checked={this.validateCheckFieldResult('template.creativeType', 0)} name="creativeType" value="0" label='Text' />
                                    <Form.Checkbox onChange={this.bindCheckFieldChangeHandler('template.creativeType', 1)} checked={this.validateCheckFieldResult('template.creativeType', 1)} name="creativeType" value="1" label='Image' />
                                    <Form.Checkbox onChange={this.bindCheckFieldChangeHandler('template.creativeType', 2)} checked={this.validateCheckFieldResult('template.creativeType', 2)} name="creativeType" value="2" label='Flash' />
                                    <Form.Checkbox onChange={this.bindCheckFieldChangeHandler('template.creativeType', 4)} checked={this.validateCheckFieldResult('template.creativeType', 4)} name="creativeType" value="4" label='TextWidthIcon' />
                                    <Form.Checkbox onChange={this.bindCheckFieldChangeHandler('template.creativeType', 7)} checked={this.validateCheckFieldResult('template.creativeType', 7)} name="creativeType" value="7" label='Video' />
                                    <Form.Checkbox onChange={this.bindCheckFieldChangeHandler('template.creativeType', -1)} checked={this.validateCheckFieldResult('template.creativeType', -1)} name="creativeType" value="-1" label='其他' />
                                </Form.Group>                                
                                <Divider horizontal><span>样式属性筛选</span></Divider>
                                <Form.Group inline>
                                    <Form.Field  width={fieldLabelWidth}>
                                        <label>流量类型 (flowType)</label>
                                    </Form.Field>
                                    <Form.Field width={fieldActionWidth}>
                                        <Form.Checkbox onChange={this.bindCheckFieldChangeHandler('style.flowType', 1)} checked={this.validateCheckFieldResult('style.flowType', 1)} name="flowType" value="1" label='PC' />
                                        <Form.Checkbox onChange={this.bindCheckFieldChangeHandler('style.flowType', 2)} checked={this.validateCheckFieldResult('style.flowType', 2)} name="flowType" value="2" label='MBL' />
                                    </Form.Field>
                                </Form.Group>

                                <Form.Group inline>
                                    <Form.Field  width={fieldLabelWidth}>
                                        <label>布局 (layout)</label>
                                    </Form.Field>
                                    <Form.Field width={fieldActionWidth}>
                                        <Form.Checkbox onChange={this.bindCheckFieldChangeHandler('style.layout', 1)} checked={this.validateCheckFieldResult('style.layout', 1)} name="layout" value="1" label='独占' />
                                        <Form.Checkbox onChange={this.bindCheckFieldChangeHandler('style.layout', 2)} checked={this.validateCheckFieldResult('style.layout', 2)} name="layout" value="2" label='网格' />
                                        <Form.Checkbox onChange={this.bindCheckFieldChangeHandler('style.layout', 4)} checked={this.validateCheckFieldResult('style.layout', 4)} name="layout" value="4" label='导航' />
                                        <Form.Checkbox onChange={this.bindCheckFieldChangeHandler('style.layout', -1)} checked={this.validateCheckFieldResult('style.layout', -1)} name="layout" value="-1" label='其他' />
                                    </Form.Field>
                                </Form.Group>

                                <Form.Group inline>
                                    <Form.Field  width={fieldLabelWidth}>
                                        <label>动作类型 (attachType)</label>
                                    </Form.Field>
                                    <Form.Field width={fieldActionWidth}>
                                        <Form.Checkbox onChange={this.bindCheckFieldChangeHandler('style.attachType', 0)} checked={this.validateCheckFieldResult('style.attachType', 0)} name="attachType" value="0" label='跳转' />
                                        <Form.Checkbox onChange={this.bindCheckFieldChangeHandler('style.attachType', 16)} checked={this.validateCheckFieldResult('style.attachType', 16)} name="attachType" value="16" label='app下载' />
                                        <Form.Checkbox onChange={this.bindCheckFieldChangeHandler('style.attachType', 1024)} checked={this.validateCheckFieldResult('style.attachType', 1024)} name="attachType" value="1024" label='app唤醒' />
                                        <Form.Checkbox onChange={this.bindCheckFieldChangeHandler('style.attachType', -1)} checked={this.validateCheckFieldResult('style.attachType', -1)} name="attachType" value="-1" label='其他' />
                                    </Form.Field>
                                </Form.Group>

                                <Form.Group inline>
                                    <Form.Field  width={fieldLabelWidth}>
                                        <label>指定样式</label>
                                    </Form.Field>
                                    <Form.Field width={fieldActionWidth}>
                                        <Dropdown style={{width: '100%'}} placeholder='样式代码' fluid multiple search selection options={styleOptions} />
                                    </Form.Field>
                                </Form.Group>                                                                
                            </Form>
                        </Segment>
                    </Accordion.Content>
                </Accordion>

                <Table celled striped>
                    <Table.Header>
                        <Table.Row>
                        <Table.HeaderCell colSpan='2'>
                            <Input value={this.props.data.get('filters').searchKeyword} icon='search' placeholder='搜索模板'/>
                        </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {rows}
                    </Table.Body>

                    <Table.Footer fullWidth>
                        <Table.Row>
                            <Table.HeaderCell colSpan='2'>
                                <Menu pagination size={'small'} floated={'right'}>
                                    <Menu.Item>
                                        <Icon name='chevron left' />
                                    </Menu.Item>
                                    <Menu.Item name='1' active={true} />
                                    <Menu.Item disabled>...</Menu.Item>
                                    <Menu.Item name='10' />
                                    <Menu.Item name='11' />
                                    <Menu.Item name='12' />
                                    <Menu.Item>
                                        <Icon name='chevron right' />
                                    </Menu.Item>
                                </Menu>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </Table>
            </div>
        )
    }
}