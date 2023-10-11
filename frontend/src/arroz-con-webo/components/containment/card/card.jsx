import * as React from 'react';

// arroz imports
import {NoContextError} from '../../../error';
import {Typography, Manager} from '../../../styles';
import {ContainerContext} from '../container-context';

/**
 * This is the Arroz con Webo Card: Used where content needs to be in subcontainers. The cards
 * contain related elements and can be filled, elevated, or outlined. Content can be anything.
 * 
 * @param {boolean} rounded (optional) Specifies if the corners are rounded.
 * @param {boolean} interactable (optional) Specifies if the card should have a hover effect.
 * @param {boolean} ripple (optional) Specifies if the card should have a ripple animation.
 * 
 * @param {string} context (internal) Informs children of the type of container they are inside of.
 */
function Card(props) {
    if(!props.context)
        throw new NoContextError();

    React.useEffect(() => {
        Manager.style_sheet("base_card", `.arroz-card {
            // position
            position: relative;
        
            // structure
            display: inline-block;
            padding: 0;
            overflow: hidden;
            border-radius: ${props.rounded? 0.2 * Typography.font_size : Typography.font_size}${Typography.unit};
        }`);
    })

    if(props.interactable) {
        if(props.ripple) {

        } else {
            
        }
    }

    return (
        <div className={"arroz-card " + props.className?? ""}>
            <ContainerContext.Provider value={props.context}>
                {props.children}
            </ContainerContext.Provider>
        </div>
    );
}

export default Card;

