import * as React from 'react';
import {CSSTransition} from 'react-transition-group';

// arroz imports
import {InvalidRoleError, InvalidContainerError} from '../../../error';
import {Manager, Scheme, Typography} from '../../../styles';
import {useWindowDimensions, clamp} from '../../../util';
import {ContainerContext, valid_container, valid_role} from '../container-context';

/**
 * This is the Arroz con Webo Side Sheet: Usually used to contain content that will be hidden on the side of the screen. The content can be anything,
 * even other containers.
 * 
 * @param {boolean} open (required) Specifies whether to open the side-sheet. This allows complete customization over which button opens the sheet.
 * @param {string} role (optional) Can values of "primary", "secondary", "tertiary", "error", and "neutral". Defaults to "neutral";
 * @param {string} containerType (optional) Can use values of "container_[level]". Defaults to "container_lowest".
 * @param {boolean} modal
 */
function SideSheet(props) {
    if(props.role && !valid_role(props.role))
        throw new InvalidRoleError();
    const role = props.role?? 'neutral';
    if(props.containerType && !valid_container(role, props.containerType))
        throw new InvalidContainerError();
    const container_type = props.containerType?? 'container_lowest';

    const context = React.useContext(ContainerContext);

    // Defining the animation duration and the transition information
    const ANIMATION_DURATION = 300;

    const {'width': window_width} = useWindowDimensions();
    const [side_sheet_width, set_sheet_width] = React.useState();  
    React.useEffect(() => {
        const sheet_size = width => clamp(-0.0332 * width + 88.7448, 25, 75);
        set_sheet_width(sheet_size(window_width) / 100 * window_width);

        Manager.style_sheet("side_sheet", `
            .arroz-side-sheet {
                // color
                background-color: ${(context.role === role && context.container_type === container_type)? "transparent" : Scheme[role][container_type]};
                color: ${Scheme[role].on_container}

                // structure
                height: 100%;
                align-self: flex-start;
                overflow-x: hidden;

                position: ${props.modal? "absolute" : "relative"};
                ${props.modal?
                    `border-radius: 0 ${Typography.font_size}${Typography.unit} ${Typography.font_size}${Typography.unit} 0;` :
                    `border-right: ${0.1 * Typography.font_size}${Typography.unit};`
                }
                z-index: 100;
            }

            .arroz-modal-shim {
                // color
                background-color: ${Scheme.neutral.on_container};
                opacity: 50%;

                // structure
                height: 100%;
                width: 100%;
                position: absolute;
                z-index: 100;

                display: ${props.modal? "block" : "none"}
            }

            // side sheet animation
            .arroz-side-sheet-enter {
                width: 0;
            }
            .arroz-side-sheet-enter-active {
                width: ${side_sheet_width}px;
                transition: width ${ANIMATION_DURATION}ms ease;
            }

            .arroz-side-sheet-exit {
                width: ${side_sheet_width}px;
            }
            .arroz-side-sheet-exit-active {
                width: 0;
                transition: width ${ANIMATION_DURATION}ms ease;
            }
        `)
    }, [window_width, Scheme])

    return (
        <ContainerContext.Provider value={{"role": role, "container_type": container_type}}>
            <div className="arroz-modal-shim" />
            <CSSTransition
                nodeRef={reference}
                in={props.open}
            >
                <div ref={reference} className={"arroz-side-sheet " + props.className?? ""}>
                    {props.children}
                </div>
            </CSSTransition>
        </ContainerContext.Provider>
    );
}

export default SideSheet;