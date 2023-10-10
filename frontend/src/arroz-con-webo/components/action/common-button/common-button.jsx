import * as React from 'react';
import './styles/button.scss';

import {surface_role} from '../../util/validation';
import {NoContextError} from '../../error/error';

/**
 * The Arroz con Webo Common Button: Used where buttons should be. It can be elevated, filled, tonal,
 * outlined, or just text. According to Google's Material Design Guidelines, the order of precedence for
 * the buttons:
 * 1. Filled
 * 2. Tonal or Elevated
 * 3. Outlined
 * 4. Text
 * 
 * Elevated buttons should be used sparingly.
 * 
 * These params are props to the React Component:
 * @param {function} onClick (optional) Specifies the callback function when the button is clicked.
 * @param {boolean} pill (optional) Specifies if the corners are completely rounded off.
 * @param {boolean} ripple (optional) Specifies whether the ripple animation should play.
 * 
 * @param {string} context (internal) Specifies what surface color the ripple should be.
 */
const CommonButton = (props) => {
    if(!props.context)
        throw new NoContextError();
    const surface = surface_role(props.context)? "surface" : props.context;

    if(props.ripple) {

    } else {

    }
    
    const interaction = ` arroz-on-${surface}-button`;
    const pill = props.pill? `arroz-pill-button` : `arroz-square-button`;
    const computedClassName = props.className? props.className + " " + pill + interaction : pill + interaction;
    return (
        <button className={'arroz-button ' + computedClassName} onClick={props.onClick}>
            {props.children}
        </button>
    );
}

export default CommonButton;