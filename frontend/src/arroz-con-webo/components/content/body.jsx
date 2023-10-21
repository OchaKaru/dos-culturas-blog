import * as React from 'react';
import {createUseStyles} from 'react-jss';

const useStyles = createUseStyles(({theme}) => ({
    "arroz-body": {
        font: theme.typography.body()
    }
}));

/**
 * 
 * @param
 */
export default function Body({className, children}) {
    const classes = useStyles({});
    return (
        <p className={`${classes['arroz-body']} ${className?? ""}`}>{children}</p>
    );
}