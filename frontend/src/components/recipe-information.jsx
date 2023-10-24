import * as React from 'react';
import {FilledCard, Image, Body, Label, Headline, Subheading} from '../arroz-con-webo';


export default function RecipeInformation({image, name, culture, description}) {
    return (
        <FilledCard role="secondary" containerType="container" rounded >
            <div className="recipe-metadata">
                <Image source={image} alternate={""} />
                <div>
                    <Headline>{name}</Headline>
                    <Label>{culture}</Label>
                    <Subheading>Description</Subheading>
                    <Body>
                        {description}
                    </Body>
                </div>
            </div>
        </FilledCard>
    );
}