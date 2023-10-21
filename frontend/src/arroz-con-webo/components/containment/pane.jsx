import * as React from 'react';
import {createUseStyles} from 'react-jss';

// arroz imports
import {InvalidContainerError, InvalidRoleError} from '../../error';
import {ContainerContext, valid_container, valid_role} from './container-context';

const useStyles = createUseStyles(({theme}) => ({
    "arroz-pane": {
        backgroundColor: ({context, role, container_type}) => {
            return context.role === role && context.container_type === container_type? "transparent" : theme.scheme[role][container_type]
        },
        color: ({role}) => theme.scheme[role].on_container,
        borderRadius: ({rounded}) => theme.typography.calculate(rounded? 1 : 0.2),
        position: "relative",
        padding: 0,
        overflow: "hidden"
    }
}));

/**
 * This is the Arroz con Webo Card: Used where content needs to be in subcontainers. The cards
 * contain related elements and can be filled, elevated, or outlined. Content can be anything.
 * 
 * @param {string} role
 * @param {string} containerType
 * @param {boolean} rounded (optional) Specifies if the corners are rounded.
 * @param {boolean} interactable (optional) Specifies if the card should have a hover effect.
 * @param {boolean} ripple (optional) Specifies if the card should have a ripple animation.
 */
export default function Pane({className, role = "neutral", containerType = "container", rounded, children}) {
    if(role && !valid_role(role))
        throw new InvalidRoleError();
    if(containerType && !valid_container(role, containerType))
        throw new InvalidContainerError();

    const context = React.useContext(ContainerContext);

    const classes = useStyles({role, "container_type": containerType, context, rounded})
    return (
        <ContainerContext.Provider value={{"role": role, "container_type": containerType}}>
            <div className={`${classes['arroz-pane']} ${className?? ""}`}>
                {children}
            </div>
        </ContainerContext.Provider>
    );
}