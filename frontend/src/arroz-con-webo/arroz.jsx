import * as React from 'react';
import {createUseStyles, ThemeProvider} from 'react-jss';

//arroz imports
import {useChangeTheme} from './util';
import {ContainerContext} from './components';

const useStyles = createUseStyles({
    "arroz-root": {
        backgroundColor: ({theme, role, container_type}) => theme.scheme[role][container_type],
        color: ({theme, role}) => theme.scheme[role].on_container,
        height: "100%",
        width: "100%",
        "&::-webkit-scrollbar": {
            width: "0.5vw"
        },
        "&::-webkit-scrollbar-track": {
            background: "none"
        },
        "&::-webkit-scrollbar-thumb": {
            background: ({theme}) => theme.scheme.neutral.outline,
            opacity: "20%",
            transition: "opacity 200ms ease",
            borderRadius: "1vw"
        },
        "&::-webkit-scrollbar-thumb:hover": {
            opacity: "30%"
        },
        "&::-webkit-scrollbar-thumb:active": {
            opacity: "40%"
        }
    }
});

/**
 * 
 */
export default function Root({children}) {
    const role = "neutral";
    const container_type = "container_lowest";

    const [theme_context, change_theme] = useChangeTheme();

    const classes = useStyles({"theme": theme_context, "role": role, "container_type": container_type})
    return (
        <ThemeProvider theme={{"theme": theme_context, "change_theme": change_theme}}>
            <ContainerContext.Provider value={{"role": role, "container_type": container_type}}>
                <div className={classes['arroz-root']}>
                    {children}
                </div>
            </ContainerContext.Provider>
        </ThemeProvider>
    );
}