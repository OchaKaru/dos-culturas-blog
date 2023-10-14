import * as React from 'react';
import {CSSTransition} from 'react-transition-group';

// arroz imports
import {InvalidRoleError, InvalidContainerError} from '../../../error';
import {ThemeContext, Typography} from '../../../styles';
import {clamp, useWindowDimensions, useCSSClass} from '../../../util';
import {ContainerContext, valid_container, valid_role} from '../container-context';

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
function SideSheet({className, children, open, role = "neutral", containerType = "container_lowest", animate = true, modal}) {
    if(role && !valid_role(role))
        throw new InvalidRoleError();
    if(containerType && !valid_container(role, containerType))
        throw new InvalidContainerError();

    const context = React.useContext(ContainerContext);
    const {Scheme} = React.useContext(ThemeContext);

    // Defining the animation duration and the transition information
    const ANIMATION_DURATION = 300;

    const {'width': window_width} = useWindowDimensions(); 
    const [class_name, set_style] = useCSSClass();
    React.useEffect(() => {
        const side_sheet_width = clamp(-0.0332 * window_width + 88.7448, 25, 75) / 100 * window_width;

        set_style(`
            .${class_name} {
                /* color */
                background-color: ${(context.role === role && context.container_type === containerType)? "transparent" : Scheme[role][containerType]};
                color: ${(context.role === role && context.container_type === containerType)? Scheme[context.role].on_container : Scheme[role][containerType]}

                /* structure */
                height: 100%;
                width: 0;
                align-self: flex-start;
                overflow-x: hidden;
                overflow-y: auto;

                position: ${modal? "absolute" : "relative"};
                ${modal?
                    `border-radius: 0 ${Typography.font_size}${Typography.unit} ${Typography.font_size}${Typography.unit} 0;` :
                    `border-right: ${0.1 * Typography.font_size}${Typography.unit};`
                }
                z-index: 100;
            }

            .${class_name}-shim {
                /* color */
                background-color: ${Scheme.neutral.on_container};
                opacity: 50%;

                /* structure */
                height: 100%;
                width: 100%;
                position: absolute;
                z-index: 100;

                display: ${modal? "block" : "none"}
            }

            // side sheet animation
            .side-sheet-open {
                width: 0;
            }
            .side-sheet-open-active, .side-sheet-open-done {
                width: ${side_sheet_width}px;
                transition: width ${ANIMATION_DURATION}ms ease;
            }

            .side-sheet-close {
                width: ${side_sheet_width}px;
            }
            .side-sheet-close-active {
                width: 0;
                transition: width ${ANIMATION_DURATION}ms ease;
            }
        `)
    }, [window_width, Scheme, class_name, containerType, role, set_style, context.container_type, context.role, modal]);

    let reference = React.useRef(null);

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
                    "enter": "side-sheet-open",
                    "enterActive": "side-sheet-open-active",
                    "enterDone": "side-sheet-open-done",
                    "exit": "side-sheet-close",
                    "exitActive": "side-sheet-close-active"
                } : "undefined"}
            >
                <div ref={reference} className={`${class_name} ${className?? ""}`}>
                    {children}
                </div>
            </CSSTransition>
        </ContainerContext.Provider>
    );
}

export default SideSheet;