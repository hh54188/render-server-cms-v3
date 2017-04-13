import React from 'react';
import {Table, Icon, Button} from 'semantic-ui-react'

export default class TemplateView extends React.Component {
    render() {
        return (
            <div>

                <Table celled striped>
                <Table.Header>
                    <Table.Row>
                    <Table.HeaderCell colSpan='3'>模板信息</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    <Table.Row>
                        <Table.Cell collapsing>
                            <Icon name='folder' /> node_modules
                        </Table.Cell>
                        <Table.Cell>Initial commit</Table.Cell>
                        <Table.Cell collapsing textAlign='left'>
                            <Button icon={"content"} basic={true} size={'small'} />
                            <Button icon={"copy"} basic={true} size={'small'} />
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>
                            <Icon name='folder' /> test
                        </Table.Cell>
                        <Table.Cell>Initial commit</Table.Cell>
                        <Table.Cell textAlign='right'>10 hours ago</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>
                            <Icon name='folder' /> build
                        </Table.Cell>
                        <Table.Cell>Initial commit</Table.Cell>
                        <Table.Cell textAlign='right'>10 hours ago</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>
                            <Icon name='file outline' /> package.json
                        </Table.Cell>
                        <Table.Cell>Initial commit</Table.Cell>
                        <Table.Cell textAlign='right'>10 hours ago</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>
                            <Icon name='file outline' /> Gruntfile.js
                        </Table.Cell>
                        <Table.Cell>Initial commit</Table.Cell>
                        <Table.Cell textAlign='right'>10 hours ago</Table.Cell>
                    </Table.Row>
                </Table.Body>
                </Table>
            </div>
        )
    }
}