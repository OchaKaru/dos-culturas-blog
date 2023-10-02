import * as React from 'react';
import {Transition} from 'react-transition-group';
import CommonButton from '../action/common-button';

import '../styles/submenu-button/appearance/submenu.scss';
import '../styles/submenu-button/appearance/submenu-button.scss';
import '../styles/submenu-button/appearance/submenu-panel.scss';

/**
 * The Arroz con Webo Submenu Button: It is used as a pseudo dropdown menu that takes up physical space.
 * Submenu options are made from the children to the button, so submenu buttons can contain submenu buttons.
 * 
 * @param {string} name Specifies the text to be displayed on the submenu button.
 * 
 * @param {string} role (optional) Can have values 'primary', 'secondary', 'tertiary', or 'surface'. Defaults to 'surface'.
 * @param {boolean} pill (optional) Specifies whether the submenu button should be pill shaped.
 * 
 * @param {boolean} dont_animate (optional) Specifies if the submenu opening should be animated
 * 
 * @param {string} surface
 */
const SubmenuDrawer = (props) => {
    if(!props.name) // verify a name is provided
        throw new Error();

    const ACCEPTED_ROLES = ['primary', 'secondary', 'tertiary', 'surface'];
    if(props.role && !ACCEPTED_ROLES.includes(props.role)) // verify if the role supplied is valid
        throw new Error();
    const role = props.role? props.role : "surface";
    
    // Defining the animation duration and the transition information
    const ANIMATION_DURATION = 200;
    const transition = {
        "transition": `height ${ANIMATION_DURATION}ms ease`
    };

    // Computing the height that the animations should open and close to based on scroll height
    const [open, set_open] = React.useState(false);
    let reference = React.useRef({"transition_styles": {}});
    const toggle_panel = () => {
        if(open && reference.current) {
            reference.current.transition_styles = {
                "enter": {"height": 0},
                "enter_active": {"height": `${reference.current.scrollHeight}px`},
                "enter_done": {"height": "auto"},
                "exit": {"height": `${reference.current.scrollHeight}px`},
                "exit_active": {"height": 0},
            };
        }
        set_open(!open);
    }
    React.useEffect(() => { // I don't know why this function is necessary for exit to work
        if(reference.current) {
            reference.current.transition_styles = {
                "enter": {"height": 0},
                "enter_active": {"height": `${reference.current.scrollHeight}px`},
                "enter_done": {"height": "auto"},
                "exit": {"height": `${reference.current.scrollHeight}px`},
                "exit_active": {"height": 0},
            };
        }
    }, [reference.current.transition_styles]);
    const [current_style, set_current_style] = React.useState({"height": 0});

    return (
        <div className="arroz-submenu">
            <CommonButton style={props.style} pill={props.pill} role={role} type="text" onClick={toggle_panel}>
                {props.name}
            </CommonButton>
            <Transition 
                nodeRef={reference}

                onEnter={() => set_current_style(reference.current.transition_styles.enter)}
                onEntering={() => set_current_style(reference.current.transition_styles.enter_active)}
                onEntered={() => set_current_style(reference.current.transition_styles.enter_done)}

                onExit={() => set_current_style(reference.current.transition_styles.exit)}
                onExiting={() => set_current_style(reference.current.transition_styles.exit_active)}

                timeout={ANIMATION_DURATION}
                in={open}
            >
                <div ref={reference} className="arroz-submenu-panel" style={{
                    ...transition,
                    ...current_style
                }}>
                    {props.children}
                </div>
            </Transition>
        </div>
    );
}

export default SubmenuDrawer;