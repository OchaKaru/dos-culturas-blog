import * as React from "react";
import {animated, useTransition} from '@react-spring/web';
import {createUseStyles} from "react-jss";

// arroz imports
import {InvalidFormatError, InvalidKeyError, InvalidModeError} from "../../../error";
import {clamp, modulo} from '../../../util';
import IconButton from '../../action/picto-button/icon-button';

// local imports
import "./transitions/fade-in.css";
import "./transitions/fade-out.css";

const useStyles = createUseStyles({
    "arroz-slideshow-button-container": {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    }
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
export default function Slideshow({className, enterStyle = "fade-in", exitStyle = "fade-out", animate = true, wrap = false, mode = "out-in", custom, children}) {
    // Default animation modes for SwitchTransition.
    const ACCEPTED_MODES = ["out-in", "in-out"];
    if(mode && !ACCEPTED_MODES.includes(mode)) // Verify the proper mode is set.
        throw new InvalidModeError();

    // Set the classNames the transition uses
    let left, right;
    if(!animate)
        left = right = set_transition_name('undefined', 'undefined'); // no animation if animate is false
    else if(custom) { // custom transitions defined by the user
        if(typeof custom === "string") { // when the user uses a string custom name
            left = right = set_transition_name(custom, custom);
        } else if(typeof custom === "object") { // when the user wants to define custom left and right transitions
            try {
                left = set_transition_name(custom['customEnterLeft'], custom['customExitLeft']);
                right = set_transition_name(custom['customEnterRight'], custom['customExitRight']);
            } catch {
                throw new InvalidKeyError(); // if any of the keys fail, we can catch it here and throw a custom error
            }
        } else
            throw new Error(); // if the custom prop is set to anything other than a string or an object, then throw error
    } else if(enterStyle || exitStyle) { // if the enterStyle or exitStyle are set
        if(typeof enterStyle === "string" && typeof exitStyle === "string") {
            left = set_transition_name(left_enter_styles[enterStyle], left_exit_styles[exitStyle]);
            right = set_transition_name(right_enter_styles[enterStyle], right_exit_styles[exitStyle]);
        } else
            throw new InvalidFormatError(); // if either aren't a string we throw an error here
    } else { // the default
        left = right = set_transition_name('fade-in', 'fade-out');
    }

    // Defining the number of children
    const NUMBER_OF_SLIDES = children? children.length : 0;
    const [current_slide, set_slide] = React.useState(0); // initialize current slide
    // Creating references to those children so the CSSTransition Component can actually send them to the shadow realm.
    const slide_references = [];
    for(let i = 0; i < NUMBER_OF_SLIDES; i++)
        slide_references.push(React.createRef(null));

    // declare the direction state that will be used to define the transition
    const [direction, set_direction] = React.useState('left');
    const change_slide = (next_slide, direction = undefined) => {
        if(wrap)
            next_slide = modulo(next_slide, NUMBER_OF_SLIDES);
        next_slide = clamp(next_slide, 0, NUMBER_OF_SLIDES - 1);

        // if the function doesn't receive a direction we default to using the page numbers to see what transition to use
        // this is useful when changing the page directly with page numbers
        if(!direction)
            direction = next_slide > current_slide? 'right' : 'left';
        set_direction(direction);

        // delay the slide number changing so that the direction change can happen before slide change guaranteed
        setTimeout(() => {
            set_slide(next_slide);
        });
    }
    // the functions used when setting the next with the buttons
    const next_left = () => {
        change_slide(current_slide - 1, 'left');
    }
    const next_right = () => {
        change_slide(current_slide + 1, 'right');
    }

    function display_page_buttons() {

    }

    const ANIMATION_DURATION = 300;
    const transition = useTransition(current_slide, {
        exitBeforeEnter: mode === "out-in",
        from: {
            opacity: 0,
            transform: "translateY(-100%)"
        },
        enter: {
            opacity: 1,
            transform: "translateY(0%)"
        },
        leave: {
            opacity: 1,
            transform: `translateX(${direction === 'left'? "100%" : "-100%"})`
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
            <div className={classes['arroz-slideshow-button-container']}>
                <IconButton onClick={next_left}>
                    <svg>

                    </svg>
                </IconButton>
                {display_page_buttons()}
                <IconButton onClick={next_right}>
                    <svg>
                        
                    </svg>
                </IconButton>
            </div>
        </div>
    );
}

// these are the built-in styles
const left_enter_styles = {'fade-in': 'fade-in', 'fade-in-up': 'fade-in-up', 'fade-in-down': 'fade-in-down', 'fade-in-with': 'fade-in-left', 'fade-in-against': 'fade-in-right'};
const right_enter_styles = {'fade-in': 'fade-in', 'fade-in-up': 'fade-in-up', 'fade-in-down': 'fade-in-down', 'fade-in-with': 'fade-in-right', 'fade-in-against': 'fade-in-left'};
const left_exit_styles = {'fade-out': 'fade-out', 'fade-out-up': 'fade-out-up', 'fade-out-down': 'fade-out-down', 'fade-out-with': 'fade-out-left', 'fade-out-against': 'fade-out-right'};
const right_exit_styles = {'fade-out': 'fade-out', 'fade-out-up': 'fade-out-up', 'fade-out-down': 'fade-out-down', 'fade-out-with': 'fade-out-right', 'fade-out-against': 'fade-out-left'};

// defining the transition styles for the slides
function set_transition_name(enter, exit) {
    return ({
        'enter': `${enter}`,
        'enterActive': `${enter}-active`,
        'enterDone': `${enter}-done`,
        'exit': `${exit}`,
        'exitActive': `${exit}-active`,
        'exitDone': `${exit}-done`,
    });
}