import React from 'react'
import { Button, Header, Image, Modal, Icon } from 'semantic-ui-react'
import AppActions from 'actions/AppActions.js'

export default class ErrorModal extends React.Component {
    confirmButtonClickHandler() {
        AppActions.closeErrorModal();
    }
    render() {
        return (
            <Modal open={this.props.open} size={'small'} dimmer={'blurring'}>
                <Modal.Header> <span>糟糕，出错了！</span> </Modal.Header>
                <Modal.Content image>
                    <Modal.Description>
                        {/*<Header>与服务器交互发生错误</Header>*/}
                        <p>{this.props.message}</p>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={this.confirmButtonClickHandler} primary={true}>
                        <Icon name='checkmark' /><span>确定</span>
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}