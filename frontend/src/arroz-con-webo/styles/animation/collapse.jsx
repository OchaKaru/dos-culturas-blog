import * as React from 'react';
import {animated, useSpring} from '@react-spring/web';
import {createUseStyles} from 'react-jss';

const useStyles = createUseStyles(({theme}) => ({
    'arroz-collapse': {
        width: ({direction}) => direction === "vertical"? "100%" : null,
        height: ({direction}) => direction === "vertical"? null : "100%",
        margin: 0,
        padding: 0,
        position: "relative",
        overflowX: "hidden",
        overflowY: ({direction}) => direction === "vertical"? "hidden" : "auto",
    }
}));

export default function Collapse({open = false, direction = "vertical", children}) {
    const [animation, api] = useSpring(() => ({
        from: (direction === "vertical"? {height: "0"} : {width: "0"})
    }));

    let reference = React.useRef(null);
    React.useEffect(() => {
        const node = reference.current
        console.log(node.scrollHeight);
        if(node)
            api.start({
                to: (direction === "vertical"? {height: open? `${node.scrollHeight}px` : "0"} : {width: open? `${node.scrollWidth}px` : "0"})
            });
    }, [open, reference]);

    const classes = useStyles({direction});
    return (
        <animated.div ref={reference} className={classes['arroz-collapse']} style={animation}>
            {children}
        </animated.div>
    );
}