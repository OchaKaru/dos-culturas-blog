import * as React from 'react';
import {animated, useSpring} from '@react-spring/web';
import {createUseStyles} from 'react-jss';

// arroz imports
import {InvalidContainerError, InvalidRoleError, NoNameError} from '../../../error';
import TextButton from '../../action/common-button/text-button';
import {ContainerContext, valid_container, valid_role} from '../container-context';

const useStyles = createUseStyles(({theme}) => ({
    "arroz-submenu": {
        backgroundColor: ({context, role, container_type}) => {
            return context.role === role && context.container_type === container_type? "transparent" : theme.scheme[role][container_type]
        },
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    "arroz-submenu-button": {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },
    "arroz-submenu-button-icon": {
        transform: "rotate(0)",
        transition: ({ANIMATION_DURATION}) => `transform ${ANIMATION_DURATION}ms ease-out`
    },
    "arroz-submenu-button-icon.open": {
        transform: `rotate(-180deg)`
    },
    "arroz-submenu-panel": {
        height: 0,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        textWrap: "nowrap",
        marginLeft: theme.typography.calculate(2)
    },
    "panel-enter": {
        height: 0
    },
    "panel-enter-active": {
        height: ({panel_height}) => `${panel_height}px`,
        transition: ({ANIMATION_DURATION}) => `height ${ANIMATION_DURATION}ms ease`
    },
    "panel-enter-done": {
        height: ({panel_height}) => `${panel_height}px`
    },
    "panel-exit": {
        height: ({panel_height}) => `${panel_height}px`
    },
    "panel-exit-active": {
        height: 0,
        transition: ({ANIMATION_DURATION}) => `height ${ANIMATION_DURATION}ms ease`
    }
}))

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
export default function Submenu({className, name, role = "neutral", containerType = "container_lowest", pill, animate = true, children}) {
    if(!name) // verify a name is provided
        throw new NoNameError();

    if(role && !valid_role(role))
        throw new InvalidRoleError();
    if(containerType && !valid_container(role, containerType))
        throw new InvalidContainerError();
    
    const context = React.useContext(ContainerContext);
    
    // Defining the animation duration and the transition information
    const ANIMATION_DURATION = 300;
    const [animation, api] = useSpring(() => ({
        from: {
            height: "0"
        }
    }));

    // Computing the height that the animations should open and close to based on scroll height
    const [open, set_open] = React.useState(false);
    const toggle_panel = () => {
        set_open(!open);
        api.start({
            from: {
                height: "0"
            },
            to: {
                height: !open? `${panel_height}px` : "0"
            }
        });
    }

    let reference = React.useRef(null);
    const [panel_height, set_panel_height] = React.useState();
    React.useEffect(() => {
        if(reference.current)
            set_panel_height(reference.current.scrollHeight);
    }, [open]);

    const classes = useStyles({context, role, "container_type": containerType, ANIMATION_DURATION, panel_height});
    return (
        <ContainerContext.Provider value={{"role": role, "container_type": containerType}}>
            <div className={`${classes['arroz-submenu']} ${className?? ""}`}>
                <TextButton className={`${classes['arroz-submenu-button']}`} pill={pill} role={role} onClick={toggle_panel}>
                    {name}
                    <span className={`${classes['arroz-submenu-button-icon']} ${open? `${classes['arroz-submenu-button-icon.open']}` : ""}`}>▼</span>
                </TextButton>
                <animated.div ref={reference} style={animation} className={`${classes['arroz-submenu-panel']}`}>
                    {children}
                </animated.div>
            </div>
        </ContainerContext.Provider>
    );
}