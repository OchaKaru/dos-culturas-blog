import * as React from 'react';
import {Transition} from 'react-transition-group';
import CommonButton from '../action/common-button';

import '../styles/submenu-button/appearance/submenu-panel.scss';
import '../styles/submenu-button/transitions/open.scss';

/**
 * The Arroz con Webo Submenu Button: It is used as a pseudo dropdown menu that takes up physical space.
 * Submenu options are made from the children to the button, so submenu buttons can contain submenu buttons.
 * 
 * @param {string} name Specifies the text to be displayed on the submenu button.
 * 
 * @param {string} role (optional) Can have values 'primary', 'secondary', 'tertiary', or 'surface'. Defaults to 'surface'.
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

    const ACCEPTED_ROLES = ['primary', 'secondary', 'tertiary', 'surface'];
    if(props.role && !ACCEPTED_ROLES.includes(props.role))
        throw new Error();
    const role = props.role? props.role : "primary";
    const ACCEPTED_TYPES = ['filled', 'outlined', 'text'];
    if(props.type && !ACCEPTED_TYPES.includes(props.type)) // verify if the style supplied is valid
        throw new Error();
    const type = props.type? props.type : "filled";
    
    const ANIMATION_DURATION = 200;
    const default_style = {
        'height': 0,
        'transition': `height ${ANIMATION_DURATION}ms ease-in-out`,
    };

    //
    const [open, set_open] = React.useState(false);
    const toggle_panel = () => {
        set_open(!open);
    }

    let reference = React.useRef({"transition_styles": {}});
    const [computed_height, set_height] = React.useState(0);
    React.useEffect(() => {
        if(reference.current) {
            set_height(reference.current.scrollHeight);

            reference.current.transition_styles = {
                "entering": {"height": 0},
                "entered": {"height": `${computed_height}px`},
                "exiting": {"height": `${computed_height}px`},
                "exited": {"height": 0},
            }

            console.log(reference.current.transition_styles["entered"]);
        }
    }, [props.children, computed_height]);

    return (
        <div className="arroz-submenu">
            <CommonButton style={props.style} pill={props.pill} role={role} type={type} onClick={toggle_panel}>{props.name}</CommonButton>
            <Transition 
                nodeRef={reference} 
                timeout={ANIMATION_DURATION}
                in={open}
            >
                {state => (
                    <div ref={reference} className="arroz-submenu-panel" style={{
                        ...default_style,
                        ...reference.current.transition_styles[state]
                    }}>
                        {props.children}
                    </div>
                )}
            </Transition>
        </div>
    );
}

export default SubmenuButton;