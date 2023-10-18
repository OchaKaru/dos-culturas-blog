import * as React from 'react';
import {Checkbox, ElevatedButton, FilledButton, SideSheet, Submenu, TonalButton} from '../arroz-con-webo';

export default function FilterAccordion({data, onFilter, onReset}) {
    const [tab_list, set_tab_list] = React.useState();
    const checked_list = React.useMemo(() => {
        return new Set();
    }, [])
    
    const [open, set_open] = React.useState(false);

    const toggle_checked = React.useCallback((label) => {
        checked_list.has(label)? checked_list.delete(label) : checked_list.add(label);
    }, [checked_list]);

    // receives a JSON object with different keys and lists of filters within those keys
    const tabify_data = React.useCallback((data) => {
        let tabs = [];

        const labelify_data = data => {
            let labels = [];
    
            if(data)
                for(let i = 0; i < data.length; i++) {
                    labels.push(<Checkbox key={i} label={data[i].name} defaultChecked={checked_list.has(data[i].name)} onToggle={toggle_checked} />);
                }
    
            return labels;
        };

        
        ["Main Ingredient", "Dietary Restriction", "Culture", "Cooking Method"].forEach(group_type => {
            tabs.push(
                <Submenu key={group_type} name={group_type} pill>
                    {labelify_data(data[group_type])}
                </Submenu>
            );
        });

        return tabs;
    }, [checked_list, toggle_checked]);

    React.useEffect(() => {
        set_tab_list(tabify_data(data))
    }, [data, checked_list, tabify_data])

    
    function filter() {
        onFilter(Array.from(checked_list));
    }

    function reset() {
        checked_list.clear();
        onReset();
    }

    return (
        <div className='filter-accordion'>
            <SideSheet open={open}>
                <ElevatedButton pill onClick={() => set_open(false)}>Close</ElevatedButton>
                {tab_list}
                <div className='filter-button-container'>
                    <FilledButton pill onClick={filter}>Filter Recipes</FilledButton>
                    <TonalButton pill onClick={reset}>Reset Filters</TonalButton>
                </div>
            </SideSheet>
            <FilledButton className='collapse-button' pill onClick={() => set_open(!open)} >Filters</FilledButton>
        </div>
    );
}