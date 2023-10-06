import * as React from 'react';
import Card from './card';

import {valid_container_role} from '../../util/validation';
import {NoContextError} from '../../util/error';

/**
 * This is the Arroz con Webo Filled Card: Used where content needs to be in subcontainers. The cards
 * contain related elements. Content can be anything.
 * 
 * @param {string} role (optional) Can have value of 'primary', 'secondary', 'tertiary', or 'surface-<level>'. Defaults to 'surface'.
 * @param {boolean} rounded (optional) Specifies whether the card corners are rounded.
 */
function FilledCard(props) {
    // if(!props.context)
    //     throw NoContextError;
    // const context = props.context;

    if(props.role && !valid_container_role(props.role))
        throw new Error();
    const role = props.role? props.role : 'secondary';

    const computedClassName = props.className? props.className + ` arroz-${role}-filled-card` : `arroz-${role}-filled-card`;
    return (
        <Card className={computedClassName} rounded={props.rounded}>
            {props.children.map(child => React.cloneElement(child, {'context': `${role + '-container'}`}))}
        </Card>
    );
}

export default FilledCard;