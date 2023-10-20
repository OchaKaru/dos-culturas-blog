import * as React from 'react';
import {createUseStyles} from 'react-jss';

// arroz imports
import {InvalidRoleError, InvalidContainerError} from '../../error';
import {ContainerContext, valid_role} from '../containment/container-context';

const useStyles = createUseStyles(({theme}) => ({
    "arroz-label": {
        backgroundColor: ({context, role, container_type}) => {
            return role === "neutral"? "transparent" : theme.scheme[role].accent
        },
        color: ({role}) => role === "neutral"? theme.scheme[role].on_container : theme.scheme[role].on_accent,
        boxShadow: ({role}) => `inset 0 0 0 ${theme.typography.calculate(0.1)} ${role === "neutral"? theme.scheme.neutral.outline : theme.scheme[role].on_accent}`,
        font: theme.typography.label(),
        textWrap: "nowrap",
        textAlign: "center",
        padding: `${theme.typography.calculate(0.5)} ${theme.typography.calculate(1)}`,
        overflow: "hidden"
    }
}));

/**
 * 
 * @param 
 * @returns 
 */
export default function Label({className, role = "neutral", outlined, children}) {
    if(role && !valid_role(role))
        throw new InvalidRoleError();
    if(containerType && !valid_container(role, containerType))
        throw new InvalidContainerError();

    const context = React.useContext(ContainerContext);

    const classes = useStyles({context, role, outlined})
    return (
        <div className={`${classes['arroz-label']} ${className?? ""}`}>
            {children}
        </div>
    );
}