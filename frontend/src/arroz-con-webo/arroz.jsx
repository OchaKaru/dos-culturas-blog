import * as React from 'react';

//arroz imports
import {ThemeContext} from './styles';
import {useCSSClass, useTheme} from './util';
import {ContainerContext} from './components';

/**
 * 
 */
export default function Root({children}) {
    const [scheme, change_theme] = useTheme();

    const [class_name, set_style] = useCSSClass();
    React.useEffect(() => {
        set_style(`
            .${class_name} {
                // container color information
                background-color: ${scheme.neutral.container_lowest};
                color: ${scheme.neutral.on_container};

                // container body information
                height: 100%;
                width: 100%;
            }

            ::-webkit-scrollbar {
                width: 0.5%;
            }

            ::-webkit-scrollbar-track {
                background: none;
            }

            ::-webkit-scrollbar-thumb {
                background: ${scheme.neutral.outline};
                opacity: 20%;
                transition: opacity 200ms ease;
                border-radius: 10vw;
            }

            ::-webkit-scrollbar-thumb:hover {
                opacity: 30%;
            }

            ::-webkit-scrollbar-thumb:active {
                opacity: 40%;
            }
        `);
    }, [class_name, scheme, set_style]);

    return (
        <ThemeContext.Provider value={{"Scheme": scheme, "change_theme": change_theme}}>
            <ContainerContext.Provider value={{"role": "neutral", "container_type": "container_lowest"}}>
                <div className={class_name}>
                    {children}
                </div>
            </ContainerContext.Provider>
        </ThemeContext.Provider>

    );
}