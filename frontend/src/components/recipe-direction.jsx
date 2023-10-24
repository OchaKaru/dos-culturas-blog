import * as React from 'react';
import {Body, Subheading} from '../arroz-con-webo';

export default function RecipeDirections({steps}) {
    return (
        <Body>
            <Subheading>Directions</Subheading>
            <ol>
            {steps?.map(step => {
                return (<li key={step}>
                {step}
                </li>);
            })}
            </ol>
        </Body>
    );
}