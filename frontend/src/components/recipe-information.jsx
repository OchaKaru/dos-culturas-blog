import * as React from 'react';
import {FilledCard, Image, Body, Label, Headline, Subheading} from '../arroz-con-webo';


export default function RecipeInformation({image, name, culture, description}) {
    return (
        <FilledCard className="recipe-metadata" role="secondary" containerType="container" rounded >
            <Image className="recipe-image" source={image} alternate={""} />
            <div className="recipe-info">
                <Headline>{name}</Headline>
                <Label>{culture}</Label>
                <Subheading>Description</Subheading>
                <Body>
                    {description}
                </Body>
            </div>
        </FilledCard>
    );
}