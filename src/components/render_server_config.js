import React from 'react'
import { Form, Input, Button, Checkbox, Message } from 'semantic-ui-react'

class RenderServerConfig extends React.Component {
    render() {
        let renderStateMessage = this.props.config.isRunning
            ?<Message
                        positive={true}
                        icon='smile'
                        header='Render Server 运行中'
                        content='检测端口号被占用'
             />
            : <Message
                        negative={true}
                        icon='frown'
                        header='Render Server 未运行'
                        content='未检测到端口号被占用'
            />
        let lunchRenderServerButton = this.props.config.isRunning
            ? <Form.Field>
                <Button type={'button'} color={'orange'}>重新启动 Render Server</Button>
            </Form.Field>
            : <Form.Field>
                <Button type={'button'} primary={true}>启动 Render Server</Button>
            </Form.Field>;
        
        let stopRenderServerButton = this.props.config.isRunning
            ? <Form.Field>
                <Button type={'button'} color={'red'}>终止 Render Server</Button>
            </Form.Field>
            : '';
        
        let fieldLabelWidth = 3;
        return (
            <Form>
                {/* Render Server 启动状况*/}
                {renderStateMessage}
                {/* Render Server 目录*/}
                <Form.Group inline>
                    <Form.Field width={fieldLabelWidth}>
                        <label>Render Server 路径</label>
                    </Form.Field>
                    <Form.Field>
                        <Input 
                            action={
                                { 
                                    basic: true, 
                                    labelPosition: 'right', 
                                    type:'button', 
                                    icon: 'copy', 
                                    content: '复制路径' 
                                }
                            } 
                            value={this.props.config.absolutePath} 
                        />
                    </Form.Field>
                    <Form.Field>
                        <Button type={'button'}>重新选择目录</Button>
                    </Form.Field>
                </Form.Group>
                {/* 是否启用 production 目录*/}
                <Form.Group inline>
                    <Form.Field width={fieldLabelWidth}>
                        <label>启用Production目录</label>
                    </Form.Field>   
                    <Form.Field>
                        <Checkbox checked={this.props.config.enableProductionDir} toggle />
                    </Form.Field>                         
                </Form.Group>      
                {/* 运行端口号 */}
                <Form.Group inline>
                    <Form.Field width={fieldLabelWidth}>
                        <label>运行端口号</label>
                    </Form.Field>
                    <Form.Field>
                        <Input value={this.props.config.port} />                
                    </Form.Field>
                </Form.Group> 
                {/* 连接的线上数据库名称 */}
                <Form.Group inline>
                    <Form.Field width={fieldLabelWidth}>
                        <label>数据库名称</label>
                    </Form.Field>
                    <Form.Field>
                        <Input value={this.props.config.dbName} />                
                    </Form.Field>
                </Form.Group>
                {/* 数据库账户名称 */}
                <Form.Group inline>
                    <Form.Field width={fieldLabelWidth}>
                        <label>数据库账户名称</label>
                    </Form.Field>
                    <Form.Field>
                        <Input value={this.props.config.dbAccount} />
                    </Form.Field>
                </Form.Group>
                {/* 数据库账户密码 */}
                <Form.Group inline>
                    <Form.Field width={fieldLabelWidth}>
                        <label>数据库账户密码</label>
                    </Form.Field>
                    <Form.Field>
                        <Input value={this.props.config.dbPassword} />
                    </Form.Field>
                </Form.Group>    
                {/* 数据库端口号 */}
                <Form.Group inline>
                    <Form.Field width={fieldLabelWidth}>
                        <label>数据库端口号</label>
                    </Form.Field>
                    <Form.Field>
                        <Input value={this.props.config.dbPort} />
                    </Form.Field>
                </Form.Group>
                <Form.Group inline>
                    {lunchRenderServerButton}
                    {stopRenderServerButton}
                </Form.Group>        
            </Form>            
        );
    }
}

export default RenderServerConfig