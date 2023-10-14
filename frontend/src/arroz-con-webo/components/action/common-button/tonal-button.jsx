import * as React from 'react';

// arroz imports
import {InvalidRoleError} from '../../../error';
import {ThemeContext} from '../../../styles';
import {useCSSClass} from '../../../util';
import {ContainerContext, valid_role} from '../../containment/container-context';

// local imports
import Button from './button';

/**
 * The Arroz con Webo Tonal Button: Used where tonal buttons should be.
 * 
 * These params are props to the React Component:
 * @param {string} role (optional) Can have values 'primary', 'secondary', 'tertiary', or 'error'. Defaults to 'primary'.
 * @param {boolean} pill (optional) Specifies if the corners are completely rounded off.
 * @param {boolean} ripple (optional) Specifies whether the ripple animation should play.
 * @param {function} onClick (optional) Specifies the callback function when the button is clicked.
 */
export default function TonalButton(props) {
    if(props.role && (!valid_role(props.role) || props.role === "neutral"))
        throw new InvalidRoleError({"code": "Invalid props.role value.", "value": props.role});
    const role = props.role? props.role : "primary";

    const {Scheme} = React.useContext(ThemeContext);

    const [class_name, set_style] = useCSSClass();
    React.useEffect(() => {
        set_style(`
            .${class_name} {
                background-color: ${Scheme[role].container};
                color: ${Scheme[role].on_container};
            }
        `);
    }, [class_name, Scheme, role, set_style]);

    return (
        <ContainerContext.Provider value={{"role": role, "container_type": "container"}}>
            <Button className={`${class_name} ${props.className?? ""}`} pill={props.pill} ripple={props.ripple} onClick={props.onClick}>
                {props.children}
            </Button>
        </ContainerContext.Provider>

    );
}