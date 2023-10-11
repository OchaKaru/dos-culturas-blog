import * as React from 'react';
import Checkbox from '../../arroz-con-webo/components/selection/checkbox';

export default class FilterLabel extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);

        this.state = {
            "name": props.data.name,
            "checked": props.checked
        };
    }

    toggle() {
        this.setState({"checked": !this.state.checked});
        this.props.onToggle(this.state.name);
    }

    componentDidUpdate(prevProps) {
        if(prevProps.data !== this.props.data)
            this.setState({
                "name": this.props.data.name,
                "checked": this.props.checked
            });

        console.log("here");
    }

    render() {
        return (
            // <div className='filter-label'>
            //     <input id={this.state.name} type="checkbox" checked={this.state.checked} onChange={this.toggle} />
            //     <label htmlFor={this.state.name}>{this.state.name}</label>
            // </div>

            <Checkbox id={this.state.name} label={this.state.name} checked={this.state.checked} onToggle={this.toggle} />
        );
    }
}