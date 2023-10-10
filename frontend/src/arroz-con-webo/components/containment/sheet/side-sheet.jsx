import * as React from 'react';
import {Transition} from 'react-transition-group';

import {surface_role, valid_container_role} from '../../util/validation';
import {InvalidRoleError} from '../../util/error';
import {useWindowDimensions} from '../../util/listener';

import './styles/side-sheet.scss';

/**
 * This is the Arroz con Webo Side Sheet: Usually used to contain content that will be hidden on the side of the screen. The content can be anything,
 * even other containers.
 * 
 * @param {boolean} open (required) Specifies whether to open the side-sheet. This allows complete customization over which button opens the sheet.
 * @param {string} role (optional) Can values of "primary", "secondary", "tertiary", "surface-<level>". Defaults to "surface-lowest";
 * @param {boolean} modal
 */
function SideSheet(props) {
    if(props.role && !valid_container_role(props.role))
        throw new InvalidRoleError();
    const role = props.role? props.role : 'surface-lowest';

    const {'width': window_width} = useWindowDimensions();
    const [side_sheet_width, set_sheet_width] = React.useState();  
    React.useEffect(() => {
        const clamp = (number, minimum, maximum) => number > maximum? maximum : number < minimum? minimum : number;
        const percentage = width => clamp(-0.0332 * width + 88.7448, 25, 75);
        set_sheet_width(percentage(window_width) / 100 * window_width);
    }, [window_width])

    // Defining the animation duration and the transition information
    const ANIMATION_DURATION = 300;
    const transition = {
        "transition": `width ${ANIMATION_DURATION}ms ease`
    };

    const [open, set_open] = React.useState(props.open);
    React.useEffect(() => {
        if(props.open && reference.current) {
            reference.current.transition_styles = {
                "enter": {"width": 0},
                "enter_active": {"width": `${side_sheet_width}px`},
                "exit": {"width": `${side_sheet_width}px`},
                "exit_active": {"width": 0},
            };
        }
        set_open(props.open);
    }, [props.open, side_sheet_width])

    // Computing the height that the animations should open and close to based on scroll height
    let reference = React.useRef({"transition_styles": {}});
    React.useEffect(() => { // I don't know why this function is necessary for exit to work
        if(reference.current) {
            reference.current.transition_styles = {
                "enter": {"width": 0},
                "enter_active": {"width": `${side_sheet_width}px`},
                "exit": {"width": `${side_sheet_width}px`},
                "exit_active": {"width": 0},
            };
        }
    }, [reference.current.transition_styles, side_sheet_width]);
    const [current_style, set_current_style] = React.useState({"width": 0});

    const current_surface = surface_role(role)? "surface" : role + "-container";
    const modal = props.modal? " modal " : "";
    const computedClassName = (props.className? props.className + ` arroz-${role}-side-sheet` : `arroz-${role}-side-sheet`) + modal;
    return (
        <>
            {props.modal? <div className="arroz-modal-shim" style={{"display": open? "block" : "none"}} /> : undefined}
            <Transition
                nodeRef={reference}

                onEnter={() => set_current_style(reference.current.transition_styles.enter)}
                onEntering={() => set_current_style(reference.current.transition_styles.enter_active)}

                onExit={() => set_current_style(reference.current.transition_styles.exit)}
                onExiting={() => set_current_style(reference.current.transition_styles.exit_active)}

                timeout={ANIMATION_DURATION}
                in={open}
            >
                <div ref={reference} className={"arroz-side-sheet " + computedClassName} style={{
                    ...transition,
                    ...current_style
                }}>
                    {React.Children.map(props.children, child => React.cloneElement(child, {'context': current_surface}))}
                </div>
            </Transition>
        </>
    );
}

export default SideSheet;