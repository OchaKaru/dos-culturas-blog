import * as React from 'react';
import CommonButton from './common-button';

import Validation from '../../util/validation';

/**
 * The Arroz con Webo Text Button: Used where text buttons should be.
 * 
 * These params are props to the React Component:
 * @param {string} role (optional) Can have values 'primary', 'secondary', 'tertiary' or 'surface'. Defaults to 'surface'.
 * @param {boolean} pill (optional) Specifies if the corners are completely rounded off.
 * @param {boolean} ripple (optional) Specifies whether the ripple animation should play.
 * @param {function} onClick (optional) Specifies the callback function when the button is clicked.
 * 
 * @param {string} context (internal) Informs children of the type of container they are inside of.
 */
function TextButton(props) {
    if(props.role && !Validation.valid_role(props.role))
        throw new Error();
    const role = props.role? props.role : "primary";

    let surface;
    if(!props.context || Validation.surface_role(props.context))
        surface = 'surface';
    else surface = props.context;

    const computedClassName = props.className? props.className + ` arroz-${role}-text-button arroz-on-${surface}-button` : `arroz-${role}-text-button arroz-on-${surface}-button`;
    
    return (
        <CommonButton className={computedClassName} pill={props.pill} ripple={props.ripple} onClick={props.onClick} containerType={surface}>
            {props.children}
        </CommonButton>
    );
}

export default TextButton;