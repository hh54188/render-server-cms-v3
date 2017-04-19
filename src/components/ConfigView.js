import React from 'react'
import { Form, Input, Button, Checkbox, Message, Label } from 'semantic-ui-react';
import ConfigActions from 'actions/ConfigActions.js';
import AppActions from 'actions/AppActions.js';

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
    // componentDidUnmount() {
    //     new Clipboard('.btn');
    // }
    componentDidMount() {
        new Clipboard('#copy-path');        
    }
    bindInputChangeHandler(fieldName) {
        return (event, data) => {
            let value;
            switch (data.type) {
                case 'text': value = data.value; break;
                case 'checkbox': value = data.checked; break;
            }
            ConfigActions.updateConfig(fieldName, value);
        }
    }
    selectRSButtonClickHandler() {
        AppActions.selectRsDirectory();
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

        let lunchState = this.props.config.get('lunchState');

        let renderStateMessage = lunchState === 'RUNNING'
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

        let errorMessage = this.props.UIState.get('lunchFailedInfo')
        ? <Message
            color='black'
            onDismiss={() => {}}
            icon='warning sign'
            header='启动出错'
            content={this.props.UIState.get('lunchFailedInfo')}
            onClick={() => {ConfigActions.closeLunchErrorDialog();}}
            size='small'
        />
        : '';

        let saveChangeButton = this.props.UIState.get('dataIsDirty')
            ? <Button onClick={this.saveButtonClickHandler} type={'button'} size={'small'} basic={true}><span>保存</span></Button>
            : '' ;
        let rollbackChangeButton =  this.props.UIState.get('dataIsDirty')
            ? <Button onClick={this.rollbackButtonClickHandler} type={'button'} size={'small'} basic={true}><span>撤销修改</span></Button>
            : '';
        
        // Render 启动中
        let waitingButton = lunchState === 'WAITING'
            ? <Form.Field>
                <Button basic disabled type={'button'} size={'small'} primary={true}>
                    <span>Render Server启动中(请等待{this.props.config.get('lunchInfo')}秒)</span>
                </Button>
            </Form.Field>
            : '';
        
        // Render 未运行或者运行失败 
        let lunchRenderServerButton = '';
        if (lunchState === 'RUNNING') {
            lunchRenderServerButton = 
                <Form.Field>                    
                    <Button onClick={this.restartButtonClickHandler} type={'button'} size={'small'} color={'orange'}>
                        <span>重启 Render Server</span>
                    </Button>
                </Form.Field>
        } else if (lunchState === "OFFLINE"
                    || lunchState === "TIMEOUT"
                    || lunchState === "FAILED") {
            lunchRenderServerButton = 
                <Form.Field>
                    <Button onClick={this.lunchButtonClickHandler} type={'button'} size={'small'} primary={true}><span>启动 Render Server</span></Button>
                    {
                        (lunchState == 'TIMEOUT' || lunchState == 'FAILED')
                            ? <Label basic color='red' pointing='left'>启动超时或者发生错误</Label>
                            : ''
                    }
                </Form.Field>
        }

        // 终止 Render Server 运行
        let stopRenderServerButton = lunchState === 'RUNNING'
            ? <Form.Field>
                <Button onClick={this.stopButtonClickHandler} type={'button'} size={'small'} color={'red'}><span>终止 Render Server</span></Button>
            </Form.Field>
            : '';
        
        let fieldLabelWidth = 3;
        return (
            <Form loading={this.props.UIState.get('loading')}>
                {/* Render Server 启动状况*/}
                {renderStateMessage}
                {/* Render Server 目录*/}
                {errorMessage}
                <Form.Group inline>
                    <Form.Field width={fieldLabelWidth}>
                        <label>Render Server 路径</label>
                    </Form.Field>
                    <Form.Field>
                        <Input
                            id="input-path"
                            onChange={() => {}} 
                            value={this.props.config.get('absolutePath')} 
                        />
                    </Form.Field>
                    <Form.Field>
                        <Button.Group basic size='small'>
                            <Button type={'button'} id="copy-path" icon="copy" data-clipboard-target="#input-path input" content={'复制'} />
                            <Button type={'button'} onClick={this.selectRSButtonClickHandler} icon="folder" content={'重选'} />
                        </Button.Group>
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
                <Form.Group inline>
                    <Form.Field width={fieldLabelWidth}>
                        <label>监控文件修改</label>
                    </Form.Field>   
                    <Form.Field>
                        <Checkbox 
                            onChange={this.bindInputChangeHandler('watchFileChange')} 
                            checked={this.props.config.get('watchFileChange')} 
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
                        {/*<Label pointing='left'>That name is taken!</Label>*/}
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
                    {waitingButton}
                    {saveChangeButton}
                    {rollbackChangeButton}                    
                    {lunchRenderServerButton}
                    {stopRenderServerButton}
                </Form.Group>        
            </Form>            
        );
    }
}