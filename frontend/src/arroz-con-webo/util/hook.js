import * as React from 'react';

// arroz import
import {Styler} from '../styles';

function get_window_dimensions() {
    const {innerWidth: width, innerHeight: height} = window;
    return {width, height};
}

/**
 * Creating a custom hook
 */
export function useWindowDimensions() {
    const [dimensions, set_dimensions] = React.useState(get_window_dimensions());

    React.useEffect(() => {
        const handle_resize = () => set_dimensions(get_window_dimensions());

        window.addEventListener('resize', handle_resize);
        return () => window.removeEventListener('resize', handle_resize);
    }, []);

    return dimensions;
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

    return [theme_context, change_theme]
}