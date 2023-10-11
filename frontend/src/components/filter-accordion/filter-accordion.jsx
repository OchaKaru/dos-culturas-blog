import * as React from 'react';
import SideSheet from '../../arroz-con-webo/components/containment/sheet/side-sheet';
import Submenu from '../../arroz-con-webo/components/containment/submenu';
import FilledButton from '../../arroz-con-webo/components/action/common-button/filled-button';
import TonalButton from '../../arroz-con-webo/components/action/common-button/tonal-button';

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
                "open": false,
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
                <Submenu key={group_type} name={group_type} pill context="surface">
                    {labelify_data(data[group_type])}
                </Submenu>
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
        this.setState({'open': !this.state.open});
    }

    render() {
        return (
            <>
                <div className='filter-accordion'>
                    <SideSheet open={this.state.open}>
                        {this.state.tab_list}
                        <div className='filter-button-container'>
                            <FilledButton pill onClick={this.filter}>Filter Recipes</FilledButton>
                            <TonalButton pill onClick={this.reset}>Reset Filters</TonalButton>
                        </div>
                    </SideSheet>
                    <button className='collapse-button' style={{'left': this.state.open ? '0' : '30vw'}} onClick={this.toggle_collapse} >{this.state.open ? "▶" : "◀"}</button>
                </div>
            </>
        );
    }
}