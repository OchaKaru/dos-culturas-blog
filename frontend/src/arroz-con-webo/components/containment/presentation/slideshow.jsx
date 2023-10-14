import * as React from "react";
import {SwitchTransition, CSSTransition} from "react-transition-group";

import './styles/fade-in.scss';
import './styles/fade-out.scss';

// TODO: ADD CUSTOM ERRORS

/**
 * The Arroz con Webo Slideshow Component: Use this component to create a slideshow. The slides will created from the
 * children added to the component.
 * 
 * These params are props to the React Component:
 * @param {string} enterStyle (optional) Can have the value 'fade-in', 'fade-in-up', 'fade-in-down', 'fade-in-with', or 'fade-in-against'. Defaults to 'fade-in'.
 * @param {string} exitStyle (optional) Can have the value of 'fade-out', 'fade-out-with', 'fade-out-against', 'fade-out-up', fade-out-down'. Defaults to 'fade-out'.
 * @param {string} custom (optional) If this prop is true, then `enterStyle` and `exitStyle` will all be ignored.
 * @param {boolean} dont_animate (optional) Specifies whether the component should be animated.
 * 
 * @param {boolean} wrap (optional) Specifies whether moving past the extremas of the slideshow will wrap around to the other extrema.
 * @param {string} mode (optional) The value can either be 'out-in' or 'in-out'. The value is 'out-in' by default.
 * 
 * @param {string} level (optional) Can have a value of 'primary', 'secondary', 'tertiary' or 'neutral'. Defaults to 'primary'.
 */
const Slideshow = (props) => {
    // Default animation modes for SwitchTransition.
    const ACCEPTED_MODES = ["out-in", "in-out"];
    if(props.mode && !ACCEPTED_MODES.includes(props.mode)) // Verify the proper mode is set.
        throw new Error();
    const mode = props.mode? props.mode : 'out-in'; // Default to 'out-in' if props.mode is not used.

    // Defining the number of children
    const NUMBER_OF_SLIDES = props.children? props.children.length : 0;
    const [current_slide, set_slide] = React.useState(0); // initialize current slide
    // Creating references to those children so the CSSTransition Component can actually send them to the shadow realm.
    const slide_references = [];
    for(let i = 0; i < NUMBER_OF_SLIDES; i++)
        slide_references.push(React.createRef(null));

    // defining the transition styles for the slides
    // these are the built-in styles
    const left_enter_styles = {'fade-in': 'fade-in', 'fade-in-up': 'fade-in-up', 'fade-in-down': 'fade-in-down', 'fade-in-with': 'fade-in-left', 'fade-in-against': 'fade-in-right'};
    const right_enter_styles = {'fade-in': 'fade-in', 'fade-in-up': 'fade-in-up', 'fade-in-down': 'fade-in-down', 'fade-in-with': 'fade-in-right', 'fade-in-against': 'fade-in-left'};
    const left_exit_styles = {'fade-out': 'fade-out', 'fade-out-up': 'fade-out-up', 'fade-out-down': 'fade-out-down', 'fade-out-with': 'fade-out-left', 'fade-out-against': 'fade-out-right'};
    const right_exit_styles = {'fade-out': 'fade-out', 'fade-out-up': 'fade-out-up', 'fade-out-down': 'fade-out-down', 'fade-out-with': 'fade-out-right', 'fade-out-against': 'fade-out-left'};
    const set_transition_name = (enter, exit) => {
        return ({
            'enter': `${enter}`,
            'enterActive': `${enter}-active`,
            'enterDone': `${enter}-done`,
            'exit': `${exit}`,
            'exitActive': `${exit}-active`,
            'exitDone': `${exit}-done`,
        });
    }
    // Set the classNames the transition uses
    let left, right;
    if(props.custom) { // custom transitions defined by the user
        if(typeof props.custom === "string") { // when the user uses a string custom name
            left = right = set_transition_name(props.custom, props.custom);
        } else if(typeof props.custom === "object") { // when the user wants to define custom left and right transitions
            try {
                left = set_transition_name(props.custom['customEnterLeft'], props.custom['customExitLeft']);
                right = set_transition_name(props.custom['customEnterRight'], props.custom['customExitRight']);
            } catch {
                throw new Error(); // if any of the keys fail, we can catch it here and throw a custom error
            }
        } else
            throw new Error(); // if the custom prop is set to anything other than a string or an object, then throw error
    } else if(props.enterStyle || props.exitStyle) { // if the enterStyle or exitStyle are set
        if(typeof props.enterStyle === "string" && typeof props.exitStyle === "string") {
            left = set_transition_name(left_enter_styles[props.enterStyle], left_exit_styles[props.exitStyle]);
            right = set_transition_name(right_enter_styles[props.enterStyle], right_exit_styles[props.exitStyle]);
        } else
            throw new Error(); // if either aren't a string we throw an error here
    } else { // the default
        left = right = set_transition_name('fade-in', 'fade-out');
    }

    // overwrite if dont_animate is set to true
    if(props.dont_animate)
        left = right = set_transition_name('none', 'none');

    // define if wrapping is enabled
    const wrap = props.wrap;

    // some auxilary functions for making sure changing slides happens smoothly
    const modulo = (number, modulus) => ((number % modulus) + modulus) % modulus;
    const clamp = (number, minimum, maximum) => number > maximum? maximum : number < minimum? minimum : number;

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

        // delay the slide number changing so that the direction change can happen beforehang guaranteed
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

    return (
        <div id="arroz-slideshow" className={props.className}>
            <SwitchTransition mode={mode}>
                {(direction => {
                    return (
                        <CSSTransition
                            key={current_slide}
                            nodeRef={slide_references[current_slide]}
                            addEndListener={(done) => {
                                slide_references[current_slide].current.addEventListener("transitionend", done, false);
                            }}
                            classNames={direction === 'left'? {...left} : {...right}}
                        >
                            <div ref={slide_references[current_slide]} id="arroz-slide-container">
                                {props.children[current_slide]}
                            </div>
                        </CSSTransition>
                    );
                })(direction)}
            </SwitchTransition>
            <div id="arroz-button-container">
                <button onClick={next_left}>
                    -1
                </button>
                <button onClick={next_right}>
                    +1
                </button>
            </div>
        </div>
    );
}

export default Slideshow;