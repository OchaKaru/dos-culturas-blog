import * as React from 'react';
import Card from './card';

import {surface_role, valid_container_role} from '../../util/validation';
import {InvalidRoleError} from '../../util/error';

/**
 * This is the Arroz con Webo Elevated Card: Used where content needs to be in subcontainers. The cards
 * contain related elements. Content can be anything.
 * 
 * @param {string} role (optional) Can have value of 'primary', 'secondary', 'tertiary', or 'surface-<level>'. Defaults to 'surface'.
 * @param {boolean} rounded (optional) Specifies whether the card corners are rounded.
 * @param {boolean} interactable (optional) Specifies if the card should have a hover effect.
 * @param {boolean} ripple (optional) Specifies if the card should have a ripple animation.
 */
function ElevatedCard(props) {
    if(props.role && !valid_container_role(props.role))
        throw new InvalidRoleError();
    const role = props.role? props.role : 'surface';

    const current_surface = surface_role(role)? "surface" : role + "-container";
    const computedClassName = props.className? props.className + ` arroz-${role}-elevated-card` : `arroz-${role}-elevated-card`;
    return (
        <Card className={computedClassName} rounded={props.rounded} interactable={props.interactable} ripple={props.ripple} context={current_surface}>
            {props.children}
        </Card>
    );
}

export default ElevatedCard;