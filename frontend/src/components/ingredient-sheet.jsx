import * as React from 'react';
import loadable from '@loadable/component';

const SideSheet = loadable(() => import('../arroz-con-webo').SideSheet);
const Subheading = loadable(() => import('../arroz-con-webo').Subheading);
const TonalButton = loadable(() => import('../arroz-con-webo').TonalButton);
const Body = loadable(() => import('../arroz-con-webo').Body);
const Checkbox = loadable(() => import('../arroz-con-webo').Checkbox);

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