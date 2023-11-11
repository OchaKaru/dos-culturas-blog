import * as React from 'react';
import {Title} from '../arroz-con-webo';

import RecipeCard from './recipe-card';

export default function FeaturedRecipes({data}) {
    React.useEffect(() => {
        console.log(data);
    })

    return (
        <div className='featured-recipes'>
            <Title>Features Recipes</Title>
            <div className='card-container'>
                <RecipeCard data={data[0]} />
                <RecipeCard data={data[1]} />
                <RecipeCard data={data[2]} />
            </div>
        </div>
    );
}