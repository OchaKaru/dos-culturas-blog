import * as React from 'react';

// arroz imports
import {InvalidRoleError} from '../../../error';
import {Scheme, Typography} from '../../../styles';
import {useCSSClass} from '../../../util';
import {ContainerContext, valid_role} from '../container-context';

// local imports
import Card from './card';

/**
 * This is the Arroz con Webo Elevated Card: Used where content needs to be in subcontainers. The cards
 * contain related elements. Content can be anything.
 * 
 * @param {string} role (optional) Can values of "primary", "secondary", "tertiary", "error", and "neutral". Defaults to "neutral".
 * @param {string} containerType (optional) Can use values of "container_[level]". Defaults to "container_lowest".
 * @param {boolean} rounded (optional) Specifies whether the card corners are rounded.
 * @param {boolean} interactable (optional) Specifies if the card should have a hover effect.
 * @param {boolean} ripple (optional) Specifies if the card should have a ripple animation.
 */
function ElevatedCard(props) {
    if(props.role && !valid_role(props.role))
        throw new InvalidRoleError();
    const role = props.role?? 'neutral';
    if(props.containerType && !valid_container(role, props.containerType))
        throw new InvalidContainerError();
    const container_type = props.containerType?? 'container_lowest';

    const context = React.useContext(ContainerContext);
    const [class_name, set_style] = useCSSClass();
    React.useEffect(() => {
        set_style(`
            .${class_name} {
                background-color: ${(context.role === role && context.container_type === container_type)? "transparent" : Scheme[role][container_type]};
                color: ${(context.role === role && context.container_type === container_type)? Scheme[context.role].on_container : Scheme[role][container_type]}
                box-shadow: 0 ${0.2 * Typography.font_size}${Typography.unit} ${0.2 * Typography.font_size}${Typography.unit} 0 ${Scheme.neutral.shadow};
            }
        `);
    }, [class_name, Scheme, Typography.font_size, Typography.unit]);

    return (
        <ContainerContext.Provider value={{"role": role, "container_type": container_type}}>
            <Card className={`${class_name} ${props.className?? ""}`} rounded={props.rounded} interactable={props.interactable} ripple={props.ripple}>
                {props.children}
            </Card>
        </ContainerContext.Provider>

    );
}

export default ElevatedCard;