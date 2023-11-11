import * as React from 'react';
import {Body, Subheading} from '../arroz-con-webo';

export default function RecipeDirections({steps}) {
    return (
        <>
            <Subheading>Directions</Subheading>
            <Body>
                <ol>
                {steps?.map(step => {
                    return (<li key={step}>
                    {step}
                    </li>);
                })}
                </ol>
            </Body>
        </>
    );
}