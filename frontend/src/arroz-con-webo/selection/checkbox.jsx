import * as React from 'react';

import '../styles/checkbox/checkbox.scss';

/**
 * 
 * @param {string} label
 * @param {boolean} checked (optional)
 * 
 * @param {function} onToggle
 */
function Checkbox(props) {
    if(!props.label)
        throw new Error();
    const label = props.label;
    const [checked, set_checked] = React.useState(props.checked? true : false);

    const role = "primary";

    return (
        <label htmlFor={label} className='arroz-checkbox'>
            <div className='arroz-checkbox-checkbox' >
                <input id={label} type="checkbox" name={label} checked={checked} onClick={() => set_checked(!checked)} onChange={props.onToggle}/>
            </div>
            <span className='arroz-checkbox-label'>
                {label}
            </span>
        </label>
    );
}

export default Checkbox;