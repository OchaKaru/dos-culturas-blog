import * as React from 'react';

// arroz import
import {Manager, Themer} from '../styles';

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

function generate_class_name(length) {
    if(length <= 0)
        return "";

    let random_CSS_class = Math.random().toString(36).substr(2, length);
    random_CSS_class += generate_class_name(length - random_CSS_class.length);

    return random_CSS_class;
}

/**
 * 
 */
export function useCSSClass() {
    const [class_name, set_class_name] = React.useState();
    const CLASS_NAME_LENGTH = 10; // The size of the class name

    React.useMemo(() => {
        do {
            set_class_name("arroz-" + generate_class_name(CLASS_NAME_LENGTH));
        } while(Manager.exists(class_name));
    }, [])
    
    const set_style = React.useCallback(sheet_text => {
        Manager.modify_style_sheet(class_name, sheet_text);
    }, [class_name])

    React.useEffect(() => {
        Manager.add_style_sheet(class_name, "");
    }, [])
    return [class_name, set_style];
}

export function useTheme() {
    const [scheme, set_scheme] = React.useState(Themer.scheme);

    const change_theme = React.useCallback(theme_name => {
        Themer.set_scheme(theme_name);
        set_scheme(Themer.scheme);
    }, [])

    return [scheme, change_theme]
}