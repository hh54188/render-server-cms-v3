import React from 'react';

export default class CustomInput extends React.Component {
    render() {
        return (
            <input value={this.props.data} onChange={this.props.inputChangeHandler} />
        )
    }
}