import * as React from 'react';

// arroz imports
import {AlreadyInitializedError, NotInitializedError, NoPaletteFoundError} from '../../error';

// local imports
import Palette from "./palette";

/**
 * This is the default color palette for the Arroz con Webo component library.
 */
const egg_yellow = "#CDAE32";
const broth_brown = "#A67359";
const kidney_red = "#A25D80";
const tomato_red = "#BF4040";
const rice_pot_gray = "#8C7380";

/**
 * @class
 * This class is an internal theming class that converts Palette objects into the tonal mappings
 * for a given theme with 2 schemes: light and dark.
 */
class Theme {
    // The lightness mappings of the tonal dynamic colors.
    lightness_mappings = {
        "light": {
            "accent_color": {
                "accent": 30, "on_accent": 90, "container": 80, "on_container": 10,
            },
            "neutral_color": {
                "container_lowest": 90, "container_lower": 88, "container": 86, "container_higher": 84, "container_highest": 80, 
                "outline": 50, "shadow": 30,
            },
        },
        "dark": {
            "accent_color": {
                "accent": 80, "on_accent": 20, "container": 30, "on_container": 90,
            },
            "neutral_color": {
                "container_lowest": 10, "container_lower": 14, "container": 16, "container_higher": 18, "container_highest": 20,
                "outline": 60, "shadow": 0,
            },
        }
    }

    /**
     * This constructor just takes a Palette and converts it to a theme using dark JS magic.
     * @param {Palette} palette 
     */
    constructor(palette) {
        this.palette = palette;

        // Today I have performed acts that the C++ gods would look down upon...
        this.light = {}
        for(const color of ["primary", "secondary", "tertiary", "error"]) {
            this.light[color] = {}
            for(const mapping of ["accent", "on_accent", "container", "on_container"])
                this.light[color][mapping] = this.palette[color](this.lightness_mappings.light.accent_color[mapping]); // I have called a member function using map syntax...
        }
        this.light.neutral = {};
        for(const mapping of ["container_lowest", "container_lower", "container", "container_higher", "container_highest", "on_container", "outline", "shadow"])
            this.light.neutral[mapping] = this.palette["neutral"](this.lightness_mappings.light.neutral_color[mapping]);

        this.dark = {}
        for(const color of ["primary", "secondary", "tertiary", "error"]) {
            this.dark[color] = {}
            for(const mapping of ["accent", "on_accent", "container", "on_container"])
                this.dark[color][mapping] = this.palette[color](this.lightness_mappings.dark.accent_color[mapping]);
        }
        this.dark.neutral = {};
        for(const mapping of ["container_lowest", "container_lower", "container", "container_higher", "container_highest", "on_container", "outline", "shadow"])
            this.dark.neutral[mapping] = this.palette["neutral"](this.lightness_mappings.dark.neutral_color[mapping]);
    }

    /**
     * This function is used to get a tone from a particular color.
     * @param {string} color Can have values "primary", "secondary", "tertiary", and "neutral".
     * @param {number} lightness Can be a value between 0-100.
     * @returns The hexcode of the provided tonal mapping.
     */
    get_tone(color, lightness) {
        return this.palette[color](lightness);
    }
}

/**
 * @class
 * The Arroz con Webo Themer: This is a singleton that keeps track of the palettes added to the website.
 */
export class Themer {
    static _initialized = false;
    static _dark_mode = false;
    static _palette_dictionary = {};
    static _current_theme = undefined;

    static scheme = undefined;

    /**
     * This function is used to initialize the singleton. Essentially a constructor.
     * @param {boolean} default_dark_mode (optional) Specifies whehter to use dark mode by default.
     * @param {Palette} default_palette (optional) Specifies the default palette to use.
     */
    static initialize() {
        if(this._initialized)
            throw new AlreadyInitializedError();


        this._initialized = true;
        // Adding the Arroz Con Webo Palette
        this._palette_dictionary["arroz_con_webo"] = new Theme(new Palette(egg_yellow, broth_brown, kidney_red, tomato_red, rice_pot_gray));
        this._current_theme = "arroz_con_webo";
        this.set_scheme("arroz_con_webo");
    }

    /**
     * This function just toggles if dark mode is being used.
     */
    static toggle_dark_mode() {
        if(!this._initialized)
            this.initialize();
        this.dark_mode = !this.dark_mode;
        this.set_scheme(this._current_theme);
    }

    /**
     * This function adds a new color palette to the Themer.
     * @param {string} name This is the name of the color palette.
     * @param {Palette} palette This is a Palette object.
     */
    static add_palette(name, palette) {
        if(!this._initialized)
            this.initialize();
        this.palette_list[name] = new Theme(palette);
    }

    /**
     * This function adds a new color palette to the Themer as default.
     * @param {Palette} palette This is a Palette object.
     */
    static add_default(palette) {
        this.add_palette("default", palette);
    }

    /**
     * This function sets the color scheme that is active.
     * @param {*} name The name of the theme.
     */
    static set_scheme(name) {
        if(!this._initialized)
            throw new NotInitializedError();

        try {
            this._current_theme = name;
            this.scheme = this._palette_dictionary[name][this.dark_mode? "dark" : "light"];
        } catch {
            throw new NoPaletteFoundError();
        }
    }

    /**
     * This function sets the named theme as the default theme.
     * @param {*} name The name of the theme.
     */
    static set_default(name) {
        if(!this._initialized)
            throw new NotInitializedError();

        try {
            this.palette_dictionary["default"] = this.palette_dictionary[name];
        } catch {
            throw new NoPaletteFoundError();
        }
    }
}
Themer.initialize(); // initializing the Themer.

export const ThemeContext = React.createContext({"Scheme": Themer.scheme, "change_theme": undefined});