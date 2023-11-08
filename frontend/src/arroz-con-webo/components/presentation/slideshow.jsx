import * as React from "react";
import {animated, useTransition} from '@react-spring/web';
import {createUseStyles} from "react-jss";

// arroz imports
import {InvalidFormatError, InvalidKeyError, InvalidModeError} from "../../error";
import {clamp, modulo} from '../../util';
import IconButton from '../action/picto-button/icon-button';
import Pagination from "../communication/pagination";

// local imports
import "./transitions/fade-in.css";
import "./transitions/fade-out.css";

const useStyles = createUseStyles({
    
})

/**
 * The Arroz con Webo Slideshow Component: Use this component to create a slideshow. The slides will created from the
 * children added to the component.
 * 
 * These params are props to the React Component:
 * @param {string} enterStyle (optional) Can have the value 'fade-in', 'fade-in-up', 'fade-in-down', 'fade-in-with', or 'fade-in-against'. Defaults to 'fade-in'.
 * @param {string} exitStyle (optional) Can have the value of 'fade-out', 'fade-out-with', 'fade-out-against', 'fade-out-up', fade-out-down'. Defaults to 'fade-out'.
 * @param {boolean} animate (optional) Specifies whether the component should be animated. Defaults to true.
 * @param {boolean} wrap (optional) Specifies whether moving past the extremas of the slideshow will wrap around to the other extrema. Defaults to false.
 * @param {string} mode (optional) The value can either be 'out-in' or 'in-out'. Defaults to "out-in".
 * 
 * @param {*} custom (optional) If this prop is true, then `enterStyle` and `exitStyle` will all be ignored.
 */
export default function Slideshow({className, role = "primary", enterStyle = "fade-in", exitStyle = "fade-out", animate = true, wrap = false, mode = "out-in", custom, children}) {
    // Default animation modes for SwitchTransition.
    const ACCEPTED_MODES = ["out-in", "in-out"];
    if(mode && !ACCEPTED_MODES.includes(mode)) // Verify the proper mode is set.
        throw new InvalidModeError();

    // Defining the number of children
    const NUMBER_OF_SLIDES = children? React.Children.toArray(children).length : 0;
    const [current_slide, set_slide] = React.useState(0); // initialize current slide
    // Creating references to those children so the CSSTransition Component can actually send them to the shadow realm.
    const slide_references = [];
    for(let i = 0; i < NUMBER_OF_SLIDES; i++)
        slide_references.push(React.createRef(null));

    // declare the direction state that will be used to define the transition
    const [direction, set_direction] = React.useState('left');
    const change_slide = (next_slide, direction) => {
        set_direction(direction);
        // delay the slide number changing so that the direction change can happen before slide change guaranteed
        setTimeout(() => {
            set_slide(next_slide);
        });
    }

    const ANIMATION_DURATION = 300;
    const transition = useTransition(current_slide, {
        exitBeforeEnter: mode === "out-in",
        from: {
            opacity: 0,
            transform: "translate(0%, 100%)"
        },
        enter: {
            opacity: 1,
            transform: "translate(0%, 0%)"
        },
        leave: {
            opacity: 0,
            transform: `translate(${direction === 'left'? "100%" : "-100%"}, 0%)`
        }
    });

    const classes = useStyles();
    return (
        <div className={`${className?? ""}`}>
            {transition((style, slide) => (
                <animated.div style={style}>
                    {React.Children.toArray(children)[slide]}
                </animated.div>
            ))}
            <Pagination count={NUMBER_OF_SLIDES} role={role} onChange={change_slide} />
        </div>
    );
}