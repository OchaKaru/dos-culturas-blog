import * as React from 'react';

import RecipeCard from './recipe-card';
import {Title} from '../arroz-con-webo';

export default function FeaturedRecipes({data}) {
    return (
        <>
            <Title>Features Recipes</Title>
            <div>
                <RecipeCard data={data[0]} />
                <RecipeCard data={data[1]} />
                <RecipeCard data={data[2]} />
            </div>
        </>
    );
}