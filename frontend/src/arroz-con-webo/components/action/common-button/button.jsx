import * as React from 'react';
import {createUseStyles} from 'react-jss';

// arroz imports
import {ContainerContext, valid_container} from '../../containment/container-context';

const useStyles = createUseStyles(({theme}) => ({
    "arroz-button": {
        outline: "none",
        border: "none",
        position: "relative",
        font: theme.typography.label(),
        textWrap: "nowrap",
        textAlign: "center",
        padding: `${theme.typography.calculate(0.5)} ${theme.typography.calculate(1)}`,
        overflow: "hidden",
        cursor: "pointer",
        borderRadius: ({pill}) => theme.typography.calculate(pill? 1 : 0.2),
        "&::before": {
            content: '""',
            backgroundColor: ({role, container_type}) => {
                return valid_container(role, container_type)? theme.scheme[role].on_container : theme.scheme[role].on_accent
            },
            position: "absolute",
            inset: 0,
            opacity: 0,
            transition: ({ANIMATION_DURATION}) => `opacity ${ANIMATION_DURATION}ms ease`
        },
        "&:hover::before": {
            opacity: "20%"
        },
        "&:active::before": {
            opacity: ({ripple}) => ripple? "0%" : "20%"
        }
    }
}));

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
 * @param {boolean} pill (optional) Specifies if the corners are completely rounded off.
 * @param {boolean} ripple (optional) Specifies whether the ripple animation should play.
 * @param {function} onClick (optional) Specifies the callback function when the button is clicked.
 */
export default function Button({className, pill, ripple, children, ...props}) {
    const {role, container_type} = React.useContext(ContainerContext);
    const ANIMATION_DURATION = 200;

    const classes = useStyles({role, container_type, pill, ripple, ANIMATION_DURATION});
    return (
        <button className={`${classes['arroz-button']} ${className?? ""}`} {...props}>
            {children}
        </button>
    );
}
