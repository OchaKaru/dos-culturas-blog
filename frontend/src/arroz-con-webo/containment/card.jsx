import * as React from 'react';

import '../styles/card/card.scss';

/**
 * 
 * @param {} role
 * @param {} type
 * @param {} level
 *
 */
function Card(props) {



    return (
        <div className='arroz-card'>
            {props.children}
        </div>
    );
}

export default Card;