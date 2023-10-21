import * as React from 'react';
import {createUseStyles} from 'react-jss';

const useStyles = createUseStyles(({theme}) => ({
    "arroz-title": {
        font: theme.typography.title()
    }
}));

/**
 * 
 * @param
 */
export default function Title({className, children}) {
    const classes = useStyles({});
    return (
        <h3 className={`${classes['arroz-title']} ${className?? ""}`}>{children}</h3>
    );
}