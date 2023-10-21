import * as React from 'react';
import {createUseStyles} from 'react-jss';

const useStyles = createUseStyles(({theme}) => ({
    "arroz-display": {
        font: theme.typography.display()
    }
}));

/**
 * 
 * @param
 */
export default function Title({className, children}) {
    const classes = useStyles({});
    return (
        <h1 className={`${classes['arroz-display']} ${className?? ""}`}>{children}</h1>
    );
}