import * as React from "react";
import {SwitchTransition, CSSTransition} from "react-transition-group";


/**
 * The Arroz con Webo Slideshow Component: Use this component to create a slideshow. The slides will created from the
 * children added to the component.
 * 
 * These params are props to the React Component:
 * @param {string} enterStyle (optional) Can have the value 'fade-in', 'fade-up', 'fade-down', 'fade-with', or 'fade-against'. Defaults to 'fade-up'.
 * @param {string} exitStyle (optional) Can have the value of 'fade-out', 'fade-with', 'fade-against', 'fade-up', fade-down'. Defaults to 'fade-with'.
 * 
 * @param {boolean} custom (optional) If this prop is true, then `enterStyle` and `exitStyle` will all be ignored and `customClasses` must be defined.
 * @param {string} customAnimations (optional) Classifies the CSS class(es) where the transitions can be found.
 * @param {boolean} wrap (optional) Specifies whether moving past the extremas of the slideshow will wrap around to the other extrema.
 * @param {string} mode (optional) The value can either be 'out-in' or 'in-out'. The value is 'out-in' by default.
 * 
 */
export default function Slideshow(props) {
    // Default animation modes for SwitchTransition.
    const ACCEPTED_MODES = ["out-in", "in-out"];
    if(props.mode && !ACCEPTED_MODES.includes(props.mode)) // Verify the proper mode is set.
        throw new Error();
    const mode = props.mode ? props.mode : 'out-in'; // Default to 'out-in' if props.mode is not used.

    // Defining the number of children
    const NUMBER_OF_SLIDES = props.children.length;
    const [current_slide, setSlide] = React.useState(0);
    // Creating references to those children so the CSSTransition Component can actually send them to the shadow realm.
    const slide_references = [];
    for(let i = 0; i < NUMBER_OF_SLIDES; i++)
        slide_references.push(React.createRef(null));
    
    // define animation and assign it to a classNames object

    const wrap = props.wrap;
    const modulo = (number, modulus) => ((number % modulus) + modulus) % modulus;
    const clamp = (number, minimum, maximum) => number > maximum? maximum : number < minimum? minimum : number;
    const change_slide = (next_slide) => {
        if(wrap)
            next_slide = modulo(next_slide, NUMBER_OF_SLIDES);
        next_slide = clamp(number, 0, NUMBER_OF_SLIDES);

        // Add animation logic here
        // Check left or right

        setSlide(next_slide);
    }
    const next_left = () => {
        change_slide(current_slide - 1);
    }
    const next_right = () => {
        change_slide(current_slide + 1);
    }

    return (
        <div id="arroz-slideshow" className={props.className}>
            <SwitchTransition mode={mode}>
                <CSSTransition
                    key={current_slide}
                    nodeRef={slide_references[current_slide]}
                    addEndListener={(done) => {
                        slide_references[current_slide].current.addEventListener("transitionend", done, false);
                    }}
                    classNames="fade"
                >
                    <div ref={slide_references[current_slide]} id="arroz-slide-container">
                        {props.children[current_slide]}
                    </div>
                </CSSTransition>
            </SwitchTransition>
            <div id="arroz-button-container">
                <button onClick={() => setSlide((current_slide + 1) % NUMBER_OF_SLIDES)}>
                    {current_slide}
                </button>
            </div>
        </div>
    );
}