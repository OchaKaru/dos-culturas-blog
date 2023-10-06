import * as React from 'react';
import Card from './card';

/**
 * This is the Arroz con Webo Outlined Card: Used where content needs to be in subcontainers. The cards
 * contain related elements. Content can be anything.
 * 
 * @param {string} role (optional) Can have value of 'primary', 'secondary', 'tertiary', or 'surface'. Defaults to 'surface'.
 * @param {string} level (optional) When using 'surface' role, the `level` provides priority of the card in the visual heirarchy.
 * @param {boolean} rounded (optional) Specifies whether the card corners are rounded.
 * 
 * @param {string} context (internal) Informs children of the type of container they are inside of.
 */
function OutlinedCard(props) {
    const ACCEPTED_ROLES = ['primary', 'secondary', 'tertiary', 'surface'];
    if(props.role && !ACCEPTED_ROLES.includes(props.role))
        throw new Error();
    const role = props.role;

    const computedClassName = props.className? props.className + ` arroz-${role}-outlined-card` : `arroz-${role}-outlined-card`;
    return (
        <Card className={'arroz-filled-card ' + computedClassName} rounded={props.rounded} context={props.context}>
            {props.children}
        </Card>
    );
}

export default OutlinedCard;