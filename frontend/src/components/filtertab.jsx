import * as React from 'react';
import FilterLabel from './filterlabel';

export default class FilterTab extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);

        this.state = {
            "name": props.name,
            "label_list": this.labelify_data(props.data),
            "display": "none"
        };
    }

    labelify_data(data) {
        let label_list = [];

        for(let i = 0; i < data.length; i++) {
            label_list.push(<FilterLabel key={i} data={data[i]} checked={false} onToggle={this.props.onToggle} />);
        }

        return label_list;
    }

    componentDidUpdate(prevProps) {
        if(prevProps.data !== this.props.data)
            this.setState({
                "name": this.props.name,
                "label_list": this.labelify_data(this.props.data)
            });
    }

    toggle() {
        console.log("toggle");
        if(this.state.display === "none")
            this.setState({"display": "block"});
        else
            this.setState({"display": "none"});
    }

    render() {
        return (
            <div className='filtertab'>
                <button className='accordian' onClick={this.toggle} >{this.state.name}</button>
                <div className='accordianpanel' style={{"display": this.state.display}}>
                    {this.state.label_list}
                </div>
            </div>
        );
    }
}