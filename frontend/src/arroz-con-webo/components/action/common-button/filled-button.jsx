import * as React from 'react';

// arroz imports
import {Scheme, Typography} from '../../../styles';
import {useCSSClass} from '../../../util';
import {ContainerContext, valid_role} from '../../containment/container-context';

// local imports
import Button from './button';

/**
 * The Arroz con Webo Filled Button: Used where filled buttons should be.
 * 
 * These params are props to the React Component:
 * @param {string} role (optional) Can have values 'primary', 'secondary', 'tertiary', or 'error'. Defaults to 'primary'.
 * @param {boolean} pill (optional) Specifies if the corners are completely rounded off.
 * @param {boolean} ripple (optional) Specifies whether the ripple animation should play.
 * @param {function} onClick (optional) Specifies the callback function when the button is clicked.
 */
export default function FilledButton(props) {
    if(props.role && (!valid_role(props.role) || props.role === "neutral"))
        throw new InvalidRoleError({"code": "Invalid props.role value.", "value": props.role});
    const role = props.role? props.role : "primary";

    const [class_name, set_style] = useCSSClass();
    React.useEffect(() => {
        set_style(`
            .${class_name} {
                background-color: ${Scheme[role].accent};
                color: ${Scheme[role].on_accent};
            }
        `);
    }, [class_name, Scheme]);

    return (
        <ContainerContext.Provider value={{"role": role, "container_type": "button"}}>
            <Button className={`${class_name} ${props.className?? ""}`} pill={props.pill} ripple={props.ripple} onClick={props.onClick}>
                {props.children}
            </Button>
        </ContainerContext.Provider>

    );
}