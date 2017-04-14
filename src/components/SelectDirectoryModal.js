import React from 'react'
import { Button, Header, Image, Modal, Icon, Label } from 'semantic-ui-react'

export default class ErrorModal extends React.Component {
    render() {
        return (
            <Modal open={this.props.open} size={'small'} dimmer={'blurring'}>
                <Modal.Content>
                    <Modal.Description>
                        <Button style={{margin: "0 auto"}} primary={true}>
                            <Icon name='folder' /><span>请选择Render Server目录</span>
                        </Button>
                        {this.props.error ? <Label active={false} style={{margin: "0 0 0 10px"}} color='red' pointing='left'>你选择的不是Render Server目录吧</Label> : ''}                        
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        )
    }
}