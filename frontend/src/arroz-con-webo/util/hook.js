import * as React from 'react';

// arroz import
import {Styler} from '../styles';
import {on_client} from './auxiliary';

function get_window_dimensions() {
    const {innerWidth: width, innerHeight: height} = window;
    return {width, height};
}

/**
 * Creating a custom hook
 */
export function useWindowDimensions() {
    const [dimensions, set_dimensions] = React.useState(on_client(get_window_dimensions));

    React.useEffect(() => {
        const handle_resize = () => set_dimensions(on_client(get_window_dimensions));

        on_client(() => window.addEventListener('resize', handle_resize));
        return on_client(() => () => window.removeEventListener('resize', handle_resize));
    }, []);

    return dimensions?? {width: 0, height: 0};
}

/**
 * 
 * @returns 
 */
export function useChangeTheme() {
    const [theme_context, set_theme_context] = React.useState(Styler.theme_context());

    const change_theme = React.useCallback(theme_name => {
        Styler.set_theme(theme_name);
        set_theme_context(Styler.theme_context());
    }, [])

    return [theme_context, change_theme];
}

export function useToggleDarkMode() {
    const [dark_mode, set_dark_mode] = React.useState(Styler._dark_mode);

    const toggle_dark_mode = React.useCallback(() => {
        Styler.toggle_dark_mode();
        set_dark_mode(Styler._dark_mode);
    }, [])

    return [dark_mode, toggle_dark_mode];
}