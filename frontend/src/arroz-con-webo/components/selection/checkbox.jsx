import * as React from 'react';

// arroz imports
import {InvalidRoleError, NoNameError} from '../../error';
import {useCSSClass} from '../../util';
import {ThemeContext, Typography} from '../../styles';
import {ContainerContext, valid_role} from '../containment/container-context';

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

    const [checked, set_checked] = React.useState(defaultChecked? true : false);
    const context = React.useContext(ContainerContext);
    const {Scheme} = React.useContext(ThemeContext);

    const ANIMATION_DURATION = 200;
    const [class_name, set_style] = useCSSClass();
    React.useEffect(() => {
        set_style(`
            .${class_name} {
                display: flex;
                align-items: center;
            }
            
            .${class_name}-checkbox {
                position: relative;
                padding: ${0.5 * Typography.font_size}${Typography.unit};
                border-radius: 50%;
                cursor: pointer;
                overflow: hidden;
            }

            .${class_name}-checkbox input[type='checkbox'] {
                appearance: none;
                vertical-align: middle;
                position: relative;
                width: ${Typography.font_size}${Typography.unit};
                height: ${Typography.font_size}${Typography.unit};
                background: transparent;
                border: ${0.2 * Typography.font_size}${Typography.unit} solid ${Scheme[context.role].on_container};
                border-radius: ${0.1 * Typography.font_size}${Typography.unit};
                cursor: pointer;
                
                transition: border ${ANIMATION_DURATION}ms ease-out;
            }
        
            .${class_name}-checkbox input[type='checkbox']:checked {
                border: ${0.5 * Typography.font_size}${Typography.unit} solid ${Scheme[role].accent};
                animation: shrink-bounce ${ANIMATION_DURATION}ms ease-out;
            }

            .${class_name}-checkbox input[type='checkbox']:checked:before{
                content: "";
                position: absolute;
                top: ${-Typography.font_size / 8}${Typography.unit};
                left: ${-3 * Typography.font_size / 8}${Typography.unit};
                border-right: ${0.2 * Typography.font_size}${Typography.unit} solid transparent;
                border-bottom: ${0.2 * Typography.font_size}${Typography.unit} solid transparent;
                transform: rotate(45deg);
                transform-origin: 0% 100%;
                animation: checkbox-check ${ANIMATION_DURATION / 2}ms ${ANIMATION_DURATION}ms ease forwards;
            }
            
            @keyframes shrink-bounce{
                0%{
                    transform: scale(1);
                }
                33%{    
                    transform: scale(.85);
                }
                100%{
                    transform: scale(1);    
                }
            }
            @keyframes checkbox-check{
                0%{
                    width: 0;
                    height: 0;
                    border-color: ${Scheme[role].on_accent};
                    transform: translate(0, 0) rotate(45deg);
                }
                33%{
                    width: ${0.2 * Typography.font_size}${Typography.unit};
                    height: 0;
                    transform: translate(0, 0) rotate(45deg);
                }
                100%{    
                    width: ${0.2 * Typography.font_size}${Typography.unit};
                    height: ${0.5 * Typography.font_size}${Typography.unit};   
                    border-color: ${Scheme[role].on_accent};
                    transform: translate(0, ${-0.5 * Typography.font_size}${Typography.unit}) rotate(45deg);
                }
            }
            
            .${class_name}-checkbox::before {
                content: "";
                background-color: ${Scheme[context.role].on_container};
                position: absolute;
                inset: 0;
                border-radius: 50%;
                opacity: 0%;
                transition: opacity ${ANIMATION_DURATION}ms ease;
            }

            .${class_name}-checkbox:hover::before {
                opacity: 10%;
            }
            
            ${ripple? "" :
                `.${class_name}-checkbox:active::before {
                    opacity: 20%;
                }`
            }

            .${class_name}-label {
                font-family: ${Typography.label_font()};
                font-size: ${Typography.label_size}${Typography.unit};
                text-wrap: nowrap;
            }
        `);
    }, [ANIMATION_DURATION, Scheme, class_name, context.role, ripple, role, set_style]);

    return (
        <label htmlFor={label} className={`${class_name} ${className?? ""}`}>
            <div className={`${class_name}-checkbox`}>
                <input id={label} type="checkbox" name={label} defaultChecked={checked} onClick={() => set_checked(!checked)} onChange={onToggle}/>
            </div>
            <span className={`${class_name}-label`}>
                {label}
            </span>
        </label>
    );
}

export default Checkbox;