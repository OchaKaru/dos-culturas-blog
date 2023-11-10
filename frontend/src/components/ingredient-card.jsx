import * as React from 'react';
import loadable from '@loadable/component';

const Collapse = loadable(() => import('../arroz-con-webo').Collapse);
const OutlinedCard = loadable(() => import('../arroz-con-webo').OutlinedCard);
const Body = loadable(() => import('../arroz-con-webo').Body);
const Subheading = loadable(() => import('../arroz-con-webo').Subheading);
const FilledButton = loadable(() => import('../arroz-con-webo').FilledButton);
const Checkbox = loadable(() => import('../arroz-con-webo').Checkbox);

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

