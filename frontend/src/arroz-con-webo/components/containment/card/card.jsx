import * as React from 'react';

// arroz imports
import {ThemeContext, Typography} from '../../../styles';
import {useCSSClass} from '../../../util';
import {ContainerContext, valid_container} from '../container-context';

/**
 * This is the Arroz con Webo Card: Used where content needs to be in subcontainers. The cards
 * contain related elements and can be filled, elevated, or outlined. Content can be anything.
 * 
 * @param {boolean} rounded (optional) Specifies if the corners are rounded.
 * @param {boolean} interactable (optional) Specifies if the card should have a hover effect.
 * @param {boolean} ripple (optional) Specifies if the card should have a ripple animation.
 */
function Card(props) {
    const {role, container_type} = React.useContext(ContainerContext);

    const {Scheme} = React.useContext(ThemeContext);

    const [class_name, set_style] = useCSSClass();
    React.useEffect(() => {
        const interaction_color = valid_container(role, container_type)? Scheme[role].on_container : "transparent";

        set_style(`
            .${class_name} {
                /* position */
                position: relative;
            
                /* structure */
                display: inline-block;
                padding: 0;
                overflow: hidden;
                border-radius: ${props.rounded? Typography.font_size : 0.2 * Typography.font_size}${Typography.unit};
            }

            .${class_name}::before {
                content: "";
                background-color: ${interaction_color};
                position: absolute;
                inset: 0;
                opacity: 0%;
                transition: opacity 200ms;
            }

            ${props.interactable?
                `.${class_name}:hover::before {opacity: 10%;} ${props.ripple? 
                    "" : 
                    `.${class_name}:active::before {opacity: 20%;}`
                }` : 
                ""
            }
        `);
    }, [class_name, role, container_type, Scheme, set_style, props.ripple, props.rounded, props.interactable]);

    return (
        <div className={`${class_name} ${props.className?? ""}`}>
            {props.children}
        </div>
    );
}

export default Card;

