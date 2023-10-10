import * as React from 'react';

import {surface_role} from '../../util/validation';
import {NoContextError} from '../../error/error';

import './checkbox/checkbox.scss';

/**
 * This is the Arroz Con Webo Checkbox: It should be used when a user can select multiple items in a list.
 * 
 * @param {string} label (required)
 * @param {string} role (optional)
 * @param {boolean} checked (optional)
 * @param {function} onToggle (optional)
 * 
 * @param {string} context (internal)
 */
function Checkbox(props) {
    if(!props.context)
        throw new NoContextError();
    const surface = surface_role(props.context)? "surface" : props.context;

    if(!props.label)
        throw new Error();
    const label = props.label;
    const [checked, set_checked] = React.useState(props.checked? true : false);

    return (
        <label htmlFor={label} className='arroz-checkbox'>
            <div className='arroz-checkbox-checkbox' >
                <input id={label} type="checkbox" name={label} defaultChecked={checked} onClick={() => set_checked(!checked)} onChange={props.onToggle}/>
            </div>
            <span className='arroz-checkbox-label'>
                {label}
            </span>
        </label>
    );
}

export default Checkbox;