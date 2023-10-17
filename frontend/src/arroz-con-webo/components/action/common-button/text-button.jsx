import * as React from 'react';
import {createUseStyles} from 'react-jss';

// arroz imports
import {InvalidRoleError} from '../../../error';
import {valid_role} from '../../containment/container-context';

// local imports
import Button from './button';

const useStyles = createUseStyles(({theme}) => ({
    "arroz-text-button": {
        backgroundColor: "transparent",
        color: ({role}) => role === "neutral"? theme.scheme.neutral.on_container : theme.scheme[role].accent
    }
}));

/**
 * The Arroz con Webo Text Button: Used where text buttons should be.
 * 
 * These params are props to the React Component:
 * @param {string} role (optional) Can have values 'primary', 'secondary', 'tertiary', 'error', or 'neutral'. Defaults to 'neutral'.
 * @param {boolean} pill (optional) Specifies if the corners are completely rounded off.
 * @param {boolean} ripple (optional) Specifies whether the ripple animation should play.
 * @param {function} onClick (optional) Specifies the callback function when the button is clicked.
 */
export default function TextButton({className, role = "neutral", pill, ripple, onClick, children}) {
    if(role && !valid_role(role))
        throw new InvalidRoleError({"code": "Invalid props.role value.", "value": role});

    const classes = useStyles({role});
    return (
        <Button className={`${classes['arroz-text-button']} ${className?? ""}`} pill={pill} ripple={ripple} onClick={onClick}>
            {children}
        </Button>
    );
}