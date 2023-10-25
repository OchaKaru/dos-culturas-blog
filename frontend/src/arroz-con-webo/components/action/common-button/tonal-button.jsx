import * as React from 'react';
import {createUseStyles} from 'react-jss';

// arroz imports
import {InvalidRoleError} from '../../../error';
import {ContainerContext, valid_role} from '../../containment/container-context';

// local imports
import Button from './button';

const useStyles = createUseStyles(({theme}) => ({
    "arroz-tonal-button": {
        backgroundColor: ({role}) => theme.scheme[role].container,
        color: ({role}) => theme.scheme[role].on_container
    }
}));

/**
 * The Arroz con Webo Tonal Button: Used where tonal buttons should be.
 * 
 * These params are props to the React Component:
 * @param {string} role (optional) Can have values 'primary', 'secondary', 'tertiary', or 'error'. Defaults to 'primary'.
 * @param {boolean} pill (optional) Specifies if the corners are completely rounded off.
 * @param {boolean} ripple (optional) Specifies whether the ripple animation should play.
 * @param {function} onClick (optional) Specifies the callback function when the button is clicked.
 */
export default function TonalButton({className, role = "primary", pill, ripple, children, ...props}) {
    if(role && (!valid_role(role) || role === "neutral"))
        throw new InvalidRoleError({"code": "Invalid props.role value.", "value": role});

    const classes = useStyles({role})
    return (
        <ContainerContext.Provider value={{"role": role, "container_type": "container"}}>
            <Button className={`${classes['arroz-tonal-button']} ${className?? ""}`} pill={pill} ripple={ripple} {...props}>
                {children}
            </Button>
        </ContainerContext.Provider>

    );
}