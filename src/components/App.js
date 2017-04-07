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
            configDataModel: ConfigStore.getConfig(),
            configUIModel: ConfigStore.getUIState()
        }
        this.updateConfigProperty = this.updateConfigProperty.bind(this);
        this.setConfigViewLoadingState = this.setConfigViewLoadingState.bind(this);
    }
    updateConfigProperty(fieldName, newValue) {
        this.setState({
            configDataModel: this.state.configDataModel.set(fieldName, newValue)
        })
    }
    setConfigViewLoadingState(loadingState) {
        this.setState({
            configUIModel: this.state.configUIModel.set('loading', true)
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
                                setLoadingState={this.setConfigViewLoadingState}
                                config={this.state.configDataModel}
                                UIState={this.state.configUIModel}
                            />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        );
    }
}

ReactDOM.render(<App />, document.querySelector('#container'));