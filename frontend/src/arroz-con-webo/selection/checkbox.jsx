import * as React from 'react';

import '../styles/checkbox/checkbox.scss';

/**
 * 
 * @param {string} label
 * @param {boolean} checked (optional)
 * 
 * @param {function} onToggle
 */
function Checkbox(props) {
    if(!props.label)
        throw new Error();
    const label = props.label;
    const [checked, set_checked] = React.useState(props.checked? true : false);

    const role = "primary";

    let reference = React.useRef(null);
   
    // this is an attempt at making a ripple effect for the wrapper, but i need to figure out how to keep the animation playing even on mouse up
    // React.useEffect(() => {
    //     if(reference.current)
    //         reference.current.addEventListener('mousedown', (event) => {
    //             const checkbox = event.currentTarget;
    //             const circle = document.createElement("span");
    //             const radius = checkbox.clientWidth > checkbox.clientHeight? checkbox.clientWidth / 2 : checkbox.clientHeight / 2;
    //             circle.style.width = circle.style.height = `${radius * 2}px`;
    //             circle.style.left = `${event.clientX - checkbox.offsetLeft - radius}px`;
    //             circle.style.top = `${event.clientY - checkbox.offsetTop - radius}px`;
    //             // circle.style.zIndex = '-1';
    //             circle.classList.add(`arroz-checkbox-ripple`);

    //             checkbox.appendChild(circle);
    //         });
    //         reference.current.addEventListener('mouseup', (event) => {
    //             const checkbox = event.currentTarget;

    //             const ripple = checkbox.getElementsByClassName(`arroz-checkbox-ripple`)[0];
    //             if(ripple)
    //                 ripple.remove();
    //         });
    // }, [])

    return (
        <label htmlFor={label} className='arroz-checkbox'>
            <div ref={reference} className='arroz-checkbox-checkbox' >
                <input id={label} type="checkbox" name={label} checked={checked} onClick={() => set_checked(!checked)} onChange={props.onToggle}/>
            </div>
            <span className='arroz-checkbox-label'>
                {label}
            </span>
        </label>
    );
}

export default Checkbox;