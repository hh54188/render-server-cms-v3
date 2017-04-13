import React from 'react'

export default class TabHeader extends React.Component {
    render() {
        return (
            <div className="ui top attached tabular menu">
                <a className="item" data-tab="config">Render配置</a>
                <a className="active item" data-tab="template">模板</a>
            </div>
        )
    }
}