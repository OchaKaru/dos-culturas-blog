import * as React from 'react';
import {Checkbox, Icon, FilledButton, SideSheet, Submenu, TonalButton, useWindowDimensions} from '../arroz-con-webo';

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

    const [modal, set_modal] = React.useState(false);
    const {width} = useWindowDimensions();
    React.useEffect(() => {
        if(width < 700)
            set_modal(true);
        else
            set_modal(false);

        console.log(modal);
    }, [width]);
    
    function filter() {
        onFilter(Array.from(checked_list));
    }

    function reset() {
        checked_list.clear();
        onReset();
    }

    return (
        <>
            <FilledButton className={`collapse-button ${open? "open" : ""}`} pill onClick={() => set_open(!open)} >
                <Icon scale={2}>
                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                        <rect class="fltr-line1" x="7" y="10" width="18" height="2"/>
                        <rect class="fltr-line2" x="7" y="20" width="18" height="2"/>
                        <circle class="fltr-crcl1" cx="13" cy="21" r="3"/>
                        <circle class="fltr-crcl2" cx="19" cy="11" r="3"/>
                    </svg>
                </Icon>
                <span>Filters</span>
            </FilledButton>
            <SideSheet open={open} modal={modal}>
                <div className='filter-accordion'>
                    {tab_list}
                </div>
                <div className='filter-button-container'>
                    <FilledButton pill onClick={filter}>Filter Recipes</FilledButton>
                    <TonalButton pill onClick={reset}>Reset Filters</TonalButton>
                </div>
            </SideSheet>
        </>
    );
}