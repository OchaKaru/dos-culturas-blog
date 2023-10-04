import * as React from 'react';

import '../styles/button/common-button.scss';

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
 * @param {string} role (optional) Can have values 'primary', 'secondary', or 'tertiary'. Defaults to 'primary'. Also, 'surface' for text buttons.
 * @param {string} type (optional) Can have values 'elevated', 'filled', 'tonal', 'outlined', or 'text'. Defaults to 'filled'.
 *
 * @param {boolean} pill (optional) Specifies if the corners are completely rounded off.
 * @param {boolean} ripple (optional) Specifies whether the ripple animation should play.
 * 
 * @param {string} surface (internal) Contains the value of the surface this component is sitting on.
 */
const CommonButton = (props) => {
    const ACCEPTED_ROLES = ['primary', 'secondary', 'tertiary', 'surface'];
    if(props.role && !ACCEPTED_ROLES.includes(props.role))
        throw new Error();
    const role = props.role? props.role : "primary";

    const ACCEPTED_TYPES = ['elevated', 'filled', 'tonal', 'outlined', 'text'];
    if(props.type && !ACCEPTED_TYPES.includes(props.type))
        throw new Error();
    const type = props.type? props.type : "filled";
    if(role === "surface" && props.type !== "text")
        throw new Error();

    const computedClassName = (props.className? props.className + ` arroz-${role}-${type}-button` : `arroz-${role}-${type}-button`) + (props.pill? ` arroz-pill-button` : ` arroz-square-button`);
    
    const handle_click = (event) => {
        const button = event.currentTarget;
        const circle = document.createElement("span");
        const radius = button.clientWidth > button.clientHeight? button.clientWidth / 2 : button.clientHeight / 2;
        circle.style.width = circle.style.height = `${radius * 2}px`;
        circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
        circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
        circle.classList.add(`arroz-${role}-${type}-ripple`);

        const ripple = button.getElementsByClassName(`arroz-${role}-${type}-ripple`)[0];
        if(ripple)
            ripple.remove();

        button.appendChild(circle);
        if(props.onClick)
            props.onClick();
    }

    return (
        <button className={'arroz-common-button ' + computedClassName} onClick={handle_click}>
            {props.children}
        </button>
    );
}

export default CommonButton;