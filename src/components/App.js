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
    }
    bindConfigInputChangeHandler(fieldName) {
        return function (event) {
            console.log(fieldName, event.target.value);
        }
    }
    render() {
        return (
            <Container fluid={true}>
                <Grid container={true}>
                    <Grid.Row></Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <ConfigView 
                                bindInputChangeHandler={this.bindConfigInputChangeHandler} 
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