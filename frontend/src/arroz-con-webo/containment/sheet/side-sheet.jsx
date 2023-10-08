import * as React from 'react';
import {Transition} from 'react-transition-group';

import {surface_role, valid_container_role} from '../../util/validation';
import {InvalidRoleError} from '../../util/error';

import './styles/side-sheet.scss';

/**
 * 
 * @param {boolean} open (required) Specifies whether to open the side-sheet. This allows complete customization over which button opens the sheet.
 * @param {string} role (optional) Can values of "primary", "secondary", "tertiary", "surface-<level>". Defaults to "surface";
 * 
 * @param {boolean} modal
 */
function SideSheet(props) {
    if(props.role && !valid_container_role(props.role))
        throw new InvalidRoleError();
    const role = props.role? props.role : 'surface';

    // Defining the animation duration and the transition information
    const ANIMATION_DURATION = 300;
    const transition = {
        "transition": `width ${ANIMATION_DURATION}ms ease`
    };

    const [open, set_open] = React.useState(props.open);
    React.useEffect(() => {
        if(open && reference.current) {
            reference.current.transition_styles = {
                "enter": {"width": 0},
                "enter_active": {"width": "25%"},
                "enter_done": {"width": "25%"},
                "exit": {"width": "25%"},
                "exit_active": {"width": 0},
            };
        }
        set_open(props.open);
    }, [props.open])

    // Computing the height that the animations should open and close to based on scroll height
    let reference = React.useRef({"transition_styles": {}});
    React.useEffect(() => { // I don't know why this function is necessary for exit to work
        if(reference.current) {
            reference.current.transition_styles = {
                "enter": {"width": 0},
                "enter_active": {"width": "25%"},
                "enter_done": {"width": "25%"},
                "exit": {"width": "25%"},
                "exit_active": {"width": 0},
            };
        }
    }, [reference.current.transition_styles]);
    const [current_style, set_current_style] = React.useState({"width": 0});

    const current_surface = surface_role(role)? "surface" : role + "-container";
    const computedClassName = props.className? props.className + ` arroz-${role}-side-sheet` : `arroz-${role}-side-sheet`;
    return (
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
            <div ref={reference} className={computedClassName} style={{
                ...transition,
                ...current_style
            }}>
                {React.Children.map(props.children, child => React.cloneElement(child, {'context': current_surface}))}
            </div>
        </Transition>
    );
}

export default SideSheet;