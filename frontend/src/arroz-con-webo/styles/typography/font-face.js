/**
 * 
 */
export default class FontFace {
    constructor(font_name, font_size, source) {
        this._font_name = font_name;
        this._font_size = font_size;

        document.classList.add('fonts-loading');
        (new FontFace(this._font_name, source)).load().then(() => {
            document.classList.remove('fonts-loading');
            document.classList.add('fonts-loaded');
        }).catch(() => {
            document.classList.remove('fonts-loading');
            document.classList.add('fonts-failed');
        });
    }

    font_rule(weight, style) {
        return `${style?? ""} ${weight} ${this._font_size} ${this._font_name}`;
    }
}