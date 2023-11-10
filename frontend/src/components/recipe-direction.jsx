import * as React from 'react';
import loadable from '@loadable/component';

const Body = loadable(() => import('../arroz-con-webo').Body);
const Subheading = loadable(() => import('../arroz-con-webo').Subheading);

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