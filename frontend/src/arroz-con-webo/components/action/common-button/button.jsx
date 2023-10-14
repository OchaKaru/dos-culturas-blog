import * as React from 'react';

// arroz imports
import {ThemeContext, Typography} from '../../../styles';
import {useCSSClass} from '../../../util';
import {ContainerContext, valid_container} from '../../containment/container-context';

/**
 * The Arroz con Webo Button: Used where buttons should be. It can be elevated, filled, tonal,
 * outlined, or just text. According to Google's Material Design Guidelines, the order of precedence for
 * the buttons:
 * 1. Filled
 * 2. Tonal or Elevated
 * 3. Outlined
 * 4. Text
 * 
 * Elevated buttons should be used sparingly.
 * 
 * These params are props to the React Component:
 * @param {function} onClick (optional) Specifies the callback function when the button is clicked.
 * @param {boolean} pill (optional) Specifies if the corners are completely rounded off.
 * @param {boolean} ripple (optional) Specifies whether the ripple animation should play.
 */
export default function Button(props) {
    const {role, container_type} = React.useContext(ContainerContext);

    const {Scheme} = React.useContext(ThemeContext);

    const [class_name, set_style] = useCSSClass();
    React.useEffect(() => {
        const interaction_color = valid_container(container_type)? Scheme[role].on_container : Scheme[role].on_accent;

        set_style(`
            .${class_name} {
                /* unstyle the button */
                outline: none;
                border: none;

                /* position */
                position: relative;

                /* text */
                font-family: ${Typography.label_font()};
                font-size: ${Typography.label_size}${Typography.unit};
                text-wrap: nowrap;
                text-align: center;

                /* structure */
                padding: ${Typography.label_size / 2}${Typography.unit} ${Typography.label_size}${Typography.unit};
                overflow: hidden;
                cursor: pointer;
                border-radius: ${props.pill? Typography.label_size : 0.2 * Typography.label_size}${Typography.unit};
            }

            .${class_name}::before {
                content: "";
                background-color: ${interaction_color};
                position: absolute;
                inset: 0;
                opacity: 0%;
                transition: opacity 200ms;
            }

            .${class_name}:hover::before {opacity: 10%;}
            ${props.ripple? "" : `.${class_name}:active::before {opacity: 20%;}`}

        `);
    }, [class_name, role, container_type, Scheme, props.pill, props.ripple, set_style]);

    return (
        <button className={`${class_name} ${props.className?? ""}`} onClick={props.onClick}>
            {props.children}
        </button>
    );
}
