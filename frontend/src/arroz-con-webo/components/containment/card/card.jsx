import * as React from 'react';
import {createUseStyles} from 'react-jss';

// arroz imports
import {ContainerContext, valid_container} from '../container-context';

const useStyles = createUseStyles(({theme}) => ({
    "arroz-card": {
        position: "relative",
        display: "inline-block",
        padding: 0,
        overflow: "hidden",
        borderRadius: theme.typography.calculate(props.rounded? 1 : 0.2),
        "&::before": {
            content: "",
            backgroundColor: ({role, container_type}) => valid_container(role, container_type)? theme.scheme[role].on_container : "transparent",
            position: "absolute",
            inset: 0,
            opacity: "0%",
            transition: ({ANIMATION_DURATION}) => `opacity ${ANIMATION_DURATION}ms ease`
        },
        "&:hover::before": {
            opacity: ({interactable}) => interactable? "10%" : "0%"
        },
        "&:active::before": {
            opacity: ({interactable, ripple}) =>  !interactable || ripple? "0%" : "20%"
        }
    }
}));

/**
 * This is the Arroz con Webo Card: Used where content needs to be in subcontainers. The cards
 * contain related elements and can be filled, elevated, or outlined. Content can be anything.
 * 
 * @param {boolean} rounded (optional) Specifies if the corners are rounded.
 * @param {boolean} interactable (optional) Specifies if the card should have a hover effect.
 * @param {boolean} ripple (optional) Specifies if the card should have a ripple animation.
 */
function Card({className, rounded, interactable, ripple, children}) {
    const {role, container_type} = React.useContext(ContainerContext);
    const ANIMATION_DURATION = 200;

    const classes = useStyles({role, container_type, rounded, interactable, ripple, ANIMATION_DURATION})
    return (
        <div className={`${classes['arroz-card']} ${className?? ""}`}>
            {children}
        </div>
    );
}

export default Card;

