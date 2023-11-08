import { InvalidKeyError, NoMatchError } from "../error";

/**
 * A negative accepting modulo function, which wraps around the modulus.
 * @param {*} number The number to be modulated.
 * @param {*} modulus The number to modulate by.
 * @returns The positive modulo.
 */
export function modulo(number, modulus) {
    return ((number % modulus) + modulus) % modulus;
}

/**
 * This function clamps the number between to inputs, inclusively.
 * @param {*} number The number to be clamped.
 * @param {*} minimum The minimum (inclusively).
 * @param {*} maximum The maximum (inclusively).
 * @returns The clamped value.
 */
export function clamp(number, minimum, maximum) {
    // if the number is greater than maximum, then return maximum,
    // else if the number is less than minimum, then return minimum,
    // else return the number
    return number > maximum? maximum : (number < minimum? minimum : number);
}

/**
 * This funciton converts given measurement to pixels.
 * @param {*} measure 
 */
export function convert(measure) {
    const supportedUnits = {
        // Absolute sizes
        'px': value => value,
        'cm': value => value * 38,
        'mm': value => value * 3.8,
        'q': value => value * 0.95,
        'in': value => value * 96,
        'pc': value => value * 16,
        'pt': value => value * 1.333333,

        // Relative sizes
        'rem': value => value * parseFloat(getComputedStyle(document.documentElement).fontSize ),
        'vw': value => value / 100 * window.innerWidth,
        'vh': value => value / 100 * window.innerHeight,

        // Times
        'ms': value => value,
        's': value => value * 1000,

        // Angles
        'deg': value => value,
        'rad': value => value * ( 180 / Math.PI ),
        'grad': value => value * ( 180 / 200 ),
        'turn': value => value * 360

    };

    // Match positive and negative numbers including decimals with following unit
    const pattern = new RegExp( `^([\-\+]?(?:\\d+(?:\\.\\d+)?))(${ Object.keys( supportedUnits ).join( '|' ) })$`, 'i' );
    // If is a match, return example: [ "-2.75rem", "-2.75", "rem" ]
    const matches = String.prototype.toString.apply(measure).trim().match(pattern);

    if(matches) {
        const value = Number(matches[1]);
        const unit = matches[2].toLocaleLowerCase();

        // Sanity check, make sure unit conversion function exists
        try {
            return supportedUnits[unit](value);
        } catch {
            throw new InvalidKeyError("No unit of given value exists.");
        }
    } else
        throw new NoMatchError("No matches were found for given measure.");
}