import * as React from 'react';
import {FilledCard, Image, Title, Subheading, Label, Body} from '../arroz-con-webo';

export default function WeeklyRecipeCard({name, culture, description}) {
    return (
        <FilledCard role="primary" containerType="container" rounded interactable>
            <div>
                <Image />
                <div>
                    <Title>Weekly Recipe!</Title>
                    <Subheading>{name}</Subheading>
                    <Label>{culture}</Label>
                    <Body>{description}</Body>
                </div>
            </div>
        </FilledCard>
    );
}