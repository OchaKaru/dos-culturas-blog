import * as React from 'react';
import './styles/card.scss';

import {surface_role} from '../../util/validation';
import {NoContextError} from '../../util/error';

/**
 * This is the Arroz con Webo Card: Used where content needs to be in subcontainers. The cards
 * contain related elements and can be filled, elevated, or outlined. Content can be anything.
 * 
 * @param {boolean} rounded (optional) Specifies if the corners are rounded.
 * @param {boolean} interactable (optional) Specifies if the card should have a hover effect.
 * @param {boolean} ripple (optional) Specifies if the card should have a ripple animation.
 * 
 * @param {string} context (internal) Informs children of the type of container they are inside of.
 */
function Card(props) {
    if(!props.context)
    throw new NoContextError();
    const surface = surface_role(props.context)? "surface" : props.context;

    if(props.interactable) {
        if(props.ripple) {

        } else {
            
        }
    }

    const corner_class = props.rounded? `arroz-rounded-card` : `arroz-square-card`;
    const computedClassName = props.className? props.className + " " + corner_class : corner_class;
    return (
        <div className={'arroz-card ' + computedClassName}>
            {React.Children.map(props.children, child => React.cloneElement(child, {'context': surface}))}
        </div>
    );
}

export default Card;

