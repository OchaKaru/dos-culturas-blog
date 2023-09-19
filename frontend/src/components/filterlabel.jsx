import * as React from 'react';

export default class FilterLabel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            "name": props.data.name
        }
    }

    render() {
        return (
            <div className='filterlabel'>
                <input id={this.state.name} type="checkbox" onChange={() => {this.props.onToggle(this.state.name)}} />
                <label htmlFor={this.state.name}>{this.state.name}</label>
            </div>
        );
    }
}