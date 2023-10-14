/**
 * @author Kalvin Garcia
 * 
 * I wanted to create a dynamic theme for the Arroz con Webo library, but there wasn't a way to natively
 * do that with React. I decided to opt for a CSS and JavaScript hybrid that could instead infrom
 *  the components. Essentially, letting them be
 * dynamically themed by giving SCSS's prettier variables the values of CSS's uglier cousins.
 */

export {
    default as Color, 
    hex_to_rgb,
    hsl_to_rgb,
    rgb_to_hex,
    rgb_to_hsl,
} from './color';

export {
    default as Palette,
} from './palette';

export {
    ThemeContext,
    Themer,
} from './themer';