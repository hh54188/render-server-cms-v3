import React from 'react';
import ReactDOM from 'react-dom';

import RenderServerConfig from 'components/render_server_config.js';

import {Container, Grid} from 'semantic-ui-react';

require('semantic-ui-css/semantic.min.css');

let rsCfgObj = {
    isRunning: false,
    absolutePath: 'D:\\render-server',
    enableProductionDir: true,
    port: '8124',
    dbName: 'nova_ts_liguangyi',
    dbAccount: 'root',
    dbPassword: '123456',
    dbPort: '8877'    
};

class App extends React.Component {
    render() {
        return (
            <Container fluid={true}>
                <Grid container={true}>
                    <Grid.Row></Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <RenderServerConfig config={rsCfgObj} />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        );
    }
}

ReactDOM.render(<App />, document.querySelector('#container'));