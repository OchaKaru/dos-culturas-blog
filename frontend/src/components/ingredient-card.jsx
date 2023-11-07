import * as React from 'react';
import {OutlinedCard, Subheading, FilledButton, Body, Checkbox, Collapse} from '../arroz-con-webo';


export default function IngredientCard({ingredients, open, handleOpen}) {
    return (
        <Collapse open={open} direction='vertical'>
            <OutlinedCard className="recipe-ingredients" role="primary" containerType="container" rounded>
                <Subheading>Ingredients</Subheading>
                <FilledButton className="recipe-ingredients-pin" pill onClick={() => handleOpen(true)}>Pin</FilledButton>
                <Body>
                    {ingredients?.map(ingredient => {
                        return (
                        <Checkbox className="recipe-ingredient" label={ingredient.measure + ' ' + ingredient.unit + ' ' + ingredient.name} />
                        );
                    })}
                </Body>
            </OutlinedCard>
        </Collapse>
    );
}

