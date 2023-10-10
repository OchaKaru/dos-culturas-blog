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