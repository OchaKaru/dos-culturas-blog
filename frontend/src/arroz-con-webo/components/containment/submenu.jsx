import * as React from 'react';
import {CSSTransition} from 'react-transition-group';

// arroz imports
import {InvalidContainerError, InvalidRoleError, NoNameError} from '../../error';
import {ThemeContext} from '../../styles';
import {useCSSClass} from '../../util';
import TextButton from '../action/common-button/text-button';
import {ContainerContext, valid_container, valid_role} from './container-context';

/**
 * The Arroz con Webo Submenu Button: It is used as a pseudo dropdown menu that takes up physical space.
 * Submenu options are made from the children to the button, so submenu buttons can contain submenu buttons.
 * 
 * @param {string} name Specifies the text to be displayed on the submenu button.
 * @param {string} role (optional) Can have values 'primary', 'secondary', 'tertiary', or 'surface'. Defaults to 'surface'.
 * @param {string} containerType (optional) 
 * @param {boolean} pill (optional) Specifies whether the submenu button should be pill shaped.
 * @param {boolean} animate (optional) Specifies if the submenu opening should be animated. Defaults to true.
 */
export default function Submenu({className, children, name, role = "neutral", containerType = "container_lowest", pill, animate = true}) {
    if(!name) // verify a name is provided
        throw new NoNameError();

    if(role && !valid_role(role))
        throw new InvalidRoleError();
    if(containerType && !valid_container(role, containerType))
        throw new InvalidContainerError();
    const context = React.useContext(ContainerContext);
    const {Scheme} = React.useContext(ThemeContext);
    
    // Defining the animation duration and the transition information
    const ANIMATION_DURATION = 300;

    // Computing the height that the animations should open and close to based on scroll height
    const [open, set_open] = React.useState(false);
    const toggle_panel = () => {
        set_open(!open);
    }

    let reference = React.useRef(null);
    const [panel_height, set_panel_height] = React.useState();
    React.useEffect(() => {
        
        if(reference.current) {
            console.log(reference.current.scrollHeight);
            set_panel_height(reference.current.scrollHeight);
        }
            
    }, [open]);

    const [class_name, set_style] = useCSSClass();
    React.useEffect(() => {
        set_style(`
            .${class_name} {
                background-color: ${(context.role === role && context.container_type === containerType)? "transparent" : Scheme[role][containerType]};
                display: flex;
                flex-direction: column;
                justify-content: center;
            }

            .${class_name}-button {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .${class_name}-icon {
                transform: rotate(0);
                transition: transform 200ms ease-out;
            }
            .${class_name}-icon.open {
                transform: rotate(-180deg);
            }
        
            .${class_name}-panel {
                height: 0;
                display: flex;
                flex-direction: column;
                overflow: hidden;
                text-wrap: nowrap;
            
                margin-left: 2vw;
            }

            .${class_name}-open {
                height: 0;
            }
            .${class_name}-open-active, .${class_name}-open-done {
                height: ${panel_height}px;
                transition: height ${ANIMATION_DURATION}ms ease;
            }
            .${class_name}-close {
                height: ${panel_height}px;
            }
            .${class_name}-close-active {
                height: 0;
                transition: height ${ANIMATION_DURATION}ms ease;
            }
        `);
    }, [panel_height, ANIMATION_DURATION, context, Scheme, class_name, containerType, role, set_style]);

    return (
        <ContainerContext.Provider value={{"role": role, "container_type": containerType}}>
            <div className={`${class_name} ${className?? ""}`}>
                <TextButton className={`${class_name}-button`} pill={pill} role={role} onClick={toggle_panel}>
                    {name}
                    <span className={`${class_name}-icon ${open? "open" : ""}`}>▼</span>
                </TextButton>
                <CSSTransition
                    in={open}
                    nodeRef={reference}
                    addEndListener={(done) => {
                        reference.current.addEventListener("transitionend", done, false);
                    }}
                    classNames={animate? {
                        "enter": `${class_name}-open`,
                        "enterActive": `${class_name}-open-active`,
                        "enterDone": `${class_name}-open-done`,
                        "exit": `${class_name}-close`,
                        "exitActive": `${class_name}-close-active`
                    } : "undefined"}
                >
                    <div ref={reference} className={`${class_name}-panel`}>
                        {children}
                    </div>
                </CSSTransition>
            </div>
        </ContainerContext.Provider>
    );
}