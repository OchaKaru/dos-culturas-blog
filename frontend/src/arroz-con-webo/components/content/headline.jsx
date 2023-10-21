import * as React from 'react';
import {createUseStyles} from 'react-jss';

const useStyles = createUseStyles(({theme}) => ({
    "arroz-headline": {
        font: theme.typography.headline()
    }
}));

export default function Headline({className, children}) {
    const classes = useStyles({});
    return (
        <h2 className={`${classes['arroz-headline']} ${className?? ""}`}>{children}</h2>
    );
}