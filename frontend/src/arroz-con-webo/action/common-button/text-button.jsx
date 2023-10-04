import * as React from 'react';
import CommonButton from './common-button';

/**
 * The Arroz con Webo Text Button: Used where text buttons should be.
 * 
 * These params are props to the React Component:
 * @param {string} role (optional) Can have values 'primary', 'secondary', 'tertiary' or 'surface'. Defaults to 'surface'.
 * @param {boolean} pill (optional) Specifies if the corners are completely rounded off.
 * @param {boolean} ripple (optional) Specifies whether the ripple animation should play.
 * @param {function} onClick (optional) Specifies the callback function when the button is clicked.
 * 
 * @param {string} containerType (internal) Contains the value of the surface this component is sitting on.
 */
function TextButton(props) {
    const ACCEPTED_ROLES = ['primary', 'secondary', 'tertiary', 'surface'];
    if(props.role && !ACCEPTED_ROLES.includes(props.role))
        throw new Error();
    const role = props.role? props.role : "primary";
    const surface = props.containerType? props.containerType : "surface";

    const computedClassName = props.className? props.className + ` arroz-${role}-text-button arroz-on-${surface}-button` : `arroz-${role}-text-button arroz-on-${surface}-button`;
    
    return (
        <CommonButton className={computedClassName} pill={props.pill} ripple={props.ripple} onClick={props.onClick} containerType={surface}>
            {props.children}
        </CommonButton>
    );
}

export default TextButton;