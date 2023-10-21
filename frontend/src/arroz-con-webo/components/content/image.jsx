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
    if(!source)
        throw new NoSourceProvidedError();

    const [image, set_image] = React.useState();
    React.useEffect(() => {
        (async () => {
            set_image((await import(source)).default);
        })();
    }, [source])

    const classes = useStyles();
    return (
        <figure className={`${classes['arroz-image']} ${className?? ""}`}>
            <img src={image} alt={alternate} />
        </figure>
    );
}