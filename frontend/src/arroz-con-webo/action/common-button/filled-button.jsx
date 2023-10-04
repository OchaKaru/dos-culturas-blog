import * as React from 'react';
import CommonButton from './common-button';

/**
 * The Arroz con Webo Filled Button: Used where filled buttons should be.
 * 
 * These params are props to the React Component:
 * @param {string} role (optional) Can have values 'primary', 'secondary', or 'tertiary'. Defaults to 'primary'. Also, 'surface' for text buttons.
 * @param {boolean} pill (optional) Specifies if the corners are completely rounded off.
 * @param {boolean} ripple (optional) Specifies whether the ripple animation should play.
 * @param {function} onClick (optional) Specifies the callback function when the button is clicked.
 */
function FilledButton(props) {
    const ACCEPTED_ROLES = ['primary', 'secondary', 'tertiary', 'surface'];
    if(props.role && !ACCEPTED_ROLES.includes(props.role))
        throw new Error();
    const role = props.role? props.role : "primary";

    const computedClassName = props.className? props.className + ` arroz-${role}-filled-button` : `arroz-${role}-filled-button`;
    
    return (
        <CommonButton className={computedClassName} pill={props.pill} ripple={props.ripple} onClick={props.onClick} containerType={role}>
            {props.children}
        </CommonButton>
    );
}

export default FilledButton;