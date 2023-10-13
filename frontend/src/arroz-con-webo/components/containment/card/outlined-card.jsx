import * as React from 'react';

// arroz imports
import {InvalidRoleError} from '../../../error';
import {Scheme, Typography} from '../../../styles';
import {useCSSClass} from '../../../util';
import {ContainerContext, valid_role} from '../container-context';

// local imports
import Card from './card';

/**
 * This is the Arroz con Webo Outlined Card: Used where content needs to be in subcontainers. The cards
 * contain related elements. Content can be anything.
 * 
 * @param {string} role (optional) Can have value of 'primary', 'secondary', 'tertiary', or 'surface-<level>'. Defaults to 'surface'.
 * @param {boolean} rounded (optional) Specifies whether the card corners are rounded.
 * @param {boolean} interactable (optional) Specifies if the card should have a hover effect.
 * @param {boolean} ripple (optional) Specifies if the card should have a ripple animation.
 */
export default function OutlinedCard(props) {
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
                box-shadow: inset 0 0 0 ${0.1 * Typography.font_size}${Typography.unit} ${role === "neutral"? Scheme.neutral.outline : Scheme[role].accent};
            }
        `);
    }, [class_name, Scheme]);

    return (
        <ContainerContext.Provider value={{"role": role, "container_type": container_type}}>
            <Card className={`${class_name} ${props.className?? ""}`} rounded={props.rounded} interactable={props.interactable} ripple={props.ripple}>
                {props.children}
            </Card>
        </ContainerContext.Provider>

    );
}