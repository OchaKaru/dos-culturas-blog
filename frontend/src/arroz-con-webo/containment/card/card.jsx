import * as React from 'react';
import './styles/card.scss';

/**
 * This is the Arroz con Webo Card: Used where content needs to be in subcontainers. The cards
 * contain related elements and can be filled, elevated, or outlined. Content can be anything.
 * 
 * @param {} rounded (optional) Specifies if the corners are
 * @param {} context (internal)
 */
function Card(props) {
    // const role = props.role? props.role : 'surface';
    const corner_class = props.rounded? `arroz-rounded-card` : `arroz-square-card`;
    const computedClassName = props.className? props.className + " " + corner_class : corner_class;

    return (
        <div className={'arroz-card ' + computedClassName}>
            {props.children}
        </div>
    );
}

export default Card;

// * @param {} role (optional) Can have value of 'primary', 'secondary', 'tertiary', or 'surface'. Defaults to 'surface'.
// * @param {} type (optional) Can have value of 'filled', 'elevated', or 'outlined'. Defaults to 'filled'.

// const handle_click = (event) => {
//     event.stopPropagation();
//     const target = event.currentTarget;
//     const target_hitbox = target.getBoundingClientRect();
//     const circle = document.createElement("span");
//     const radius = target_hitbox.width > target_hitbox.height? target_hitbox.width / 2 : target_hitbox.height / 2;
//     circle.style.width = circle.style.height = `${radius * 2}px`;
//     circle.style.left = `${event.clientX - target_hitbox.left - radius}px`;
//     circle.style.top = `${event.clientY - target_hitbox.top - radius}px`;
//     circle.classList.add(`arroz-${role}-ripple`);

//     const ripple = target.getElementsByClassName(`arroz-${role}-ripple`)[0];
//     if(ripple)
//         ripple.remove();

//     target.appendChild(circle);
//     if(props.onClick)
//         props.onClick();
// }