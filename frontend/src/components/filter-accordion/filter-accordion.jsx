import * as React from 'react';
import CommonButton from '../../arroz-con-webo/action/common-button';
import SubmenuDrawer from '../../arroz-con-webo/containment/submenu-drawer';

import FilterTab from './filter-tab';
import FilterLabel from './filter-label';

export default class FilterAccordion extends React.Component {
    constructor(props) {
        super(props);

        if(props.data) {
            this.filter = this.filter.bind(this);
            this.reset = this.reset.bind(this);
            this.toggle_checked = this.toggle_checked.bind(this);
            this.toggle_collapse = this.toggle_collapse.bind(this);

            this.state = {
                "tab_list": this.tabify_data(props.data),
                "groups_checked": new Set(),
                "collapsed": true,
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

        const labelify_data = (data => {
            let label_list = [];
    
            for(let i = 0; i < data.length; i++) {
                label_list.push(<FilterLabel key={i} data={data[i]} checked={false} onToggle={this.toggle_checked} />);
            }
    
            return label_list;
        }).bind(this);

        ["Main Ingredient", "Dietary Restriction", "Culture", "Cooking Method"].forEach(group_type => {
            tab_list.push(
                <SubmenuDrawer key={group_type} name={group_type} pill>
                    {labelify_data(data[group_type])}
                </SubmenuDrawer>
            );
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

    toggle_collapse() {
        this.setState({'collapsed': !this.state.collapsed});
    }

    render() {
        return (
            <>
                <div className='filter-accordion'>
                    <div className='accordian-menu' style={{'width': this.state.collapsed ? '0': '20vw'}} >
                        {this.display_tab()}
                        <div className='filter-button-container'>
                            <CommonButton type="filled" pill onClick={this.filter} >Filter Recipes</CommonButton>
                            <CommonButton type="tonal" pill onClick={this.reset} >Reset Filters</CommonButton>
                        </div>
                    </div>
                    <button className='collapse-button' style={{'left': this.state.collapsed ? '0' : '30vw'}} onClick={this.toggle_collapse} >{this.state.collapsed ? "▶" : "◀"}</button>
                </div>
            </>
        );
    }
}