import * as React from 'react';
import CommonButton from '../action/common-button';

/**
 * The Arroz con Webo Submenu Button: It is used as a pseudo dropdown menu that takes up physical space.
 * Submenu options are made from the children to the button, so submenu buttons can contain submenu buttons.
 * 
 * @param {string} name Specifies the text to be displayed on the submenu button.
 * 
 * @param {string} role (optional) Can have values 'primary', 'secondary', 'tertiary' or 'surface'. Defaults to 'surface'.
 * @param {string} type (optional) Can have values 'filled', 'outlined', or 'text'. Defaults to 'filled'.
 * @param {boolean} pill (optional) Specifies whether the submenu button should be pill shaped.
 * 
 * @param {boolean} dont_animate (optional) Specifies if the submenu opening should be animated
 * 
 * @param {string} surface
 */
const SubmenuButton = (props) => {
    if(!props.name) // verify a name is provided
        throw new Error();

    const ACCEPTED_STYLES = ['filled', 'outlined', 'text'];
    if(props.style && !ACCEPTED_STYLES.includes(props.style)) // verify if the style supplied is valid
        throw new Error();

    const toggle_panel = () => {

    }

    return (
        <div className="arroz-submenu">
            <CommonButton style={props.style} pill={props.pill} role="primary" type="filled" onClick={toggle_panel}>{props.name}</CommonButton>
            <div className={"arroz-submenu-panel "}>
                {props.children}
            </div>
        </div>
    );
}

export default SubmenuButton;