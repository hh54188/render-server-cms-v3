import React from 'react'

export default class TabContent extends React.Component {  
    render() {
        return (
            <div className="ui bottom attached active tab segment" data-tab={this.props.name}>
                {this.props.children}
            </div>
        )
    }
}