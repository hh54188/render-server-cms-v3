import React from 'react';
import ReactDOM from 'react-dom';

import ConfigView from 'components/ConfigView.js';
import ConfigStore from 'stores/ConfigStore.js';

import {Container, Grid} from 'semantic-ui-react';

require('semantic-ui-css/semantic.min.css');

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            config: ConfigStore.getConfig()
        }
        this.updateConfigProperty = this.updateConfigProperty.bind(this);
    }
    updateConfigProperty(fieldName, newValue) {
        this.setState({
            config: this.state.config.set(fieldName, newValue)
        })
    }
    render() {
        return (
            <Container fluid={true}>
                <Grid container={true}>
                    <Grid.Row></Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <ConfigView
                                updateConfigInterface={this.updateConfigProperty}
                                config={this.state.config}
                            />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        );
    }
}

ReactDOM.render(<App />, document.querySelector('#container'));