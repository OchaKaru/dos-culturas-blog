import * as React from 'react';
import {createUseStyles} from 'react-jss';


import {ContainerContext} from '../containment/container-context';

const useStyles = createUseStyles(({theme}) => ({
    
}));

export default function Form({className, role, containerType, children, ...props}) {
    
    
    const context = React.useContext(ContainerContext);
    const classes = useStyles({context, role, containerType});
    return (
        <form className={`${classes['arroz-form']} ${className?? ""}`} {...props}>
            {children}
        </form>
    );
}