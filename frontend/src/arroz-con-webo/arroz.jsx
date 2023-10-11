import * as React from 'react';

//arroz imports
import {Manager, Scheme} from './styles';

export default function Root(props) {
    React.useEffect(() => {
        Manager.style_sheet("root", `
            .arroz-root {
                // container color information
                background-color: ${Scheme.neutral.container_lowest};
                color: ${Scheme.neutral.on_container};

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
                background: ${Scheme.neutral.outline};
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
    }, [Scheme])

    return (
        <SurfaceContext.Provider value="container-lowest">
            <div className='.arroz-root'>
                {props.children}
            </div>
        </SurfaceContext.Provider>
    );
}