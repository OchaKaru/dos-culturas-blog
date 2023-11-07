/**
 * 
 */
// arroz imports
import {AlreadyInitializedError, NotInitializedError, NoPaletteFoundError} from '../error';
import Palette from './color/palette';
import Typography from './typography/typography';
import Theme from './theme';

export {default as Collapse} from './animation/collapse';

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
 * The Arroz con Webo Themer: This is a singleton that keeps track of the palettes added to the website.
 */
export class Styler {
    static _initialized = false;
    static _dark_mode = true;
    static _theme_dictionary = {};
    static _current_theme = undefined;

    static _theme = undefined;

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
        this._theme_dictionary["arroz_con_webo"] = new Theme(
            new Palette(egg_yellow, broth_brown, kidney_red, tomato_red, rice_pot_gray),
            new Typography(1, 'rem')
        );

        this._theme_dictionary["arroz_con_webo"].typography.set_display(
            "Belanosima", 6, "https://fonts.gstatic.com/s/belanosima/v3/3y9n6bI8ejDo_3MfCDSL_Lx0A3Ngnqcd.woff2"
        );
        this._theme_dictionary["arroz_con_webo"].typography.set_headline(
            "Belanosima", 4, "https://fonts.gstatic.com/s/belanosima/v3/3y9n6bI8ejDo_3MfCDSL_Nh1A3Ngnqcd.woff2"
        );
        this._theme_dictionary["arroz_con_webo"].typography.set_title(
            "Josefin Sans", 3, "https://fonts.gstatic.com/s/josefinsans/v32/Qw3JZQNVED7rKGKxtqIqX5EUCGZ2dIn0FyA96fCThoJRIyzoYV0.woff2"
        );
        this._theme_dictionary["arroz_con_webo"].typography.set_subheading(
            "Josefin Sans", 2, "https://fonts.gstatic.com/s/josefinsans/v32/Qw3JZQNVED7rKGKxtqIqX5EUCGZ2dIn0FyA96fCTtIJRIyzoYV0.woff2"
        );
        this._theme_dictionary["arroz_con_webo"].typography.set_body(
            "Lato", 1, "https://fonts.gstatic.com/s/lato/v24/S6u8w4BMUTPHjxsAUi-qJCY.woff2"
        );
        this._theme_dictionary["arroz_con_webo"].typography.set_label(
            "Lato", 1, "https://fonts.gstatic.com/s/lato/v24/S6u8w4BMUTPHjxsAUi-qJCY.woff2"
        );
        this._theme_dictionary["arroz_con_webo"].typography.set_code(
            "Inconsolata", 1, "https://fonts.gstatic.com/s/inconsolata/v32/QldgNThLqRwH-OJ1UHjlKENVzkWGVkL3GZQmAwLYxYWI2qfdm7Lpp4U8WRP2l2eY.woff2"
        );

        this._current_theme = "arroz_con_webo";
        this.set_theme("arroz_con_webo");
    }

    /**
     * This function just toggles if dark mode is being used.
     */
    static toggle_dark_mode() {
        if(!this._initialized)
            this.initialize();
        this._dark_mode = !this._dark_mode;
        this.set_theme(this._current_theme);
    }

    /**
     * This function adds a new color palette to the Themer.
     * @param {string} name This is the name of the color palette.
     * @param {Palette} palette This is a Palette object.
     * @param {Typography} typography This is a Typography object.
     */
    static add_theme(name, palette, typography) {
        if(!this._initialized)
            this.initialize();

        this._palette_dictionary[name] = new Theme(palette, typography);
    }

    /**
     * This function sets the color scheme that is active.
     * @param {*} name The name of the theme.
     */
    static set_theme(name) {
        if(!this._initialized)
            throw new NotInitializedError();

        try {
            this._current_theme = name;
            this._theme = this._theme_dictionary[name];
        } catch {
            throw new NoPaletteFoundError();
        }
    }

    static theme_context() {
        if(!this._initialized)
            this.initialize();

        return {'scheme': this._theme.scheme(this._dark_mode), 'typography': this._theme.typography};
    }
}
Styler.initialize(); // initializing the Themer.

export {default as Palette} from './color/palette';
export {default as Typography} from './typography/typography';