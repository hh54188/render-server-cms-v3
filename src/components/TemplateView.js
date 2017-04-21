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

export default class TemplateView extends React.Component {
    render() {
        let fieldLabelWidth = 5;
        let fieldActionWidth = 11;
        let styleOptions = [];

        let rows = [];
        this.props.templates.forEach((tpl, index) => {
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
                                        <Form.Checkbox checked={true} name="sizeType" value="1" label='像素' />
                                        <Form.Checkbox checked={true} name="sizeType" value="2" label='比例' />
                                    </Form.Field>
                                </Form.Group>

                                <Form.Group inline>
                                    <Form.Field  width={fieldLabelWidth}>
                                        <label>尺寸值类型（valueType）</label>
                                    </Form.Field>
                                    <Form.Field width={fieldActionWidth}>
                                        <Form.Checkbox checked={true} name="valueType" value="1" label='固定' />
                                        <Form.Checkbox checked={true} name="valueType" value="2" label='范围' />
                                    </Form.Field>
                                </Form.Group>

                                <Form.Group inline>
                                    <Form.Field  width={fieldLabelWidth}>
                                        <label>模板引擎（renderEngine）</label>
                                    </Form.Field>
                                    <Form.Field width={fieldActionWidth}>
                                        <Form.Checkbox checked={true} name="renderEngine" value="otpl" label='otpl' />
                                        <Form.Checkbox checked={true} name="renderEngine" value="layout" label='layout' />
                                    </Form.Field>
                                </Form.Group>

                                <Form.Group inline>
                                    <Form.Field  width={fieldLabelWidth}>
                                        <label>创意类型（creative）</label>
                                    </Form.Field>
                                    <Form.Checkbox checked={true} name="creativeType" value="0" label='Text' />
                                    <Form.Checkbox checked={true} name="creativeType" value="1" label='Image' />
                                    <Form.Checkbox checked={true} name="creativeType" value="2" label='Flash' />
                                    <Form.Checkbox checked={true} name="creativeType" value="4" label='TextWidthIcon' />
                                    <Form.Checkbox checked={true} name="creativeType" value="7" label='Video' />
                                    <Form.Checkbox checked={true} name="creativeType" value="-1" label='其他' />
                                </Form.Group>                                
                                <Divider horizontal><span>样式属性筛选</span></Divider>
                                <Form.Group inline>
                                    <Form.Field  width={fieldLabelWidth}>
                                        <label>流量类型 (flowType)</label>
                                    </Form.Field>
                                    <Form.Field width={fieldActionWidth}>
                                        <Form.Checkbox checked={true} name="flowType" value="1" label='PC' />
                                        <Form.Checkbox checked={true} name="flowType" value="2" label='MBL' />
                                    </Form.Field>
                                </Form.Group>

                                <Form.Group inline>
                                    <Form.Field  width={fieldLabelWidth}>
                                        <label>布局 (layout)</label>
                                    </Form.Field>
                                    <Form.Field width={fieldActionWidth}>
                                        <Form.Checkbox checked={true} name="layout" value="1" label='独占' />
                                        <Form.Checkbox checked={true} name="layout" value="2" label='网格' />
                                        <Form.Checkbox checked={true} name="layout" value="4" label='导航' />
                                        <Form.Checkbox checked={true} name="layout" value="-1" label='其他' />
                                    </Form.Field>
                                </Form.Group>

                                <Form.Group inline>
                                    <Form.Field  width={fieldLabelWidth}>
                                        <label>动作类型 (AttachType)</label>
                                    </Form.Field>
                                    <Form.Field width={fieldActionWidth}>
                                        <Form.Checkbox checked={true} name="attachType" value="0" label='跳转' />
                                        <Form.Checkbox checked={true} name="attachType" value="16" label='app下载' />
                                        <Form.Checkbox checked={true} name="attachType" value="1024" label='app唤醒' />
                                        <Form.Checkbox checked={true} name="attachType" value="-1" label='其他' />
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
                            <Input icon='search' placeholder='搜索模板'/>
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