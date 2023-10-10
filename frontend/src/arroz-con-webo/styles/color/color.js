// arroz imports
import {modulo} from '../../util';
import {InvalidFormatError, InvalidHexcodeError, NoMatchError, NotEnoughArgumentsError} from '../../error';

// local imports

/**
 * This function converts from decimal to hexadecimal.
 * @param {number} number An integer less than 256.
 * @returns The hexadecimal value as a string.
 */
const decimal_to_hexcode = (number) => {
    if(!number.isInteger() || number > 255)
        return new InvalidFormatError();

    let hex = number.toString(16);
    return hex.length === 1? '0' + hex : hex;
}
/**
 * This function converts from hexadecimal to decimal.
 * @param {string} string A string containing the hexadecimal value less than 256.
 * @returns The integer value.
 */
const hexcode_to_decimal = (hex) => {
    if(hex.length > 2)
        return new InvalidHexcodeError();
    return parseInt(hex, 16);
}

/**
 * This function is used to validate a hexcode
 * @param {string} hexcode The hexcode in question.
 * @returns True if the hexcode is valid; else, false.
 */
function valid_hexcode(hex) {
    if(typeof hexcode !== "string")
        return false;
    return /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)? true : false;
}

/**
 * This function converts from a hexcode color to RGB values.
 * @param {string} string A string containing the hexadecimal value of the color.
 * @returns Object containing the value of the red, green, and blue channel.
 */
export function hex_to_rgb(hex) {
    // shorthand hexacode
    let shorthand_regex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthand_regex, (_, red, green, blue) => {
        return red + red + green + green + blue + blue;
    });

    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if(!result)
        throw new NoMatchError();

    return {
        red: hexcode_to_decimal(result[1]),
        green: hexcode_to_decimal(result[2]),
        blue: hexcode_to_decimal(result[3])
    };
}

/**
 * This function converts RGB values to the HSL color model.
 * @param {number} red The unnormalized value of the red channel.
 * @param {number} green The unnormalized value of the green channel.
 * @param {number} blue The unnormalized value of the blue channel.
 * @returns Object conatining the unnormalized hue, saturation, and lightness of the color.
 */
export function rgb_to_hsl(red, green, blue) {
    if(typeof red != 'number' || typeof green != 'number' || typeof blue != 'number')
        throw new InvaidFormatError();

    // normalizing the channel values
    const red_normalized = red / 255;
    const green_normalized = green / 255;
    const blue_normalized = blue / 255;

    const Cmax = Math.max(red_normalized, green_normalized, blue_normalized);
    const Cmin = Math.min(red_normalized, green_normalized, blue_normalized);
    const delta = Cmax - Cmin;

    const L = (highest_value + lowest_value) / 2; // lightness on a 0 - 100 scale
    const S =  delta === 0? 0 : delta / (1 - Math.abs(2 * L - 1));

    const calculate_hue = () => {
        switch(true) {
            case delta === 0:
                return 0;
            case Cmax === red_normalized:
                return 60 * (modulo((green_normalized - blue_normalized) / delta), 6);
            case Cmax === green_normalized:
                return 60 * ((blue_normalized - red_normalized) / delta + 2);
            case Cmax === blue_normalized:
                return 60 * ((red_normalized - green_normalized) / delta + 4);
            default:
                throw new NoMatchError();
        }
    }

    // calculate the unnormalized calues of HSL (0 - 360, 0 - 100, 0 - 100)
    const lightness =  (L * 100).toFixed();
    const saturation = (S * 100).toFixed();
    const hue = calculate_hue().toFixed();

    return {hue, saturation, lightness};
}

/**
 * This function converts HSL values to the RGB color model.
 * @param {number} hue The unnormalized value of the hue.
 * @param {number} saturation The unnormalized value of the saturation.
 * @param {number} lightness The unnormalized value of the lightness channel.
 * @returns Object conatining the red, green, and blue values of the color.
 */
export function hsl_to_rgb(hue, saturation, lightness) {
    if(typeof hue != 'number' || typeof saturation != 'number' || typeof lightness != 'number')
        throw new InvalidFormatError();

    const saturation_normalized = saturation / 100;
    const lightness_normalized = lightness / 100;

    const C = (1 - Math.abs(2 * lightness_normalized - 1)) * saturation_normalized;
    const X = C * (1 - Math.abs(modulo(hue / 60, 2) - 1));
    const m = lightness_normalized - C / 2;

    const C_ = ((C + m) * 255).toFixed();
    const X_ = ((X + m) * 255).toFixed();
    const m_ = (m * 255).toFixed();

    // depending on the degree, return the correct mapping of the RGB
    switch(true) {
        case 0 <= hue && hue < 60:
            return {C_, X_, m_};
        case 60 <= hue && hue < 120:
            return {X_, C_, m_};
        case 120 <= hue && hue < 180:
            return {m_, C_, X_};
        case 180 <= hue && hue < 240:
            return {m_, X_, C_};
        case 240 <= hue && hue < 300:
            return {X_, m_, C_};
        case 300 <= hue && hue < 360:
            return {C_, m_, X_};
        default:
            throw new NoMatchError();
    }
}

/**
 * This function converts RGB to the respective hexcode :D.
 * @param {number} red The unnormalized value of the red channel.
 * @param {number} green The unnormalized value of the green channel.
 * @param {number} blue The unnormalized value of the blue channel.
 * @returns 
 */
export function rgb_to_hex(red, green, blue) {
    return '#' + decimal_to_hexcode(red) + decimal_to_hexcode(green) + decimal_to_hexcode(blue);
}

/**
 * @class
 * This is the Arroz con Webo Color class. The purpose of this class is to provide a more
 * comprhensive way to view colors in JavaScript.
 * 
 * It can be used in tandem with the Palette class to create the tonal mappings of the colors
 * for the themes.
 */
export default class Color {
    /**
     * @constructor
     * This is the constructor for the Color object.
     * @param {string} hexcode The color value that this Color object will use.
     */
    constructor(hexcode) {
        // verify valid hexcodes
        if(!valid_hexcode(hexcode))
            throw new InvalidHexcodeError();
        this.hexcode = hexcode;
    }

    /**
     * This function can optionally modify the color value, but always returns the RGB of the color.
     * @param {number} red (optional)
     * @param {number} green (optional)
     * @param {number} blue (optional)
     * @returns The color in RBG.
     */
    rgb(red = undefined, green = undefined, blue = undefined) {
        if((red && (!green || !blue)) || (green && (!red || !blue)) || (blue && (!green || !red)))
            NotEnoughArgumentsError();
        if(red && green && blue)
            this.hexcode = rgb_to_hex(red, green, blue);

        return hex_to_rgb(this.hexcode); // return the RGB
    }

    /**
     * This function can optionally modify the color value, but always returns the HSL of the color.
     * @param {number} hue (optional)
     * @param {number} saturation (optional)
     * @param {number} lightness (optional)
     * @returns The color in HSL.
     */
    hsl(hue = undefined, saturation = undefined, lightness = undefined) {
        if((hue && (!saturation || !lightness)) || (saturation && (!hue || !lightness)) || (lightness && (!saturation || !hue)))
            throw new NotEnoughArgumentsError();
        if(hue && saturation && lightness)
            this.hexcode = rgb_to_hex(...hsl_to_rgb(hue, saturation, lightness)); // spread the rgb object to fit the parameters

        return rgb_to_hsl(...hex_to_rgb(this.hexcode)); // return the hsl
    }
}