import React from 'react'

class TabHeaderItem extends React.Component {
    render () {
        let classContent = this.props.active ? "active item" : "item";
        return (
            <a className={classContent} data-tab={this.props.name}>{this.props.text}</a>            
        )
    }
}

export default class TabHeader extends React.Component {
    render() {
        let content = [];
        for (let i = 0; i < this.props.data.length; i++) {
            let tempObj = this.props.data[i];
            content.push(<TabHeaderItem key={i} active={tempObj.active} name={tempObj.name} text={tempObj.text} />);
        }
        return (
            <div className="ui top attached tabular tab-custom menu">
                {content}
            </div>
        )
    }
}