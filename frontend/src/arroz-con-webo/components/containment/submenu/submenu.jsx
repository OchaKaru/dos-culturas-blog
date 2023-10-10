import * as React from 'react';
import {Transition} from 'react-transition-group';
import TextButton from '../../action/common-button/text-button';

import {surface_role} from '../../../util/validation';
import {NoContextError} from '../../../error/error';

import './submenu.scss';

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
 * @param {string} context (internal) Informs children of the type of container they are inside of.
 */
function Submenu(props) {
    if(!props.context)
        throw new NoContextError();
    const parent_surface = surface_role(props.context)? "surface" : props.context;

    if(!props.name) // verify a name is provided
        throw new Error();

    const ACCEPTED_ROLES = ['primary', 'secondary', 'tertiary', 'surface'];
    if(props.role && !ACCEPTED_ROLES.includes(props.role)) // verify if the role supplied is valid
        throw new Error();
    const role = props.role? props.role : "surface";
    
    // Defining the animation duration and the transition information
    const ANIMATION_DURATION = 300;
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

    const computedClassName = `arroz-${role}-submenu`;
    return (
        <div className="arroz-submenu">
            <TextButton className="arroz-submenu-button" pill={props.pill} role={role} onClick={toggle_panel} context={parent_surface}>
                {props.name}
                <span className={open? "arroz-submenu-icon open" : "arroz-submenu-icon"}>▼</span>
            </TextButton>
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
                    {React.Children.map(props.children, child => React.cloneElement(child, {'context': parent_surface}))}
                </div>
            </Transition>
        </div>
    );
}

export default Submenu;