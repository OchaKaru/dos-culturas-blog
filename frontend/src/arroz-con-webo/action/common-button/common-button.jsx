import * as React from 'react';
import './styles/button.scss';

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
 * @param {string} containerType (internal) Specifies what surface color the ripple should be.
 */
const CommonButton = (props) => {
    const surface = props.containerType? props.containerType : "surface";
    const computedClassName = props.className? props.className + (props.pill? ` arroz-pill-button` : ` arroz-square-button`) : (props.pill? `arroz-pill-button` : `arroz-square-button`) ;
    
    const handle_click = (event) => {
        const button = event.currentTarget;
        const circle = document.createElement("span");
        const radius = button.clientWidth > button.clientHeight? button.clientWidth / 2 : button.clientHeight / 2;
        circle.style.width = circle.style.height = `${radius * 2}px`;
        circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
        circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
        circle.classList.add(`arroz-${surface}-ripple`);

        const ripple = button.getElementsByClassName(`arroz-${surface}-ripple`)[0];
        if(ripple)
            ripple.remove();

        button.appendChild(circle);
        if(props.onClick)
            props.onClick();
    }

    return (
        <button className={'arroz-button ' + computedClassName} onClick={handle_click}>
            {props.children}
        </button>
    );
}

export default CommonButton;