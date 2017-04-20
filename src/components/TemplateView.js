import React from 'react';
import {
    Table, Icon, 
    Form, Input, 
    Button, Checkbox, 
    Message, Label, 
    Accordion, Segment, 
    Menu, Dropdown,
    Popup
} from 'semantic-ui-react'

import TabContainer from 'components/Tab/TabContainer.js';
import TabHeaderView from 'components/Tab/TabHeader.js';
import TabContentView from 'components/Tab/TabContent.js';

export default class TemplateView extends React.Component {
    render() {
        let fieldLabelWidth = 5;
        let fieldActionWidth = 11;
        let styleOptions = [
            {
                key: '10001',
                value: '10001',
                text: '10001'
            },
            {
                key: '10002',
                value: '10002',
                text: '10002'
            }            
        ];
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
                                <Form.Group inline>
                                    <Form.Field  width={fieldLabelWidth}>
                                        <label>尺寸类型（sizeType）</label>
                                    </Form.Field>
                                    <Form.Field width={fieldActionWidth}>
                                        <Form.Checkbox checked={true} label='像素' />
                                        <Form.Checkbox checked={true} label='比例' />
                                    </Form.Field>
                                </Form.Group>

                                <Form.Group inline>
                                    <Form.Field  width={fieldLabelWidth}>
                                        <label>尺寸值类型（valueType）</label>
                                    </Form.Field>
                                    <Form.Field width={fieldActionWidth}>
                                        <Form.Checkbox checked={true} label='固定' />
                                        <Form.Checkbox checked={true} label='范围' />
                                    </Form.Field>
                                </Form.Group>

                                <Form.Group inline>
                                    <Form.Field  width={fieldLabelWidth}>
                                        <label>模板引擎（renderEngine）</label>
                                    </Form.Field>
                                    <Form.Field width={fieldActionWidth}>
                                        <Form.Checkbox checked={true} label='otpl' />
                                        <Form.Checkbox checked={true} label='layout' />
                                    </Form.Field>
                                </Form.Group>

                                <Form.Group inline>
                                    <Form.Field  width={fieldLabelWidth}>
                                        <label>创意类型（creative）</label>
                                    </Form.Field>
                                    <Form.Checkbox checked={true} label='Text' />
                                    <Form.Checkbox checked={true} label='Image' />
                                    <Form.Checkbox checked={true} label='Flash' />
                                    <Form.Checkbox checked={true} label='TextWidthIcon' />
                                    <Form.Checkbox checked={true} label='Video' />
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
                        <Table.Row>
                            <Table.Cell >
                                <Icon name='folder' /> node_modules
                            </Table.Cell>
                            <Table.Cell collapsing>
                                <Button icon={"configure"} basic={true} size={'small'} content="测试模板" />                                
                                <Popup trigger={<Button icon={"content"} basic={true} size={'small'} content="模板描述" />}>
                                    <Popup.Content>
                                        Hello World
                                    </Popup.Content>
                                </Popup>
                                <Button icon={"copy"} basic={true} size={'small'} content="复制名称" />
                                <Popup trigger={<Button icon={"warning sign"} color={'red'} size={'small'} content="存在错误" />}>
                                    <Popup.Content>
                                        Hello World
                                    </Popup.Content>
                                </Popup>
                            </Table.Cell>
                        </Table.Row>
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