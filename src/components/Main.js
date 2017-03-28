import React from 'react';
import ReactDOM from 'react-dom';

import Input from 'components/input';

class App extends React.Component {
    render() {
        return (
            <div>
                <h1>Hello World</h1>
                <Input />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.querySelector('#container'));