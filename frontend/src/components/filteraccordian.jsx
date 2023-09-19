import * as React from 'react';
import FilterTab from './filtertab';

export default class FilterAccordian extends React.Component {
    constructor(props) {
        super(props);

        this.filter = this.filter.bind(this);
        this.toggle_checked = this.toggle_checked.bind(this);

        this.state = {
            "tab_list": this.tabify_data(props.data),
            "groups_checked": new Set()
        };
    }

    toggle_checked(group) {
        let groups_checked = this.state.groups_checked
        if(groups_checked.has(group))
            groups_checked.delete(group);
        else
            groups_checked.add(group);
        
        this.setState({"groups_checked": groups_checked})
    }

    filter() {
        this.props.onFilter(Array.from(this.state.groups_checked));
    }

    /*
        receives a JSON object with different keys and lists of filters within those keys
    */
    tabify_data(data) {
        let tab_list = [];

        ["Main Ingredient", "Dietary Restriction", "Culture", "Cooking Method"].forEach(group_type => {
            tab_list.push(<FilterTab key={group_type} name={group_type} data={data[group_type]} onToggle={this.toggle_checked} />);
        });

        return tab_list;
    }

    render() {
        return (
            <div>
                {this.state.tab_list}
                <button onClick={this.filter} >Filter Recipes</button>
                <button onClick={this.props.onReset} >Reset Filters</button>
            </div>
        );
    }
}