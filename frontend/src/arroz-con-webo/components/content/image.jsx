import * as React from 'react';
import {createUseStyles} from 'react-jss';

// arroz imports
import {NoSourceProvidedError} from '../../error';

const useStyles = createUseStyles(({theme}) => ({
    "arroz-image": {
        width: "100%",
        margin: 0,
        overflow: "hidden",
        "& img": {
            width: "100%",
            objectFit: "cover"
        }
    }
}));

export default function Image({className, source, alternate}) {
    const classes = useStyles();
    return (
        <figure className={`${classes['arroz-image']} ${className?? ""}`}>
            <img src={source} alt={alternate} />
        </figure>
    );
}