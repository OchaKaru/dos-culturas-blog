import * as React from 'react';
import loadable from '@loadable/component';

const FilledCard = loadable(() => import('../arroz-con-webo').FilledCard);
const Image = loadable(() => import('../arroz-con-webo').Image);
const Headline = loadable(() => import('../arroz-con-webo').Headline);
const Label = loadable(() => import('../arroz-con-webo').Label);
const Subheading = loadable(() => import('../arroz-con-webo').Subheading);
const Body = loadable(() => import('../arroz-con-webo').Body);

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