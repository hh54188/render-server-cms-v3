import React from 'react';
import ReactDOM from 'react-dom';

import {Container, Grid} from 'semantic-ui-react';
import ErrorModal from 'components/ErrorModal.js';
import SelectDirectoryModal from 'components/SelectDirectoryModal.js';

import ConfigView from 'components/ConfigView.js';
import ConfigStore from 'stores/ConfigStore.js';

import TemplateView from 'components/TemplateView.js';

import TabContainer from 'components/Tab/TabContainer.js';
import TabHeaderView from 'components/Tab/TabHeader.js';
import TabContentView from 'components/Tab/TabContent.js';

import AppStore from 'stores/AppStore.js';

import myEmitter from 'src/myEmitter.js';
import {Map} from 'immutable';

// require('semantic-ui-css/semantic.min.css');

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            configDataModel: Map({
                lunchState: 'OFFLINE',
                lunchInfo: '',
                watch: true,
                absolutePath: 'sample',
                enableProductionDir: true,
                port: 'sample',
                dbName: 'sample',
                dbAccount: 'sample',
                dbPassword: 'sample',
                dbPort: 'sample'
            }),
            configUIModel: ConfigStore.getUIState(),
            appUIModel: ConfigStore.getUIState()
        };
        this.updateConfigProperty = this.updateConfigProperty.bind(this);
        this.setConfigViewLoadingState = this.setConfigViewLoadingState.bind(this);

        myEmitter.on('CONFIG_STORE_CHANGED', () => {
            this.setState({
                configDataModel: ConfigStore.getConfig(),
                configUIModel: ConfigStore.getUIState()                
            });
        });

        myEmitter.on('APP_STORE_CHANGED', () => {
            this.setState({
                appUIModel: AppStore.getUIState()
            });
        })
    }
    updateConfigProperty(fieldName, newValue) {
        this.setState({
            configDataModel: this.state.configDataModel.set(fieldName, newValue)
        });
    }
    setConfigViewLoadingState(loadingState) {
        this.setState({
            configUIModel: this.state.configUIModel.set('loading', true)
        })
    }
    render() {
        let tabHeaderArr = [
            {
                active: false,
                name: 'config',
                text: 'Render配置'
            },
            {
                active: true,
                name: 'template',
                text: '模板'                
            },
            {
                active: false,
                name: 'create-template',
                text: '创建模板'
            }
        ];

        return (
            <Container fluid={true}>
                <SelectDirectoryModal 
                    open={this.state.appUIModel.get('showSelectDirectoryModal')}
                    error={this.state.appUIModel.get('rsDirectoryIsWrong')}
                />
                <ErrorModal 
                    open={this.state.appUIModel.get('showErrorModal')} 
                    message={this.state.appUIModel.get('errorModalMessage')} 
                />
                <Grid container={true}>
                    <Grid.Row>
                    </Grid.Row>                    
                    <Grid.Row>             
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <TabContainer>
                                <TabHeaderView data={tabHeaderArr} />

                                <TabContentView name={'config'}>
                                    <ConfigView
                                        config={this.state.configDataModel}
                                        UIState={this.state.configUIModel}
                                    />
                                </TabContentView>
                                
                                <TabContentView name={'template'}>
                                    <TemplateView />
                                </TabContentView>
                                
                                <TabContentView name={'create-template'}>
                                </TabContentView>                                
                            </TabContainer>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        );
    }
}

ReactDOM.render(<App />, document.querySelector('#container'));