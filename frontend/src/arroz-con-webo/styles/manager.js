// arroz imports

/**
 * @class
 * This is a singleton class that acts as a map and manager for the style sheets that Arroz con Webo uses.
 * The main goal of this StyleManager is to wrap the document.adoptedStyleSheets and CSSStyleSheet API into
 * a managable and consumable API for Arroz to use and have access to.
 * 
 * The global style sheet can always be modified by using the "global" key. It features the basic rules to
 * make the html and body fit the screen without any weird edges or scrolling outside of the x-axis.
 */
export default class StyleManager {
    static _style_sheets = {};

    /**
     * 
     */
    static initialize() {
        let global = new CSSStyleSheet();
        global.replaceSync(`html, body {
            height: 100%;
            width: 100%;
            margin: 0;
            padding: 0;
            overflow-x: hidden;
            user-select: none;
        }`);
        
        this._style_sheets["arroz-global"] = document.adoptedStyleSheets.length;
        document.adoptedStyleSheets.push(global);      
    }

    /**
     * 
     * @param {string} name This is the name and key that will be used for the sheet.
     */
    static exists(name) {
        return this._style_sheets.key().includes(name);
    }

    /**
     * This function adds a <key, value> pair to the Manager
     * @param {string} name This is the name and key that will be used for the sheet.
     * @param {} sheet_text This is CSSStyleSheet that will be used for the value and document.
     */
    static add_style_sheet(name, sheet_text) {
        if(this.exists(name))
            throw new StyleSheetExistsError();

        let style_sheet = new CSSStyleSheet();
        style_sheet.replaceSync(sheet_text);

        this._style_sheets[name] = document.adoptedStyleSheets.length;
        document.adoptedStyleSheets.push(style_sheet);
    }

    /**
     * This function modifies a <key, value> pair in the Manager
     * @param {string} name This is the name and key that will be used for the sheet.
     * @param {} sheet_text This is CSSStyleSheet that will be used for the value and document.
     */
        static modify_style_sheet(name, sheet_text) {
            if(!this.exists(name))
                throw new NoStyleSheetExistsError();

            document.adoptedStyleSheets[this._style_sheets[name]].replaceSync(sheet_text);
        }


    /**
     * This function removes the specified style sheet from the document
     * @param {string} name 
     */
    static remove_style_sheet(name) {
        const index_removed = this._style_sheets[name];
        delete this._style_sheets[name]; // deletes the key from the object
        document.adoptedStyleSheets.splice(index_removed, 1); // removes the value from the adaoptedSheets array

        // re-adjust all the indices from the object keys
        for(const key of this._style_sheets.keys())
            if(this._style_sheets[key] > index_removed)
                this._style_sheets[key]--;
    }
}
StyleManager.initialize();