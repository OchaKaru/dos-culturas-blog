import * as React from 'react';
import CommonButton from './common-button';

import {valid_role, surface_role} from '../../util/validation';
import {InvalidRoleError, NoContextError} from '../../util/error';

/**
 * The Arroz con Webo Outlined Button: Used where Outlined buttons should be.
 * 
 * These params are props to the React Component:
 * @param {string} role (optional) Can have values 'primary', 'secondary', or 'tertiary'. Defaults to 'primary'.
 * @param {boolean} pill (optional) Specifies if the corners are completely rounded off.
 * @param {boolean} ripple (optional) Specifies whether the ripple animation should play.
 * @param {function} onClick (optional) Specifies the callback function when the button is clicked.
 * 
 * @param {string} context (internal) Contains the value of the surface this component is sitting on.
 */
function OutlinedButton(props) {
    if(!props.context)
        throw new NoContextError();
    const parent_surface = surface_role(props.context)? "surface" : props.context;

    if(props.role && !valid_role(props.role))
        throw new InvalidRoleError();
    const role = props.role? props.role : "primary";

    const computedClassName = props.className? props.className + ` arroz-${role}-outlined-button` : `arroz-${role}-outlined-button`;
    return (
        <CommonButton className={computedClassName} pill={props.pill} ripple={props.ripple} onClick={props.onClick} context={parent_surface}>
            {props.children}
        </CommonButton>
    );
}

export default OutlinedButton;