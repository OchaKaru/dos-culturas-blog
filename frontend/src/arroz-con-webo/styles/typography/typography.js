import FontFace from './font-face';
/**
 * 
 */
export default class Typography {
    _font_size;
    _unit;

    _display_font;
    _headline_font;
    _title_font;
    _heading_font;
    _body_font;
    _label_font;
    _code_font;

    constructor(font_size, unit) {
        this._font_size = font_size;
        this._unit = unit;
    }

    calculate(scale) {
        return `${scale * this._font_size}${this._unit}`;
    }

    display(weight = 400, style = undefined) {
        return this._display_font.font_rule(weight, style);
    }

    set_display(font_name, scale, source) {
        this._display_font = FontFace(font_name, this.calculate(scale), source);
    }

    headline(weight = 400, style = undefined) {
        return this._display_font.font_rule(weight, style);
    }

    set_headline(font_name, scale, source) {
        this._headline_font = FontFace(font_name, this.calculate(scale), source);
    }

    title(weight = 400, style = undefined) {
        return this._display_font.font_rule(weight, style);
    }

    set_title(font_name, scale, source) {
        this._title_font = FontFace(font_name, this.calculate(scale), source);
    }

    heading(weight = 400, style = undefined) {
        return this._display_font.font_rule(weight, style);
    }

    set_heading(font_name, scale, source) {
        this._heading_font = FontFace(font_name, this.calculate(scale), source);
    }

    body(weight = 400, style = undefined) {
        return this._display_font.font_rule(weight, style);
    }

    set_body(font_name, scale, source) {
        this._body_font = FontFace(font_name, this.calculate(scale), source);
    }

    label(weight = 400, style = undefined) {
        return this._display_font.font_rule(weight, style);
    }

    set_label(font_name, scale, source) {
        this._label_font = FontFace(font_name, this.calculate(scale), source);
    }

    code(weight = 400, style = undefined) {
        return this._display_font.font_rule(weight, style);
    }

    set_code(font_name, scale, source) {
        this._code_font = FontFace(font_name, this.calculate(scale), source, weights);
    }
}