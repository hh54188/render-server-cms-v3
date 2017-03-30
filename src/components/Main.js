import React from 'react';
import ReactDOM from 'react-dom';

import Input from 'components/input';
import FormExampleInlineGroupedFields from 'components/panel_config.js';

import {Container, Grid} from 'semantic-ui-react';

require('semantic-ui-css/semantic.min.css');

class App extends React.Component {
    render() {
        return (
            <Container fluid={true}>
                <Grid container={true}>
                    <Grid.Row></Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <FormExampleInlineGroupedFields />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        );
    }
}

ReactDOM.render(<App />, document.querySelector('#container'));