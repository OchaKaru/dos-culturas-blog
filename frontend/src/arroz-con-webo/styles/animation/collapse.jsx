import * as React from 'react';
import {animated, useSpring} from '@react-spring/web';
import {createUseStyles} from 'react-jss';

const useStyles = createUseStyles(({theme}) => ({
    'arroz-collapse': {
        margin: 0,
        padding: 0,
        position: 'relative',
        overflowX: 'hidden',
        overflowY: "scroll",
    }
}));

export default function Collapse({open = false, children}) {
    const [animation, api] = useSpring(() => ({
        from: {
            width: "0%"
        }
    }));

    React.useEffect(() => {
        api.start({
            to: {
                width: open? "100%" : "0%"
            }
        });
    }, [open]);

    const classes = useStyles();
    return (
        <animated.div className={classes['arroz-collapse']} style={animation}>
            {children}
        </animated.div>
    );
}