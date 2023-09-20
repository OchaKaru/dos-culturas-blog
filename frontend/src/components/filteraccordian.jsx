import * as React from 'react';
import FilterTab from './filtertab';

export default class FilterAccordian extends React.Component {
    constructor(props) {
        super(props);

        if(props.data) {
            this.filter = this.filter.bind(this);
            this.reset = this.reset.bind(this);
            this.toggle_checked = this.toggle_checked.bind(this);

            this.state = {
                "tab_list": this.tabify_data(props.data),
                "groups_checked": new Set()
            };
        }
    }

    toggle_checked(group) {
        let groups_checked = this.state.groups_checked
        if(groups_checked.has(group))
            groups_checked.delete(group);
        else
            groups_checked.add(group);
        
        this.setState({"groups_checked": groups_checked})
    }

    componentDidUpdate(prevProps) {
        if(prevProps.data !== this.props.data)
          this.setState({"tab_list": this.tabify_data(this.props.data)});
    }

    filter() {
        this.props.onFilter(Array.from(this.state.groups_checked));
    }

    reset() {
        this.setState({"groups_checked": new Set()});
        this.props.onReset();
    }

    /*
        receives a JSON object with different keys and lists of filters within those keys
    */
    tabify_data(data) {
        let tab_list = [];

        ["Main Ingredient", "Dietary Restriction", "Culture", "Cooking Method"].forEach(group_type => {
            tab_list.push(<FilterTab key={group_type} name={group_type} length={data[group_type].length} data={data[group_type]} onToggle={this.toggle_checked} />);
        });

        return tab_list;
    }

    display_tab() {
        let tabs_to_display = [];
        
        this.state.tab_list.forEach(tab => {
            if(tab.props.length !== 0)
                tabs_to_display.push(tab);
        });

        return tabs_to_display;
    }

    render() {
        return (
            <div>
                {this.display_tab()}
                <button onClick={this.filter} >Filter Recipes</button>
                <button onClick={this.reset} >Reset Filters</button>
            </div>
        );
    }
}