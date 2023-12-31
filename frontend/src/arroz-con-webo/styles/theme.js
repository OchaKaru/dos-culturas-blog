/**
 * @author Kalvin Garcia
 * 
 * I wanted to create a dynamic theme for the Arroz con Webo library, but there wasn't a way to natively
 * do that with React. I decided to opt for a CSS and JavaScript hybrid that could instead infrom
 *  the components. Essentially, letting them be
 * dynamically themed by giving SCSS's prettier variables the values of CSS's uglier cousins.
 */

/**
 * @class
 * This class is an internal theming class that converts Palette objects into the tonal mappings
 * for a given theme with 2 schemes: light and dark.
 */
export default class Theme {
    // The lightness mappings of the tonal dynamic colors.
    lightness_mappings = {
        "light": {
            "accent_color": {
                "accent": 30, "on_accent": 90, "container": 80, "on_container": 10,
            },
            "neutral_color": {
                "container_lowest": 90, "container_lower": 88, "container": 86, "container_higher": 84, "container_highest": 80, 
                "on_container": 10, "outline": 50, "shadow": 30,
            },
        },
        "dark": {
            "accent_color": {
                "accent": 80, "on_accent": 20, "container": 30, "on_container": 90,
            },
            "neutral_color": {
                "container_lowest": 10, "container_lower": 14, "container": 16, "container_higher": 18, "container_highest": 20,
                "on_container": 90, "outline": 60, "shadow": 0,
            },
        }
    }

    /**
     * This constructor just takes a Palette and converts it to a theme using dark JS magic.
     * @param {Palette} palette
     * @param {Typography} typography
     */
    constructor(palette, typography) {
        this.palette = palette;
        this.typography = typography;

        // Today I have performed acts that the C++ gods would look down upon...
        this.light = {}
        for(const color of ["primary", "secondary", "tertiary", "error"]) {
            this.light[color] = {}
            for(const mapping of ["accent", "on_accent", "container", "on_container"])
                this.light[color][mapping] = this.palette[color](this.lightness_mappings.light.accent_color[mapping]); // I have called a member function using map syntax...
        }
        this.light.neutral = {};
        for(const mapping of ["container_lowest", "container_lower", "container", "container_higher", "container_highest", "on_container", "outline", "shadow"])
            this.light.neutral[mapping] = this.palette.neutral(this.lightness_mappings.light.neutral_color[mapping]);

        this.light.neutral.code = {
            "string": this.palette.secondary(40),
            "keyword": this.palette.primary(40),
            "comment": this.palette.tertiary(70),
            "type": this.palette.secondary(40),
            "literal": this.palette.tertiary(40),
            "punctuation": this.palette.tertiary(10),
            "plaintext": this.palette.tertiary(10),
            "tag": this.palette.primary(40),
            "attribute_name": this.palette.secondary(30),
            "attribute_value": this.palette.secondary(20),
            "decimal": this.palette.secondary(40),
            "line_numbers": this.palette.tertiary(10)
        }

        this.dark = {}
        for(const color of ["primary", "secondary", "tertiary", "error"]) {
            this.dark[color] = {}
            for(const mapping of ["accent", "on_accent", "container", "on_container"])
                this.dark[color][mapping] = this.palette[color](this.lightness_mappings.dark.accent_color[mapping]);
        }
        this.dark.neutral = {};
        for(const mapping of ["container_lowest", "container_lower", "container", "container_higher", "container_highest", "on_container", "outline", "shadow"])
            this.dark.neutral[mapping] = this.palette.neutral(this.lightness_mappings.dark.neutral_color[mapping]);

        this.dark.neutral.code = {
            "string": this.palette.secondary(70),
            "keyword": this.palette.primary(60),
            "comment": this.palette.tertiary(40),
            "type": this.palette.primary(60),
            "literal": this.palette.secondary(70),
            "punctuation": this.palette.tertiary(90),
            "plaintext": this.palette.tertiary(90),
            "tag": this.palette.primary(60),
            "attribute_name": this.palette.secondary(70),
            "attribute_value": this.palette.secondary(80),
            "decimal": this.palette.secondary(60),
            "line_numbers": this.palette.tertiary(90)
        }
    }

    /**
     * 
     */
    scheme(dark_mode) {
        return this[dark_mode? "dark" : "light"];
    }
}