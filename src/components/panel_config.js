import React from 'react'
import { Form, Input, Button, Checkbox, Message } from 'semantic-ui-react'

const FormExampleInlineGroupedFields = () => (
    <Form>
        {/* Render Server 启动状况*/}
        <Message
            negative={true}
            icon='frown'
            header='Render Server 运行中'
            content='检测到端口号被占用'
        />
        <Message
            positive={true}
            icon='smile'
            header='Render Server 尚未运行'
            content='未检测端口号被占用'
        />        
        {/* Render Server 目录*/}
        <Form.Group inline>
            <Form.Field width={2}>
                <label>Render Server 路径</label>
            </Form.Field>
            <Form.Field>
                <Input 
                    action={{ basic: true, labelPosition: 'right', icon: 'copy', content: '复制路径' }} 
                    placeholder='Search...' 
                />
            </Form.Field>
            <Form.Field>
                <Button>重新选择目录</Button>
            </Form.Field>
        </Form.Group>
        {/* 是否启用 production 目录*/}
        <Form.Group inline>
            <Form.Field width={2}>
                <label>启用Production目录</label>
            </Form.Field>   
            <Form.Field>
                <Checkbox toggle />
            </Form.Field>                         
        </Form.Group>      
          {/* 运行端口号 */}
        <Form.Group inline>
            <Form.Field width={2}>
                <label>运行端口号</label>
            </Form.Field>
            <Form.Field>
                <Input value={8124} />                
            </Form.Field>
        </Form.Group> 
        {/* 连接的线上数据库名称 */}
        <Form.Group inline>
            <Form.Field width={2}>
                <label>数据库名称</label>
            </Form.Field>
            <Form.Field>
                <Input />                
            </Form.Field>
        </Form.Group>
        {/* 数据库账户名称 */}
        <Form.Group inline>
            <Form.Field width={2}>
                <label>数据库账户名称</label>
            </Form.Field>
            <Form.Field>
                <Input />
            </Form.Field>
        </Form.Group>
        {/* 数据库账户密码 */}
        <Form.Group inline>
            <Form.Field width={2}>
                <label>数据库账户密码</label>
            </Form.Field>
            <Form.Field>
                <Input />
            </Form.Field>
        </Form.Group>    
        {/* 数据库端口号 */}
        <Form.Group inline>
            <Form.Field width={2}>
                <label>数据库端口号</label>
            </Form.Field>
            <Form.Field>
                <Input />
            </Form.Field>
        </Form.Group>
        <Form.Group inline>
            <Form.Field>
                <Button primary={true}>启动 Render Server</Button>
            </Form.Field>
            <Form.Field>
                <Button color={'orange'}>重新启动 Render Server</Button>
            </Form.Field>
            <Form.Field>
                <Button color={'red'}>终止 Render Server</Button>
            </Form.Field>                       
        </Form.Group>        
    </Form>
)

export default FormExampleInlineGroupedFields