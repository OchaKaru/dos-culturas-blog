import * as React from 'react';

// arroz import
import {Manager} from '../styles';

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

function generate_class_name() {
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

    React.useEffect(() => {
        do {
            set_class_name("arroz-" + generate_class_name(CLASS_NAME_LENGTH));
        } while(Manager.exists(class_name));
        Manager.add_style_sheet(class_name, sheet_text);
    }, [])

    const set_style = React.useCallback(sheet_text => {
        Manager.modify_style_sheet(class_name, sheet_text);
    }, [])

    return [class_name, set_style];
}