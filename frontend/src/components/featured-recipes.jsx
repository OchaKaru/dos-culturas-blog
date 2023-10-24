import * as React from 'react';

import RecipeCard from './recipe-card';

export default function FeaturedRecipes({data}) {
    return (
        <div>
            <RecipeCard data={data[0]} />
            <RecipeCard data={data[1]} />
            <RecipeCard data={data[2]} />
        </div>
    );
}