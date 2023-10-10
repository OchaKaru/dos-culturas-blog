import * as React from 'react';
import CommonButton from './common-button';

import {valid_role} from '../../util/validation';
import {InvalidRoleError} from '../../util/error';

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
    if(props.role && !valid_role(props.role))
        throw new InvalidRoleError({"code": "Invalid props.role value.", "value": props.role});
    const role = props.role? props.role : "primary";

    const computedClassName = props.className? props.className + ` arroz-${role}-filled-button` : `arroz-${role}-filled-button`;
    return (
        <CommonButton className={computedClassName} pill={props.pill} ripple={props.ripple} onClick={props.onClick} context={role}>
            {props.children}
        </CommonButton>
    );
}

export default FilledButton;