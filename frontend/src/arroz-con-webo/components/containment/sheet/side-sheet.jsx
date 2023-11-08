import * as React from 'react';
import {createUseStyles} from 'react-jss';

// arroz imports
import {InvalidRoleError, InvalidContainerError} from '../../../error';
import {clamp, useWindowDimensions} from '../../../util';
import Collapse from '../../../styles/animation/collapse';
import Shim from '../../communication/shim';
import {ContainerContext, valid_container, valid_role} from '../container-context';

const useStyles = createUseStyles(({theme}) => ({
    "arroz-side-sheet": {
        backgroundColor: ({context, role, container_type, modal}) => {
            return context.role === role && context.container_type === container_type && !modal? "transparent" : theme.scheme[role][container_type]
        },
        color: ({role}) => theme.scheme[role].on_container,
        height: "100%",
        width: ({side_sheet_width}) => `${side_sheet_width}px`,
        position: ({modal}) => modal? "absolute" : "relative",
        borderRadius: ({modal}) => modal? `0 ${theme.typography.calculate(1)} ${theme.typography.calculate(1)} 0` : 0,
        zIndex: 100,
        transition: ({ANIMATION_DURATION}) => `width ${ANIMATION_DURATION}ms ease`
    },
    "position": {
        position: ({modal}) => modal? "absolute !important" : "relative",
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
    
    const {'width': window_width} = useWindowDimensions();
    const [side_sheet_width, set_side_sheet_width] = React.useState(clamp(-0.0332 * window_width + 88.7448, 25, 75) / 100 * window_width);
    React.useEffect(() => {
        set_side_sheet_width(clamp(-0.0332 * window_width + 88.7448, 25, 75) / 100 * window_width);
    }, [window_width]);

    // Defining the animation duration and the transition information
    const ANIMATION_DURATION = 300;
    const classes = useStyles({context, role, "container_type": containerType, modal, ANIMATION_DURATION, side_sheet_width});
    return (
        <ContainerContext.Provider value={{"role": role, "container_type": containerType}}>
            <Shim show={modal} />
            <Collapse className={classes["position"]} open={open} direction="horizontal">
                <div className={`${classes['arroz-side-sheet']} ${className?? ""}`}>
                    {children}
                </div>
            </Collapse>
        </ContainerContext.Provider>
    );
}

export default SideSheet;