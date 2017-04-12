import React from 'react'
import { Form, Input, Button, Checkbox, Message } from 'semantic-ui-react';
import ConfigActions from 'actions/ConfigActions.js';

export default class ConfigView extends React.Component {
    constructor(props) {
        super(props);

        this.bindInputChangeHandler = this.bindInputChangeHandler.bind(this);
        this.lunchButtonClickHandler = this.lunchButtonClickHandler.bind(this);
        this.restartButtonClickHandler = this.restartButtonClickHandler.bind(this);
        this.stopButtonClickHandler = this.stopButtonClickHandler.bind(this);
        this.saveButtonClickHandler = this.saveButtonClickHandler.bind(this);
        this.rollbackButtonClickHandler = this.rollbackButtonClickHandler.bind(this);
    }
    bindInputChangeHandler(fieldName) {
        return (event) => {
            ConfigActions.updateConfig(fieldName, event.target.value);
        }
    }
    saveButtonClickHandler() {
        ConfigActions.saveConfig();
    }
    rollbackButtonClickHandler() {
        ConfigActions.restoreConfig();
    }
    lunchButtonClickHandler() {
        ConfigActions.lunchRenderService();
    }
    restartButtonClickHandler() {
        ConfigActions.restartRenderService();
    }
    stopButtonClickHandler() {
        ConfigActions.stopRenderService();
    }
    render() {
        let renderStateMessage = this.props.config.isRunning
            ?<Message
                        positive={true}
                        icon='smile'
                        header='Render Server 运行中'
                        content='检测端口号被占用'
                        size='small'
             />
            : <Message
                        negative={true}
                        icon='frown'
                        header='Render Server 未运行'
                        content='未检测到端口号被占用'
                        size='small'                        
            />
        let saveChangeButton = <Button onClick={this.saveButtonClickHandler} type={'button'} size={'small'} basic={true}>保存</Button>;
        let rollbackChangeButton =  <Button onClick={this.rollbackButtonClickHandler} type={'button'} size={'small'} basic={true}>撤销修改</Button>;

        let lunchRenderServerButton = this.props.config.isRunning
            ? <Form.Field>
                <Button onClick={this.restartButtonClickHandler} type={'button'} size={'small'} color={'orange'}>重新启动 Render Server</Button>
            </Form.Field>
            : <Form.Field>
                <Button onClick={this.lunchButtonClickHandler} type={'button'} size={'small'} primary={true}>启动 Render Server</Button>
            </Form.Field>;
        
        let stopRenderServerButton = this.props.config.isRunning
            ? <Form.Field>
                <Button onClick={this.stopButtonClickHandler} type={'button'} size={'small'} color={'red'}>终止 Render Server</Button>
            </Form.Field>
            : '';
        
        let fieldLabelWidth = 3;
        return (
            <Form loading={this.props.UIState.get('loading')}>
                {/* Render Server 启动状况*/}
                {renderStateMessage}
                {/* Render Server 目录*/}
                <Form.Group inline>
                    <Form.Field width={fieldLabelWidth}>
                        <label>Render Server 路径</label>
                    </Form.Field>
                    <Form.Field>
                        <Input 
                            onChange={this.bindInputChangeHandler('absolutePath')}
                            action={
                                { 
                                    basic: true, 
                                    labelPosition: 'right', 
                                    type:'button', 
                                    icon: 'copy', 
                                    content: '复制路径' 
                                }
                            } 
                            value={this.props.config.get('absolutePath')} 
                        />
                    </Form.Field>
                    <Form.Field>
                        <Button size={'small'} basic={true} type={'button'}>重新选择目录</Button>
                    </Form.Field>
                </Form.Group>
                {/* 是否启用 production 目录*/}
                <Form.Group inline>
                    <Form.Field width={fieldLabelWidth}>
                        <label>启用Production目录</label>
                    </Form.Field>   
                    <Form.Field>
                        <Checkbox 
                            onChange={this.bindInputChangeHandler('enableProductionDir')} 
                            checked={this.props.config.get('enableProductionDir')} 
                            toggle 
                        />
                    </Form.Field>                         
                </Form.Group>      
                {/* 运行端口号 */}
                <Form.Group inline>
                    <Form.Field width={fieldLabelWidth}>
                        <label>运行端口号</label>
                    </Form.Field>
                    <Form.Field>
                        <Input onChange={this.bindInputChangeHandler('port')} value={this.props.config.get('port')} />                
                    </Form.Field>
                </Form.Group> 
                {/* 连接的线上数据库名称 */}
                <Form.Group inline>
                    <Form.Field width={fieldLabelWidth}>
                        <label>数据库名称</label>
                    </Form.Field>
                    <Form.Field>
                        <Input onChange={this.bindInputChangeHandler('dbName')} value={this.props.config.get('dbName')} />
                    </Form.Field>
                </Form.Group>
                {/* 数据库账户名称 */}
                <Form.Group inline>
                    <Form.Field width={fieldLabelWidth}>
                        <label>数据库账户名称</label>
                    </Form.Field>
                    <Form.Field>
                        <Input onChange={this.bindInputChangeHandler('dbAccount')}  value={this.props.config.get('dbAccount')} />
                    </Form.Field>
                </Form.Group>
                {/* 数据库账户密码 */}
                <Form.Group inline>
                    <Form.Field width={fieldLabelWidth}>
                        <label>数据库账户密码</label>
                    </Form.Field>
                    <Form.Field>
                        <Input onChange={this.bindInputChangeHandler('dbPassword')}  value={this.props.config.get('dbPassword')} />
                    </Form.Field>
                </Form.Group>    
                {/* 数据库端口号 */}
                <Form.Group inline>
                    <Form.Field width={fieldLabelWidth}>
                        <label>数据库端口号</label>
                    </Form.Field>
                    <Form.Field>
                        <Input onChange={this.bindInputChangeHandler('dbPort')}  value={this.props.config.get('dbPort')} />
                    </Form.Field>
                </Form.Group>
                <Form.Group inline>
                    {saveChangeButton}
                    {rollbackChangeButton}                    
                    {lunchRenderServerButton}
                    {stopRenderServerButton}
                </Form.Group>        
            </Form>            
        );
    }
}