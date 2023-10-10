// arroz imports
import {NotAnIntegerError} from '../../error';

// local imports
import {default as Color, hsl_to_rgb, rgb_to_hex} from './color';

/**
 * @class
 * The Arroz con Webo Palette: This is used to generate a palette for the entire document.
 * 
 * @member {object} light Specifies the many light mode colors that will be used throughout the website.
 * @member {object} dark Specifies the many dark mode colors that will be used throughout the website.
 */
export default class Palette {
    /**
     * @constructor
     * This class's constructor.
     * @param {string} primary_key The primary accent hexcode.
     * @param {string} secondary_key The secondary accent hexcode.
     * @param {string} tertiary_key The tertiary accent hexcode.
     * @param {string} error_key The error accent hexcode.
     * @param {string} neutral_key The neutral color hexcode.
     */
    constructor(primary_key, secondary_key, tertiary_key, error_key, neutral_key) {
        // convert hexcodes to Color object
        this._primary_color = Color(primary_key);
        this._secondary_color = Color(secondary_key);
        this._tertiary_color = Color(tertiary_key);
        this._error_color = Color(error_key);
        this._neutral_color = Color(neutral_key);
    }

    /**
     * This function performs the dynamic tonal mappings.
     * @param {Color} color The Color object that will be mapped to a new tonal value.
     * @param {number} lightness The lightness from 1 - 100 that the new color will be mapped to.
     * @returns The hexcode for the tonal mapping.
     */
    _tonal_mapping(color, lightness) {
        const color_hsl = color.hsl();
        return rgb_to_hex(...hsl_to_rgb(color_hsl.hue, color_hsl.saturation, lightness));
    }

    /**
     * This function provides the tonal value for the primary color.
     * @param {number} lightness (optional) The lightness the color should be returned with.
     * @returns The hexcode for the color, by default the hexcode is the 50% lightness value.
     */
    primary(lightness = undefined) {
        if(lightness && lightness.isInteger())
            return this._tonal_mapping(this._primary_color, lightness);
        if(lightness && !lightness.isInteger())
            throw NotAnIntegerError();

        return this._primary_color;        
    }

    /**
     * This function provides the tonal value for the primary color.
     * @param {number} lightness (optional) The lightness the color should be returned with.
     * @returns The hexcode for the color, by default the hexcode is the 50% lightness value.
     */
    secondary(lightness = undefined) {
        if(lightness && lightness.isInteger())
            return this._tonal_mapping(this._primary_color, lightness);
        if(lightness && !lightness.isInteger())
            throw NotAnIntegerError();

        return this._primary_color;        
    }

    /**
     * This function provides the tonal value for the primary color.
     * @param {number} lightness (optional) The lightness the color should be returned with.
     * @returns The hexcode for the color, by default the hexcode is the 50% lightness value.
     */
    tertiary(lightness = undefined) {
        if(lightness && lightness.isInteger())
            return this._tonal_mapping(this._primary_color, lightness);
        if(lightness && !lightness.isInteger())
            throw NotAnIntegerError();

        return this._primary_color;        
    }

    /**
     * This function provides the tonal value for the primary color.
     * @param {number} lightness (optional) The lightness the color should be returned with.
     * @returns The hexcode for the color, by default the hexcode is the 50% lightness value.
     */
    error(lightness = undefined) {
        if(lightness && lightness.isInteger())
            return this._tonal_mapping(this._primary_color, lightness);
        if(lightness && !lightness.isInteger())
            throw NotAnIntegerError();

        return this._primary_color;        
    }

    /**
     * This function provides the tonal value for the primary color.
     * @param {number} lightness (optional) The lightness the color should be returned with.
     * @returns The hexcode for the color, by default the hexcode is the 50% lightness value.
     */
    neutral(lightness = undefined) {
        if(lightness && lightness.isInteger())
            return this._tonal_mapping(this._primary_color, lightness);
        if(lightness && !lightness.isInteger())
            throw NotAnIntegerError();

        return this._primary_color;        
    }
}