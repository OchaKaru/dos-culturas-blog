import * as React from 'react';

// arroz imports
import {InvalidRoleError} from '../../../error';
import {ThemeContext, Typography} from '../../../styles';
import {useCSSClass} from '../../../util';
import {valid_role} from '../../containment/container-context';

// local imports
import Button from './button';

/**
 * The Arroz con Webo Outlined Button: Used where outlined buttons should be.
 * 
 * These params are props to the React Component:
 * @param {string} role (optional) Can have values 'primary', 'secondary', 'tertiary', 'error', or 'neutral'. Defaults to 'neutral'.
 * @param {boolean} pill (optional) Specifies if the corners are completely rounded off.
 * @param {boolean} ripple (optional) Specifies whether the ripple animation should play.
 * @param {function} onClick (optional) Specifies the callback function when the button is clicked.
 */
export default function OutlinedButton(props) {
    if(props.role && !valid_role(props.role))
        throw new InvalidRoleError({"code": "Invalid props.role value.", "value": props.role});
    const role = props.role? props.role : "neutral";

    const {Scheme} = React.useContext(ThemeContext);

    const [class_name, set_style] = useCSSClass();
    React.useEffect(() => {
        set_style(`
            .${class_name} {
                background-color: transparent;
                color: ${role === "neutral"? Scheme["neutral"].on_container : Scheme[role].accent};
                box-shadow: inset 0 0 0 ${0.1 * Typography.font_size}${Typography.unit} ${role === "neutral"? Scheme["neutral"].on_container : Scheme[role].accent};
            }
        `);
    }, [class_name, Scheme, role, set_style]);

    return (
        <Button className={`${class_name} ${props.className?? ""}`} pill={props.pill} ripple={props.ripple} onClick={props.onClick}>
            {props.children}
        </Button>
    );
}