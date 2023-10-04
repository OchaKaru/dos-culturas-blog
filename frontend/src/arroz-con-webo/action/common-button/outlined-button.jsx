import * as React from 'react';
import CommonButton from './common-button';

/**
 * The Arroz con Webo Outlined Button: Used where Outlined buttons should be.
 * 
 * These params are props to the React Component:
 * @param {string} role (optional) Can have values 'primary', 'secondary', or 'tertiary'. Defaults to 'primary'.
 * @param {boolean} pill (optional) Specifies if the corners are completely rounded off.
 * @param {boolean} ripple (optional) Specifies whether the ripple animation should play.
 * @param {function} onClick (optional) Specifies the callback function when the button is clicked.
 * 
 * @param {string} onRole (internal) Contains the value of the surface this component is sitting on.
 */
function OutlinedButton(props) {
    const ACCEPTED_ROLES = ['primary', 'secondary', 'tertiary'];
    if(props.role && !ACCEPTED_ROLES.includes(props.role))
        throw new Error();
    const role = props.role? props.role : "primary";
    
    const ACCEPTED_ON_ROLES = [
        'primary', 'primary-surface',
        'secondary', 'secondary-surface',
        'tertiary', 'tertiary-surface',
        'surface'
    ];
    if(!props.onRole || !ACCEPTED_ON_ROLES.includes(props.onRole))
        throw new Error();
    const computedClassName = props.className? props.className + ` arroz-${role}-outlined-button arroz-on-${surface}-button` : `arroz-${role}-outlined-button arroz-on-${surface}-button`;
    
    return (
        <CommonButton className={computedClassName} pill={props.pill} ripple={props.ripple} onClick={props.onClick} containerType={surface}>
            {props.children}
        </CommonButton>
    );
}

export default OutlinedButton;