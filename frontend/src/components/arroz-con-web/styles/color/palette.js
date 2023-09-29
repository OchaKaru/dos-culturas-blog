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
const decimal_to_hexcode = (number) => {
    if(!number.isInteger() || number > 255)
        return new Error();

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
        return new Error();
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

    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if(!result)
        throw new Error();

    return {
        red: hexcode_to_decimal(result[1]),
        green: hexcode_to_decimal(result[2]),
        blue: hexcode_to_decimal(result[3])
    };
}

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

/**
 * This function converts HSL values to the RGB colorspace.
 * @param {number} hue The unnormalized value of the hue.
 * @param {number} saturation The unnormalized value of the saturation.
 * @param {number} lightness The unnormalized value of the lightness channel.
 * @returns Object conatining the hue, saturation, and lightness of the color.
 */
function hsl_to_rgb(hue, saturation, lightness) {

}

/**
 * 
 * @param {*} red 
 * @param {*} green 
 * @param {*} blue 
 * @returns 
 */
function rgb_to_hex(red, green, blue) {
    return '#' + decimal_to_hexcode(red) + decimal_to_hexcode(green) + decimal_to_hexcode(blue);
}

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
        // verify valid hexcodes
        if(typeof hex != "string" || !this.valid_hexcode(hex))
            throw new Error();
        this.hexcode = hex;
    }
 
    valid_hexcode(hex) {
        return /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex) != false;
    }

    rgb(red = undefined, green = undefined, blue = undefined) {
        if(red && (!green || !blue) || green && (!red || !blue) || blue && (!green || !red))
            throw new Error();
        if(red && green && blue)
            this.hexcode = rgb_to_hex(red, green, blue);

        return hex_to_rgb(this.hexcode); // return the rgb
    }

    hsl(hue = undefined, saturation = undefined, lightness = undefined) {
        if(hue && (!saturation || !lightness) || saturation && (!hue || !lightness) || lightness && (!saturation || !hue))
            throw new Error();
        if(hue && saturation && lightness)
            this.hexcode = rgb_to_hex(...hsl_to_rgb(hue, saturation, lightness)); // spread the rgb object to fit the parameters

        return rgb_to_hsl(...hex_to_rgb(this.hexcode)); // return the hsl
    }
}


/**
 * @class
 * The Arroz con Webo Palette: This is used to generate a palette for the entire document.
 * 
 * @member {object} light Specifies the many light mode colors that will be used throughout the website.
 * @member {object} dark Specifies the many dark mode colors that will be used throughout the website.
 */
class Palette {
    lightness_mappings = {
        "light": {
            "accent": 30,
            "on_accent": 90,
            "container": 80,
            "on_container": 10,
            
            "surface_bright": 90,
            "surface_dim": 80,
            "surface_low": 88,
            "surface_medium": 86,
            "surface_hight": 84,
            "on_surface": 10
        },
        "dark": {
            "accent": 80,
            "on_accent": 20,
            "container": 30,
            "on_container": 90,
            
            "surface_bright": 20,
            "surface_dim": 10,
            "surface_low": 14,
            "surface_medium": 16,
            "surface_high": 18,
            "on-surface": 90
        }
    }

    /**
     * 
     * @param {strin} primary_key 
     * @param {string} secondary_key 
     * @param {string} tertiary_key 
     * @param {string} error_key 
     * @param {string} neutral_key 
     */
    constructor(primary_key, secondary_key, tertiary_key, error_key, neutral_key) {
        // convert hexcodes to Color object
        this.light = {
            "primary": {
                "accent": this.tonal_mapping(primary_key, this.lightness_mappings.light.accent),
                "on_accent": this.tonal_mapping(primary_key, this.lightness_mappings.light.on_accent),
                "container": this.tonal_mapping(primary_key, this.lightness_mappings.light.container),
                "on_container": this.tonal_mapping(primary_key, this.lightness_mappings.light.on_container)
            },
            "secondary": {
                "accent": this.tonal_mapping(secondary_key, this.lightness_mappings.light.accent),
                "on_accent": this.tonal_mapping(secondary_key, this.lightness_mappings.light.on_accent),
                "container": this.tonal_mapping(secondary_key, this.lightness_mappings.light.container),
                "on_container": this.tonal_mapping(secondary_key, this.lightness_mappings.light.on_container)
            },
            "tertiary": {
                "accent": this.tonal_mapping(tertiary_key, this.lightness_mappings.light.accent),
                "on_accent": this.tonal_mapping(tertiary_key, this.lightness_mappings.light.on_accent),
                "container": this.tonal_mapping(tertiary_key, this.lightness_mappings.light.container),
                "on_container": this.tonal_mapping(tertiary_key, this.lightness_mappings.light.on_container)
            },
            "error": {
                "accent": this.tonal_mapping(error_key, this.lightness_mappings.light.accent),
                "on_accent": this.tonal_mapping(error_key, this.lightness_mappings.light.on_accent),
                "container": this.tonal_mapping(error_key, this.lightness_mappings.light.container),
                "on_container": this.tonal_mapping(error_key, this.lightness_mappings.light.on_container)
            },
            "neutral": {
                "surface_bright": this.tonal_mapping(neutral_key, this.lightness_mappings.light.surface_bright),
                "surface_dim": this.tonal_mapping(neutral_key, this.lightness_mappings.light.surface_dim),
                "surface_low": this.tonal_mapping(neutral_key, this.lightness_mappings.light.surface_low),
                "surface_medium": this.tonal_mapping(neutral_key, this.lightness_mappings.light.surface_medium),
                "surface_high": this.tonal_mapping(neutral_key, this.lightness_mappings.light.surface_high),
                "on-surface": this.tonal_mapping(neutral_key, this.lightness_mappings.light.on_surface)
            }
        }

        this.dark = {
            "primary": {
                "accent": this.tonal_mapping(primary_key, this.lightness_mappings.dark.accent),
                "on_accent": this.tonal_mapping(primary_key, this.lightness_mappings.dark.on_accent),
                "container": this.tonal_mapping(primary_key, this.lightness_mappings.dark.container),
                "on_container": this.tonal_mapping(primary_key, this.lightness_mappings.dark.on_container)
            },
            "secondary": {
                "accent": this.tonal_mapping(secondary_key, this.lightness_mappings.dark.accent),
                "on_accent": this.tonal_mapping(secondary_key, this.lightness_mappings.dark.on_accent),
                "container": this.tonal_mapping(secondary_key, this.lightness_mappings.dark.container),
                "on_container": this.tonal_mapping(secondary_key, this.lightness_mappings.dark.on_container)
            },
            "tertiary": {
                "accent": this.tonal_mapping(tertiary_key, this.lightness_mappings.dark.accent),
                "on_accent": this.tonal_mapping(tertiary_key, this.lightness_mappings.dark.on_accent),
                "container": this.tonal_mapping(tertiary_key, this.lightness_mappings.dark.container),
                "on_container": this.tonal_mapping(tertiary_key, this.lightness_mappings.dark.on_container)
            },
            "error": {
                "accent": this.tonal_mapping(error_key, this.lightness_mappings.dark.accent),
                "on_accent": this.tonal_mapping(error_key, this.lightness_mappings.dark.on_accent),
                "container": this.tonal_mapping(error_key, this.lightness_mappings.dark.container),
                "on_container": this.tonal_mapping(error_key, this.lightness_mappings.dark.on_container)
            },
            "neutral": {
                "surface_bright": this.tonal_mapping(neutral_key, this.lightness_mappings.dark.surface_bright),
                "surface_dim": this.tonal_mapping(neutral_key, this.lightness_mappings.dark.surface_dim),
                "surface_low": this.tonal_mapping(neutral_key, this.lightness_mappings.dark.surface_low),
                "surface_medium": this.tonal_mapping(neutral_key, this.lightness_mappings.dark.surface_medium),
                "surface_high": this.tonal_mapping(neutral_key, this.lightness_mappings.dark.surface_high),
                "on-surface": this.tonal_mapping(neutral_key, this.lightness_mappings.dark.on_surface)
            }
        }
    }

    tonal_mapping(color, lightness) {
        color_hsl = color.hsl();
        return rgb_to_hex(...hsl_to_rgb(color_hsl.hue, color_hsl.saturation, lightness));
    }
}

/**
 * @class
 * The Arroz con Webo Themer: This is a singleton that keeps track of the palettes added to the website.
 * 
 * @member {boolean} dark_mode This defines whether dark mode is active.
 * @member {object} palette_list This should be an object of type Palette.
 */
class Themer {
    constructor(default_dark_mode = false, default_palette = undefined) {
        this.dark_mode = default_dark_mode;
        this.palette_list = {};
        if(default_palette)
            this.palette_list["default"] = default_palette;
    }

    toggle_dark_mode() {
        this.dark_mode = !this.dark_mode;
    }

    add_palette(name, palette) {
        this.palette_list[name] = palette;
    }

    set_palette(name) {
        let color_scheme = this.dark_mode? "dark" : "light";
        let theme = this.palette_list[name][color_scheme];
        // access the root element and assign all the variables to the appropriate values.
    }
}
let instance = Themer()



export default {
    Palette,
};