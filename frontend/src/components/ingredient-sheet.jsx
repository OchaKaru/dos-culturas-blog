import * as React from 'react';
import {SideSheet, Subheading, TonalButton, Body, Checkbox} from '../arroz-con-webo';

export default function IngredientSheet({ingredients, open, handleOpen}) {
    return (
        <SideSheet open={open}>
            <Subheading>Ingredients</Subheading>
            <TonalButton className="recipe-ingredients-pin" pill onClick={() => handleOpen(false)}>Unpin</TonalButton>
            <Body>
                {ingredients?.map(ingredient => {
                return (
                    <Checkbox className="recipe-ingredient" label={ingredient.measure + ' ' + ingredient.unit + ' ' + ingredient.name} />
                );
                })}
            </Body>
        </SideSheet>
    );
}