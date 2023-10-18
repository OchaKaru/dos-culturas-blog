import * as React from 'react';
import {createUseStyles} from 'react-jss';

// arroz imports
import {InvalidRoleError, InvalidContainerError} from '../../../error';
import {ContainerContext, valid_container, valid_role} from '../container-context';

// local imports
import Card from './card';

const useStyles = createUseStyles(({theme}) => ({
    "arroz-filled-card": {
        backgroundColor: ({context, role, container_type}) => {
            return context.role === role && context.container_type === container_type? "transparent" : theme.scheme[role][container_type]
        },
        color: ({role}) => theme.scheme[role].on_container,
    }
}));

/**
 * This is the Arroz con Webo Filled Card: Used where content needs to be in subcontainers. The cards
 * contain related elements. Content can be anything.
 * 
 * @param {string} role (optional) Can values of "primary", "secondary", "tertiary", "error", and "neutral". Defaults to "neutral".
 * @param {string} containerType (optional) Can use values of "container_[level]". Defaults to "container_lowest".
 * @param {boolean} rounded (optional) Specifies whether the card corners are rounded.
 * @param {boolean} interactable (optional) Specifies if the card should have a hover effect.
 * @param {boolean} ripple (optional) Specifies if the card should have a ripple animation.
 */
export default function FilledCard({className, role = "neutral", containerType = "container", rounded, interactable, ripple, children}) {
    if(role && !valid_role(role))
        throw new InvalidRoleError();
    if(containerType && !valid_container(role, containerType))
        throw new InvalidContainerError();

    const context = React.useContext(ContainerContext);
    const classes = useStyles({context, role, "container_type": containerType})
    return (
        <ContainerContext.Provider value={{"role": role, "container_type": containerType}}>
            <Card className={`${classes['arroz-filled-card']} ${className?? ""}`} rounded={rounded} interactable={interactable} ripple={ripple}>
                {children}
            </Card>
        </ContainerContext.Provider>

    );
}