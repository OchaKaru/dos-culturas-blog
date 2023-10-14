import * as React from 'react';

// arroz imports
import {InvalidRoleError, InvalidContainerError} from '../../../error';
import {ThemeContext} from '../../../styles';
import {useCSSClass} from '../../../util';
import {ContainerContext, valid_container, valid_role} from '../container-context';

// local imports
import Card from './card';

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
export default function FilledCard(props) {
    if(props.role && !valid_role(props.role))
        throw new InvalidRoleError();
    const role = props.role?? 'neutral';
    if(props.containerType && !valid_container(role, props.containerType))
        throw new InvalidContainerError();
    const container_type = props.containerType?? 'container_lowest';

    const {Scheme} = React.useContext(ThemeContext);

    const context = React.useContext(ContainerContext);
    const [class_name, set_style] = useCSSClass();
    React.useEffect(() => {
        set_style(`
            .${class_name} {
                background-color: ${(context.role === role && context.container_type === container_type)? "transparent" : Scheme[role][container_type]};
                color: ${Scheme[context.role].on_container}
            }
        `);
    }, [class_name, Scheme, container_type, context.container_type, context.role, role, set_style]);

    return (
        <ContainerContext.Provider value={{"role": role, "container_type": container_type}}>
            <Card className={`${class_name} ${props.className?? ""}`} rounded={props.rounded} interactable={props.interactable} ripple={props.ripple}>
                {props.children}
            </Card>
        </ContainerContext.Provider>

    );
}