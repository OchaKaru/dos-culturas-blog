/**
 * 
 */
export default class Font {
    constructor(font_name, font_size, source) {
        this._font_name = font_name;
        this._font_size = font_size;

        //this.load_font(source);
    }

    // async load_font(source) {
    //     const font = new FontFace(this._font_name, `url(${source})`);
    //     document.fonts.add(font);
    //     console.log(`${this._font_name}: ${font.status}`);
    //     await font.load().then(() => {
    //         console.log(`${this._font_name}: ${font.status}`);
    //     }).catch(() => {
    //         // document.classList.remove('fonts-loading');
    //         // document.classList.add('fonts-failed');
    //     });
    // }

    font_rule(weight, style) {
        return `${style?? ""} ${weight} ${this._font_size} '${this._font_name}'`;
    }
}