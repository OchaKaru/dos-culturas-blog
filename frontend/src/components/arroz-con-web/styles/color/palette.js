/**
 * @author Kalvin Garcia
 * 
 * I wanted to create a dynamic theme for the Arroz con Webo library, but there wasn't a way to natively
 * do that in Sass or SCSS. I decided to opt for a CSS and JavaScript hybrid that could instead infrom
 * the SCSS variables that are will be sprinkled throughout the components. Essentially, letting them be
 * dynamically themed by giving SCSS's prettier variables the values of CSS's uglier cousins.
 */

/**
 * This function converts from decimal to hexadecimal.
 * @param {number} number An integer less than 256.
 * @returns The hexadecimal value as a string.
 */
const decimal_to_hex = (number) => {
    if(!number.isInteger())
        return new Error();

    let hex = number.toString(16);
    return hex.length === 1? '0' + hex : hex;
}
/**
 * This function converts from hexadecimal to decimal.
 * @param {string} string A string containing the hexadecimal value less than 256.
 * @returns The integer value.
 */
const hex_to_decimal = (hex) => {
    return parseInt(hex, 16);
}

/**
 * This function converts from a hexcode color to RGB values.
 * @param {string} string A string containing the hexadecimal value of the color.
 * @returns Object containing the value of the red, green, and blue channel.
 */
function hex_to_rgb(hex) {
    // short hand hexadecimal
    let shorthand_regex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthand_regex, (match, red, green, blue) => {
        return red + red + green + green + blue + blue;
    });

    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
    if(!result)
        throw new Error();

    return {
        red: hex_to_decimal(result[1]),
        green: hex_to_decimal(result[2]),
        blue: hex_to_decimal(result[3])
    };
}

/**
 * This function converts HSL values to the RGB colorspace.
 * @param {number} hue The unnormalized value of the hue.
 * @param {number} saturation The unnormalized value of the saturation.
 * @param {number} lightness The unnormalized value of the lightness channel.
 * @returns Object conatining the hue, saturation, and lightness of the color.
 */
function hsl_to_rgb(hue, saturation, lightness) {

}
// Not entirely necessary right now.
// function hex_to_hsl(hex) {
// }

/**
 * This function converts RGB values to the HSL colorspace.
 * @param {number} red The unnormalized value of the red channel.
 * @param {number} green The unnormalized value of the green channel.
 * @param {number} blue The unnormalized value of the blue channel.
 * @returns Object conatining the hue, saturation, and lightness of the color.
 */
function rgb_to_hsl(red, green, blue) {
    if(typeof red != 'number' || typeof green != 'number' || typeof blue != 'number')
        throw new Error();

    // normalizing the channel values
    red_normalized = red / 255;
    green_normalized = green / 255;
    blue_normalized = blue / 255;

    // redo to be more readable
    // highest_value = red_normalized > green_normalized?
    //     (red_normalized > blue_normalized? red_normalized : (blue_normalized > green_normalized? blue_normalized : green_normalized)) :
    //     (green_normalized > blue_normalized? green_normalized : blue_normalized);
    // lowest_value = red_normalized < green_normalized?
    //     (red_normalized < blue_normalized? red_normalized : (blue_normalized < green_normalized? blue_normalized : green_normalized)) :
    //     (green_normalized < blue_normalized? green_normalized : blue_normalized);

    // return {
    //     lightness = (((highest_value + lowest_value) / 2) * 100).toFixed(),
    //     saturation = highest_value === lowest_value? 0 : (lightness > 50? 
    //         (((highest_value - lowest_value) / (2 - highest_value - lowest_value)) * 100).toFixed() : 
    //         (((highest_value - lowest_value) / (highest_value + lowest_value)) * 100).toFixed()
    //     ),
    //     hue = saturation === 0? 0 : (red_normalized === highest_value? ((green_normalized - blue_normalized) / (highest_value - lowest_value)) : 
    //         (green_normalized === highest_value? (2 + (blue_normalized - red_normalized) / (highest_value - lowest_value)) : 
    //         (4 + (red_normalized - green_normalized) / (highest_value - lowest_value)))
    //     )
    // }
}

function rgb_to_hex(red, green, blue) {
    return '#' + decimal_to_hex(red) + decimal_to_hex(green) + decimal_to_hex(blue);
}
// Not entirely necessary right now.
// function hsl_to_hex(hue, saturation, lightness) {
// }

/**
 * @class
 */
class Color {
    /**
     * @constructor
     * This is the hexadecimal based constructor for the Color object.
     * @param {string} hex 
     */
    constructor(hex) {
        if(typeof hex != "string")
            throw new Error();
        this.hex = hex;
        this.rgba = to_RGBA();
    }
    // Future plans to add RGBA and HSL contructors.
}


/**
 * @class
 * The Arroz con Webo Palette: This is used to generate a palette for the entire document.
 * 
 * @member {string} name Names the theme that will be created from the palette provided.
 * @member {object} theme Specifies the many colors that will be used throughout the website.
 */
class Palette {
    constructor(primary_key, secondary_key, tertiary_key, error_key, neutral_key) {
        // this.primary_key = {
        //         "key": 
        //         "primary":
        //         "on_primary":
        //         "primary_container":
        //         "on-primary_container":
        // };
        // this.secondary_key = {
        //         "key": 
        //         "secondary":
        //         "on_secondary":
        //         "secondary_container":
        //         "on-secondary_container":
        // };
        // this.tertiary_key = {
        //         "key": 
        //         "tertiary":
        //         "on_tertiary":
        //         "tertiary_container":
        //         "on-tertiary_container":
        // };
        // this.error_key = {
        //         "key": 
        //         "error":
        //         "on_error":
        //         "error_container":
        //         "on-error_container":
        // };
    }
}

/**
 * @class
 * The Arroz con Webo Themer: This is a singleton that keeps track of the palettes added to the website.
 * 
 * 
 * @member {object} palette_list 
 */
class Themer {
    constructor(default_palette = undefined) {
        this.dark_mode = false;
        this.palette_list = {};
        if(default_palette)
            this.palette_list[default_palette.name] = default_palette.theme;
        
        
    }
    

    add_palette(palette) {

    }
}
let instance = Themer()



export default {
    Palette,
};