import * as React from 'react';
import {createUseStyles} from 'react-jss';

const useStyles = createUseStyles(({theme}) => ({
    "arroz-subheading": {
        font: theme.typography.subheading()
    }
}));

/**
 * 
 * @param
 */
export default function Subheading({className, children}) {
    const classes = useStyles({});
    return (
        <h4 className={`${classes['arroz-subheading']} ${className?? ""}`}>{children}</h4>
    );
}