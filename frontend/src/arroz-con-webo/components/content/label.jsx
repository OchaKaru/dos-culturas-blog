import * as React from 'react';
import {createUseStyles} from 'react-jss';

// arroz imports
import {InvalidRoleError} from '../../error';
import {ContainerContext, valid_role} from '../containment/container-context';

const useStyles = createUseStyles(({theme}) => ({
    "arroz-label": {
        backgroundColor: ({role}) => {
            return role === "neutral"? "transparent" : theme.scheme[role].accent
        },
        color: ({context, role}) => role === "neutral"? theme.scheme[context.role].on_container : theme.scheme[role].on_accent,
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
export default function Label({className, role = "neutral", children}) {
    if(role && !valid_role(role))
        throw new InvalidRoleError();

    const context = React.useContext(ContainerContext);

    const classes = useStyles({context, role})
    return (
        <span className={`${classes['arroz-label']} ${className?? ""}`}>{children}</span>
    );
}