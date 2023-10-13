import * as React from 'react';

// arroz imports
import {Scheme, Typography} from '../../../styles';
import {useCSSClass} from '../../../util';

// local imports
import Button from './button';

/**
 * The Arroz con Webo Elevated Button: Used where elevated buttons should be. Elevated buttons should be used sparingly.
 * 
 * These params are props to the React Component:
 * @param {string} role (optional) Can have values 'primary', 'secondary', 'tertiary', 'error', or 'neutral'. Defaults to 'neutral'.
 * @param {boolean} pill (optional) Specifies if the corners are completely rounded off.
 * @param {boolean} ripple (optional) Specifies whether the ripple animation should play.
 * @param {function} onClick (optional) Specifies the callback function when the button is clicked.
 */
export default function ElevatedButton(props) {
    if(props.role && !valid_role(props.role))
        throw new InvalidRoleError({"code": "Invalid props.role value.", "value": props.role});
    const role = props.role? props.role : "neutral";

    const [class_name, set_style] = useCSSClass();
    React.useEffect(() => {
        set_style(`
            .${class_name} {
                background-color: transparent;
                color: ${role === "neutral"? Scheme["neutral"].on_container : Scheme[props.role].accent};
                box-shadow: 0 ${0.2 * Typography.font_size}${Typography.unit} ${0.2 * Typography.font_size}${Typography.unit} 0 ${Scheme.shadow};
            }
        `);
    }, [class_name, Scheme, Typography.font_size, Typography.unit]);

    return (
        <Button className={`${class_name} ${props.className?? ""}`} pill={props.pill} ripple={props.ripple} onClick={props.onClick}>
            {props.children}
        </Button>
    );
}