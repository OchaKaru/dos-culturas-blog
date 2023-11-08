import * as React from 'react';
import {createUseStyles} from 'react-jss';

const useStyles = createUseStyles(({theme}) => ({
    "arroz-shim": {
        backgroundColor: theme.scheme.neutral.shadow,
        opacity: "50%",
        height: "100%",
        width: "100%",
        position: "absolute",
        zIndex: 100,
        display: ({show}) => show? "block" : "none"
    }
}));

export default function Shim({className, show = false}) {
    const classes = useStyles({show});
    return (
        <div className={`${classes['arroz-shim']} ${className?? ""}`} />
    );
}