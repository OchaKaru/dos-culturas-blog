import * as React from 'react';

import '../styles/button/arroz-button.scss'

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
 * @param {string} style (optional) Can have values 'elevated', 'filled', 'tonal', 'outlined', or 'text'. Defaults to 'filled'.
 * @param {boolean} pill (optional) Specifies if the corners are completely rounded off.
 * @param {boolean} ripple (optional) Specifies whether the ripple animation should play.
 * @param {boolean} custom (optional) Specifies if the `className` should be joined or replaced
 */
const CommonButton = (props) => {
    const ACCEPTED_STYLES = ['elevated', 'filled', 'tonal', 'outlined', 'text'];
    if(props.style && !ACCEPTED_STYLES.includes(props.style))
        throw new Error();
    let computedClassName;
    if(props.style)
        computedClassName = props.className + " arroz-" + props.style;
    else
        computedClassName = props.className + " arroz-outline";
    

    return (
        <button id='arroz-button' className={computedClassName} onClick={props.onClick}>
            {props.children}
        </button>
    );
}

export default CommonButton;