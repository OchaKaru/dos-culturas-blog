import * as React from 'react';
import {createUseStyles} from 'react-jss';

// arroz imports
import {InvalidRoleError, NoNameError} from '../../error';
import {ContainerContext, valid_role} from '../containment/container-context';
import Label from '../content/label';

const useStyles = createUseStyles(({theme}) => ({
    "arroz-checkbox": {
        display: "flex",
        alignItems: "center"
    },
    "arroz-checkbox-box": {
        position: "relative",
        padding: `${theme.typography.calculate(0.5)}`,
        borderRadius: "50%",
        cursor: "pointer",
        overflow: "hidden",
        "&::before": {
            content: '""',
            backgroundColor: ({context}) => `${theme.scheme[context.role].on_container}`,
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            opacity: 0,
            transition: ({ANIMATION_DURATION}) => `opacity ${ANIMATION_DURATION}ms ease`,
        },
        "&:hover::before": {
            opacity: "10%"
        },
        "&:active::before": {
            opacity: ({ripple}) => ripple? "0%": "20%"
        },
        "& input[type='checkbox']": {
            appearance: "none",
            verticalAlign: "middle",
            position: "relative",
            width: `${theme.typography.calculate(1)}`,
            height: `${theme.typography.calculate(1)}`,
            background: "transparent",
            border: ({context}) => `${theme.typography.calculate(0.2)} solid ${theme.scheme[context.role].on_container}`,
            borderRadius: `${theme.typography.calculate(0.1)}`,
            cursor: "pointer",
            transition: ({ANIMATION_DURATION}) => `border ${ANIMATION_DURATION}ms ease-out`
        },
        "& input[type='checkbox']:checked": {
            border: ({role}) => `${theme.typography.calculate(0.5)} solid ${theme.scheme[role].accent}`,
            animation: ({ANIMATION_DURATION}) => `$shrink-bounce ${ANIMATION_DURATION}ms ease-out`,
            "&::before": {
                content: '""',
                position: "absolute",
                top: `${theme.typography.calculate(-0.125)}`,
                left: `${theme.typography.calculate(-0.375)}`,
                borderRight: `${theme.typography.calculate(0.2)} solid transparent`,
                borderBottom: `${theme.typography.calculate(0.2)} solid transparent`,
                transform: `rotate(45deg)`,
                transformOrigin: "0% 100%",
                animation: ({ANIMATION_DURATION}) => `$checkbox-check ${ANIMATION_DURATION / 2}ms ${ANIMATION_DURATION}ms ease forwards`
            }
        }
    },
    "@keyframes shrink-bounce": {
        "0%": {
            transform: `scale(1)`
        },
        "33%": {    
            transform: `scale(.85)`
        },
        "100%": {
            transform: `scale(1)`   
        }
    },
    "@keyframes checkbox-check": {
        "0%": {
            width: 0,
            height: 0,
            borderColor: ({role}) => `${theme.scheme[role].on_accent}`,
            transform: "translate(0, 0) rotate(45deg)",
        },
        "33%": {
            width: `${theme.typography.calculate(0.2)}`,
            height: 0,
            transform: "translate(0, 0) rotate(45deg)"
        },
        "100%": {    
            width: `${theme.typography.calculate(0.2)}`,
            height: `${theme.typography.calculate(0.5)}`,
            borderColor: ({role}) => `${theme.scheme[role].on_accent}`,
            transform: `translate(0, ${theme.typography.calculate(-0.5)}) rotate(45deg)`
        }
    }
}));

/**
 * This is the Arroz Con Webo Checkbox: It should be used when a user can select multiple items in a list.
 * 
 * @param {string} label (required)
 * @param {string} role (optional)
 * @param {boolean} defaultChecked (optional) This sets the default behavior of the checkbox.
 * @param {boolean} ripple (optional)
 * @param {function} onToggle (optional) The callback that is called when the checkbox changes.
 */
function Checkbox({className, label, role = "primary", defaultChecked, ripple, onToggle}) {
    if(!label)
        throw new NoNameError();

    if(role && !valid_role(role))
        throw new InvalidRoleError({"code": "Invalid props.role value.", "value": role});

    const context = React.useContext(ContainerContext);

    const ANIMATION_DURATION = 200;

    const [checked, set_checked] = React.useState(defaultChecked? true : false);
    
    const classes = useStyles({context, role, ripple, ANIMATION_DURATION})
    return (
        <label htmlFor={label} className={`${classes['arroz-checkbox']} ${className?? ""}`}>
            <div className={`${classes['arroz-checkbox-box']}`}>
                <input id={label} type="checkbox" name={label} defaultChecked={checked} onClick={() => set_checked(!checked)} onChange={onToggle}/>
            </div>
            <Label>
                {label}
            </Label>
        </label>
    );
}

export default Checkbox;