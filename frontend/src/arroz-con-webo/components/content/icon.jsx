import * as React from 'react';
import {createUseStyles} from 'react-jss';

// arroz imports
import {convert} from '../../util';
import {ContainerContext, valid_container} from '../containment/container-context';

const useStyles = createUseStyles(({theme}) => ({
    "arroz-icon": {
        height: ({scale}) => theme.typography.calculate(scale),
        width: ({scale}) => theme.typography.calculate(scale),
        padding: theme.typography.calculate(0.5),
        position: "relative",
        overflow: "hidden",
        fill: ({role, container_type}) => theme.scheme[role][valid_container(role, container_type)? "on_container" : "on_accent"],
        stroke: ({role, container_type}) => theme.scheme[role][valid_container(role, container_type)? "on_container" : "on_accent"],
        color: ({role, container_type}) => theme.scheme[role][valid_container(role, container_type)? "on_container" : "on_accent"],
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        "& svg": {
            minHeight: ({scale}) => theme.typography.calculate(scale),
            minWidth: ({scale}) => theme.typography.calculate(scale),
        }
    }
}));

export default function Icon({className, scale = 1, children}) {
    const {role, container_type} = React.useContext(ContainerContext);

    const classes = useStyles({role, container_type, scale});
    return (
        <div className={`${classes["arroz-icon"]} ${className?? ""}`}>
            {children}
        </div>
    );
}