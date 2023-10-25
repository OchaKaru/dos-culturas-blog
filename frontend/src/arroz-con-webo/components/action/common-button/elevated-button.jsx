import * as React from 'react';
import {createUseStyles} from 'react-jss';

// arroz imports
import {InvalidRoleError} from '../../../error';
import {valid_role} from '../../containment/container-context';

// local imports
import Button from './button';

const useStyles = createUseStyles(({theme}) => ({
    "arroz-elevated-button": {
        backgroundColor: "transparent",
        color: ({role}) => role === "neutral"? theme.scheme[role].on_container : theme.scheme[role].accent,
        boxShadow: `0 ${theme.typography.calculate(0.2)} ${theme.typography.calculate(0.2)} 0 ${theme.scheme.neutral.shadow}`
    }
}))

/**
 * The Arroz con Webo Elevated Button: Used where elevated buttons should be. Elevated buttons should be used sparingly.
 * 
 * These params are props to the React Component:
 * @param {string} role (optional) Can have values 'primary', 'secondary', 'tertiary', 'error', or 'neutral'. Defaults to 'neutral'.
 * @param {boolean} pill (optional) Specifies if the corners are completely rounded off.
 * @param {boolean} ripple (optional) Specifies whether the ripple animation should play.
 * @param {function} onClick (optional) Specifies the callback function when the button is clicked.
 */
export default function ElevatedButton({className, role = "neutral", pill, ripple, children, ...props}) {
    if(role && !valid_role(role))
        throw new InvalidRoleError({"code": "Invalid props.role value.", "value": role});

    const classes = useStyles({role});
    return (
        <Button className={`${classes['arroz-elevated-button']} ${className?? ""}`} pill={pill} ripple={ripple} {...props}>
            {children}
        </Button>
    );
}