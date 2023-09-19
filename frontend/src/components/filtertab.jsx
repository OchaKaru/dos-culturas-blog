import * as React from 'react';
import FilterLabel from './filterlabel';

export default class FilterTab extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            "name": props.name,
            "label_list": this.labelify_data(props.data)
        };
    }

    labelify_data(data) {
        let label_list = [];

        for(let i = 0; i < data.length; i++) {
            label_list.push(<FilterLabel key={i} data={data[i]} onToggle={this.props.onToggle} />);
        }

        return label_list;
    }

    render() {
        return (
            <div className='filtertab'>
                <span>{this.state.name}</span>
                <div className='accordianflap'>
                    {this.state.label_list}
                </div>
            </div>
        );
    }
}