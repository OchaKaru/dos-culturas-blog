import * as React from 'react';
import {createUseStyles, ThemeProvider} from 'react-jss';

//arroz imports
import {useChangeTheme, useToggleDarkMode} from './util';
import {ContainerContext} from './components';

const useStyles = createUseStyles({
    "arroz-root": {
        backgroundColor: ({theme, role, container_type}) => theme.scheme[role][container_type],
        color: ({theme, role}) => theme.scheme[role].on_container,
        height: "100vh",
        width: "100vw",
        overflowX: "hidden",
        overflowY: "auto",
        "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            width: ({theme}) => theme.typography.calculate(0.5)
        },
        "&::-webkit-scrollbar-track, & *::-webkit-scrollbar-track": {
            background: "none"
        },
        "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            background: ({theme}) => theme.scheme.neutral.outline,
            opacity: "20%",
            transition: "opacity 200ms ease",
            borderRadius: ({theme}) => theme.typography.calculate(1),
            "&:hover": {
                opacity: "30%"
            },
            "&:active": {
                opacity: "40%"
            }
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
    const [dark_mode, toggle_dark_mode] = useToggleDarkMode();

    const [theme, set_theme] = React.useState({
        "theme": theme_context, 
        "change_theme": change_theme, 
        "dark_mode": dark_mode, 
        "toggle_dark_mode": toggle_dark_mode
    });

    const handle_toggle = () => {
        toggle_dark_mode()
    }

    React.useEffect(() => {
        console.log(dark_mode)
        set_theme({
            "theme": theme_context,
            "dark_mode": dark_mode
        })
    }, [theme_context, dark_mode])

    const classes = useStyles({"theme": theme_context, "role": role, "container_type": container_type})
    return (
        <ThemeProvider theme={{...theme}}>
            <ContainerContext.Provider value={{"role": role, "container_type": container_type}}>
                <div className={classes['arroz-root']}>
                    {children}
                </div>
            </ContainerContext.Provider>
        </ThemeProvider>
    );
}