import * as React from 'react';
import {createUseStyles} from 'react-jss';

import Label from '../content/label';
import { ContainerContext } from '../containment/container-context';

const useStyles = createUseStyles(({theme, role, }) => ({
    'arroz-outlined-textbox': {
        position: 'relative',
        boxSizing: 'border-box',
        cursor: 'text',
        margin: theme.typography.calculate(1),
        paddingLeft: theme.typography.calculate(0.3),
        paddingRight: theme.typography.calculate(0.3),
        overflow: 'visible',
        "&::before": {
            content: '""',
            position: 'absolute',
            inset: 0
        },
        '& .arroz-textbox': {
            outline: 'none',
            border: 'none',
            position: 'relative',
            zIndex: '1000 !important',
            backgroundColor: 'transparent',
            margin: theme.typography.calculate(0.5),
            font: theme.typography.label(),
            color: ({context}) => theme.scheme[context.role].on_container
        },
        '& .arroz-notched-outline': {
            position: 'absolute',
            boxSizing: 'border-box',
            display: "flex",
            flexDirection: "row",
            inset: 0,
            width: "100%",
            height: "100%",
            alignItems: "center",
            '& .arroz-outline-leading': {
                boxSizing: 'border-box',
                height: "100%",
                width: theme.typography.calculate(1),
                borderLeft: ({context, focused}) => `${theme.typography.calculate(focused? 0.15 : 0.1)} solid ${theme.scheme[context.role][context.role === "neutral"? "outline" : "accent"]}`,
                borderTop: ({context, focused}) => `${theme.typography.calculate(focused? 0.15 : 0.1)} solid ${theme.scheme[context.role][context.role === "neutral"? "outline" : "accent"]}`,
                borderBottom: ({context, focused}) => `${theme.typography.calculate(focused? 0.15 : 0.1)} solid ${theme.scheme[context.role][context.role === "neutral"? "outline" : "accent"]}`,
                borderTopLeftRadius: ({rounded}) => `${theme.typography.calculate(rounded? 0.7 : 0.1)}`,
                borderBottomLeftRadius: ({rounded}) => `${theme.typography.calculate(rounded? 0.7 : 0.1)}`
            },
            '& .arroz-outline-notch': {
                boxSizing: 'border-box',
                height: "100%",
                width: "fit-content", //({focused, LABEL_LENGTH}) => theme.typography.calculate(focused?  0.8 * LABEL_LENGTH / 2  :  LABEL_LENGTH / 2),
                borderTop: ({context, focused, filled}) => {
                    return focused || filled? "none" : `${theme.typography.calculate(0.1)} solid ${theme.scheme[context.role][context.role === "neutral"? "outline" : "accent"]}`;
                },
                borderBottom: ({context, focused}) => `${theme.typography.calculate(focused? 0.15 : 0.1)} solid ${theme.scheme[context.role][context.role === "neutral"? "outline" : "accent"]}`,
                '& .arroz-floating-label': {
                    position: 'relative',
                    top: "50%",
                    left: 0,
                    display: "inline-block",
                    color: ({context, focused, filled}) => focused || filled? theme.scheme[context.role][context.role === "neutral"? "outline" : "accent"] : theme.scheme[context.role].on_container,
                    transformOrigin: "left top",
                    transform: ({focused, filled}) => `translate(${focused || filled? "10%" : "0%"}, ${focused || filled ? "-85%" : "-50%"}) scale(${focused || filled? 0.8 : 1})`,
                    opacity: ({focused, filled}) => focused || filled? "100%" : "60%",
                    transition: ({ANIMATION_DURATION}) => `transform ${ANIMATION_DURATION}ms ease, opacity ${ANIMATION_DURATION}ms ease, color ${ANIMATION_DURATION}ms ease`,
                    overflow: "visible",
                    paddingLeft: 0,
                    paddingRight: 0,
                },
            },
            '& .arroz-outline-trailing': {
                boxSizing: 'border-box',
                height: "100%",
                flexGrow: 1,
                borderRight: ({context, focused}) => `${theme.typography.calculate(focused? 0.15 : 0.1)} solid ${theme.scheme[context.role][context.role === "neutral"? "outline" : "accent"]}`,
                borderTop: ({context, focused}) => `${theme.typography.calculate(focused? 0.15 : 0.1)} solid ${theme.scheme[context.role][context.role === "neutral"? "outline" : "accent"]}`,
                borderBottom: ({context, focused}) => `${theme.typography.calculate(focused? 0.15 : 0.1)} solid ${theme.scheme[context.role][context.role === "neutral"? "outline" : "accent"]}`,
                borderTopRightRadius: ({rounded}) => `${theme.typography.calculate(rounded? 0.7 : 0.1)}`,
                borderBottomRightRadius: ({rounded}) => `${theme.typography.calculate(rounded? 0.7 : 0.1)}`
            }
        },
        '& .arroz-example-label': {
            position: 'absolute',
            left: 0,
            top: "5%",
            color: ({context}) => theme.scheme[context.role].on_container,
            transformOrigin: "left top",
            opacity: ({focused, filled, example}) => focused && !filled && example? "60%" : 0,
        },
    }
}));

export default function OutlinedTextBox({className, label, rounded, onTextChange, children}) {
    const [focused, set_focused] = React.useState(false);
    const [filled, set_filled] = React.useState(false);
    const [example, set_example] = React.useState(false);

    const context = React.useContext(ContainerContext);
    
    React.useEffect(() => {
        const isEmpty = str => !str || !str.trim().length;

        document.getElementById(label).addEventListener("input", function() {
            if(isEmpty(this.value))
                set_filled(false);
            else
                set_filled(true);

            if(onTextChange)
                onTextChange(filled);
        });

        if(children)
            set_example(true);
    }, []);

    const handle_click = event => {
        event.stopPropagation();
        const textbox = event.currentTarget.getElementsByClassName(`arroz-textbox`)[0];
        textbox.focus();
    }

    const ANIMATION_DURATION = 300;
    const classes = useStyles({context, rounded, focused, filled, example, ANIMATION_DURATION});
    return (
        <div className={`${classes['arroz-outlined-textbox']} ${className?? ""}`} onClick={handle_click}>
            <div className='arroz-notched-outline'>
                <div className='arroz-outline-leading' />
                <div className='arroz-outline-notch'>
                    <Label className="arroz-floating-label">{label}</Label>
                </div>
                <div className='arroz-outline-trailing' />
            </div>
            <Label className='arroz-example-label'>{children}</Label>
            <label htmlFor={label}>
                <input 
                    className='arroz-textbox'
                    id={label}
                    type="text"
                    name={label}
                    onFocus={() => set_focused(true)}
                    onBlur={() => set_focused(false)}
                />
            </label>
        </div>
    );
}