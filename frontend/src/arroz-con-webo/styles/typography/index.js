import './fonts.scss'
/**
 * 
 */


/**
 * 
 */
export default class Typography {
    // Font weights which are standarized
    static weigths = {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
    }

    static _display_font = "'Belanosima', sans-serif";
    static _headline_font = "'Belanosima', sans-serif";
    static _title_font = "'Josefin Sans', sans-serif";
    static _heading_font = "'Josefin Sans', sans-serif";
    static _body_font = "'Lato', sans-serif";
    static _label_font = "'Lato', sans-serif";
    static _code_font = "'Inconsolata', monospace";

    //
    static font_size;
    static unit;

    static display_size;
    static headline_size;
    static title_size;
    static heading_size;
    static body_size;
    static label_size;
    static code_size;

    /**
     * @param {number} font_size
     */
    static initialize() {
        this.set_font_size(1, "rem");
    }

    /**
     * 
     * @param {number} font_size Specifies the numerical value of the font size.
     * @param {string} unit (optional) This specifies the unit for the font size. Defaults to 'px'.
     */
    static set_font_size(font_size, unit = "px") {
        this.font_size = font_size;
        this.unit = unit;

        this.display_size = 6 * font_size;
        this.headline_size = 4 * font_size;
        this.title_size = 3 * font_size;
        this.heading_size = 2 * font_size;
        this.body_size = font_size;
        this.label_size = font_size;
        this.code_size = font_size;
    }

    /**
     * 
     * @param {string} font_family
     */
    static display_font(font_family = undefined) {
        if(font_family)
            this._display_font = font_family;

        return this._display_font;
    }

    /**
     * 
     * @param {string} font_family 
     */
    static headline_font(font_family = undefined) {
        if(font_family)
            this._headline_font = font_family;

        return this._headline_font;
    }

    /**
     * 
     * @param {string} font_family 
     */
    static title_font(font_family = undefined) {
        if(font_family)
            this._title_font = font_family;

        return this._title_font;
    }

    /**
     * 
     * @param {string} font_family 
     */
    static heading_font(font_family = undefined) {
        if(font_family)
            this._heading_font = font_family;

        return this._heading_font;
    }

    /**
     * 
     * @param {string} font_family 
     */
    static body_font(font_family = undefined) {
        if(font_family)
            this._body_font = font_family;

        return this._body_font;
    }

    /**
     * 
     * @param {string} font_family 
     */
    static label_font(font_family = undefined) {
        if(font_family)
            this._label_font = font_family;

        return this._label_font;
    }

    /**
     * 
     * @param {string} font_family 
     */
    static code_font(font_family = undefined) {
        if(font_family)
            this._code_font = font_family;

        return this._code_font;
    }
}