import * as React from 'react';
import {createUseStyles} from 'react-jss';

// arroz imports
import {ContainerContext, valid_container} from '../../containment/container-context';
import Icon from '../../content/icon';

const useStyles = createUseStyles(({theme}) => ({
    "arroz-icon-button": {
        backgroundColor: ({role, toggle}) => {
            return toggle? theme.scheme[role].accent : "transparent";
        },
        outline: "none",
        border: "none",
        padding: 0,
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        borderRadius: "100%",
        "&::before": {
            content: '""',
            backgroundColor: ({role, context, toggle}) => {
                return theme.scheme[toggle? role : context.role][toggle? "on_accent" : "on_container"];
            },
            position: "absolute",
            inset: 0,
            opacity: "0%",
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
 * 
 * @param {*} ripple 
 */
export default function IconButton({className, role = "primary", scale = 1, ripple, toggle, onClick, children}) {
    const context = React.useContext(ContainerContext);
    const ANIMATION_DURATION = 200;
    
    const classes = useStyles({context, role, toggle, ripple, ANIMATION_DURATION});
    return (
        <ContainerContext.Provider value={{"role": toggle? role : context.role, "container_type": toggle? "button" : context.container_type}}>
            <button className={`${classes['arroz-icon-button']} ${className?? ""}`} onClick={onClick}>
                <Icon className="arroz-button-icon" scale={scale}>
                    {children}
                </Icon>
            </button>
        </ContainerContext.Provider>
    );
}