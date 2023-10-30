import * as React from 'react';
import {createUseStyles} from 'react-jss';

import Label from '../content/label';

const useStyles = createUseStyles(({theme}) => ({
    'arroz-filled-textbox': {
        position: 'relative',
        boxSizing: 'border-box',
        cursor: 'text',
        borderRadius: ({rounded}) => {
            return `${theme.typography.calculate(rounded? 0.7 : 0.1)} ${theme.typography.calculate(rounded? 0.7 : 0.1)} ${theme.typography.calculate(0.1)} ${theme.typography.calculate(0.1)}`
        },
        backgroundColor: theme.scheme.neutral.container_highest,
        margin: theme.typography.calculate(1),
        paddingLeft: theme.typography.calculate(0.3),
        paddingRight: theme.typography.calculate(0.3),
        paddingTop: theme.typography.calculate(0.7),
        overflow: 'hidden',
        "&::before": {
            content: '""',
            position: 'absolute',
            inset: 0,
            borderBottom: `${theme.typography.calculate(0.1)} solid ${theme.scheme.neutral.outline}`,
            transition: ({ANIMATION_DURATION}) => `background-color ${ANIMATION_DURATION}ms ease`
        },
        "&:hover::before": {
            backgroundColor: theme.scheme.neutral.on_container + "0C",
            borderBottom: `${theme.typography.calculate(0.15)} solid ${theme.scheme.neutral.outline}`
        },
        "&::after": {
            content: '""',
            position: 'absolute',
            inset: 0,
            transformOrigin: `bottom`,
            transform: ({focused}) => `scale(${focused? 1 : 0})`,
            opacity: ({focused}) => focused? '100%' : 0,
            transition: ({ANIMATION_DURATION}) => `transform ${ANIMATION_DURATION}ms ease, opacity ${ANIMATION_DURATION}ms ease`,
            borderBottom: ({role}) => `${theme.typography.calculate(0.2)} solid ${theme.scheme[role].accent}`
        },
        '& .arroz-textbox': {
            outline: 'none',
            border: 'none',
            position: 'relative',
            zIndex: '1000 !important',
            backgroundColor: 'transparent',
            margin: theme.typography.calculate(0.5),
            font: theme.typography.label(),
            color: theme.scheme.neutral.on_container
        },
        '& .arroz-floating-label': {
            position: 'absolute',
            left: 0,
            top: "50%",
            color: ({role, focused, filled}) => focused || filled? theme.scheme[role].accent : theme.scheme.neutral.on_container,
            transformOrigin: "left top",
            transform: ({focused, filled}) => `translateY(${focused || filled? "-70%" : "-50%"}) scale(${focused || filled ? 0.8 : 1})`,
            opacity: ({focused, filled}) => focused || filled? "100%" : "60%",
            transition: ({ANIMATION_DURATION}) => `transform ${ANIMATION_DURATION}ms ease, opacity ${ANIMATION_DURATION}ms ease, color ${ANIMATION_DURATION}ms ease`
        },
        '& .arroz-example-label': {
            position: 'absolute',
            left: 0,
            top: "25%",
            color: theme.scheme.neutral.on_container,
            transformOrigin: "left top",
            opacity: ({focused, filled, example}) => focused && !filled && example? "60%" : 0,
        },
        '& .arroz-ripple': {
            position: "absolute",
            borderRadius: "50%",
            transform: "scale(0)",
            animation: ({ANIMATION_DURATION}) => `$ripple ${2 * ANIMATION_DURATION}ms linear`,
            backgroundColor: theme.scheme.neutral.on_container,
            opacity: "20%",
        }
    },
    "@keyframes ripple": {
        "to": {
            transform: "scale(4)",
            opacity: 0
        }
    }
}));

export default function FilledTextBox({className, label, role = 'primary', rounded, required = true, onTextChange, children, ...other}) {
    const [focused, set_focused] = React.useState(false);
    const [filled, set_filled] = React.useState(false);
    const [example, set_example] = React.useState(false);

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
        const target = event.currentTarget;
        const target_hitbox = target.getBoundingClientRect();
        const circle = document.createElement("span");
        const radius = target_hitbox.width > target_hitbox.height? target_hitbox.width / 2 : target_hitbox.height / 2;
        circle.style.width = circle.style.height = `${radius * 2}px`;
        circle.style.left = `${event.clientX - target_hitbox.left - radius}px`;
        circle.style.top = `${event.clientY - target_hitbox.top - radius}px`;
        circle.classList.add(`arroz-ripple`);

        const ripple = target.getElementsByClassName(`arroz-ripple`)[0];
        if(ripple)
            ripple.remove();
        target.appendChild(circle);

        const textbox = target.getElementsByClassName(`arroz-textbox`)[0];
        textbox.focus();
    };

    const ANIMATION_DURATION = 300;
    const classes = useStyles({role, rounded, focused, filled, example, ANIMATION_DURATION});
    return (
        <div className={`${classes['arroz-filled-textbox']} ${className?? ""}`} onClick={handle_click}>
            <label htmlFor={label}>
                <Label className='arroz-floating-label'>{label}</Label>
                <Label className='arroz-example-label'>{children}</Label>
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