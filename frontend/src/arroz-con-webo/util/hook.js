import {useState, useEffect} from 'react';

function get_window_dimensions() {
    const {innerWidth: width, innerHeight: height} = window;
    return {width, height};
}

/**
 * Creating a custom hook
 */
export function useWindowDimensions() {
    const [dimensions, set_dimensions] = useState(get_window_dimensions());

    useEffect(() => {
        const handle_resize = () => set_dimensions(get_window_dimensions());

        window.addEventListener('resize', handle_resize);
        return () => window.removeEventListener('resize', handle_resize);
    }, []);

    return dimensions;
}