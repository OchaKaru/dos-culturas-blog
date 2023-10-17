import * as React from 'react';
import {CSSTransition} from 'react-transition-group';
import {createUseStyles} from 'react-jss';

// arroz imports
import {InvalidRoleError, InvalidContainerError} from '../../../error';
import {ThemeContext, Typography} from '../../../styles';
import {clamp, useWindowDimensions} from '../../../util';
import {ContainerContext, valid_container, valid_role} from '../container-context';

const useStyles = createUseStyles(({theme}) => ({
    "arroz-side-sheet": {
        backgroundColor: ({context, role, container_type}) => {
            return context.role === role && context.container_type === container_type? "transparent" : theme.scheme[role][container_type]
        },
        color: ({role}) => theme.scheme[role].on_container,
        height: "100%",
        width: 0,
        alignSelf: flex-start,
        overflowX: "hidden",
        overflowY: "auto",
        position: ({modal}) => modal? "absolute" : "relative",
        borderRadius: ({modal}) => modal? `0 ${theme.typography.calculate(1)} ${theme.typography.calculate(1)} 0` : 0,
        borderRight: ({modal}) => modal? "none" : `${theme.typography.calculate(0.1)}`,
        zIndex: 100
    },
    "arroz-shim": {
        backgroundColor: theme.scheme.neutral.shadow,
        opacity: "50%",
        height: "100%",
        width: "100%",
        position: "absolute",
        zIndex: 100,
        display: ({modal}) => modal? "block" : "none"
    },
    "side-sheet-enter": {
        width: 0
    },
    "side-sheet-enter-active": {
        width: ({side_sheet_width}) => `${side_sheet_width}px`,
        transition: ({ANIMATION_DURATION}) => `width ${ANIMATION_DURATION}ms ease`
    },
    "side-sheet-exit": {
        width: ({side_sheet_width}) => `${side_sheet_width}px`
    },
    "side-sheet-exit-active": {
        width: 0,
        transition: ({ANIMATION_DURATION}) => `width ${ANIMATION_DURATION}ms ease`
    }
}))

/**
 * This is the Arroz con Webo Side Sheet: Usually used to contain content that will be hidden on the side of the screen. The content can be anything,
 * even other containers.
 * 
 * @param {boolean} open (required) Specifies whether to open the side-sheet. This allows complete customization over which button opens the sheet.
 * @param {string} role (optional) Can values of "primary", "secondary", "tertiary", "error", and "neutral". Defaults to "neutral".
 * @param {string} containerType (optional) Can use values of "container_[level]". Defaults to "container_lowest".
 * @param {boolean} animate (optional) Specifies whether the side sheet should animate open and close. Defaults to true.
 * @param {boolean} modal (optional) Specifies whether the side sheet should be modal.
 */
function SideSheet({className, open, role = "neutral", containerType = "container_lowest", animate = true, modal, children}) {
    if(role && !valid_role(role))
        throw new InvalidRoleError();
    if(containerType && !valid_container(role, containerType))
        throw new InvalidContainerError();

    const context = React.useContext(ContainerContext);

    // Defining the animation duration and the transition information
    const ANIMATION_DURATION = 300;

    const {'width': window_width} = useWindowDimensions();
    const [side_sheet_width, set_side_sheet_width] = React.useState();
    React.useEffect(() => {
        set_side_sheet_width(clamp(-0.0332 * window_width + 88.7448, 25, 75) / 100 * window_width);
    }, [window_width]);

    let reference = React.useRef(null);
    const classes = useStyles({context, role, "container_type": containerType, modal, ANIMATION_DURATION, side_sheet_width})
    return (
        <ContainerContext.Provider value={{"role": role, "container_type": containerType}}>
            <div className={`${class_name}-shim`} />
            <CSSTransition
                in={open}
                nodeRef={reference}
                addEndListener={(done) => {
                    reference.current.addEventListener("transitionend", done, false);
                }}
                classNames={animate? {
                    "enter": classes['side-sheet-enter'],
                    "enterActive": classes['side-sheet-enter-active'],
                    "exit": classes['side-sheet-exit'],
                    "exitActive": classes['side-sheet-exit-active']
                } : "undefined"}
            >
                <div ref={reference} className={`${classes['arroz-side-sheet']} ${className?? ""}`}>
                    {children}
                </div>
            </CSSTransition>
        </ContainerContext.Provider>
    );
}

export default SideSheet;