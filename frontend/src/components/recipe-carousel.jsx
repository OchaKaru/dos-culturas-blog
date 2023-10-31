import * as React from 'react';
import {Slideshow, Pane} from '../arroz-con-webo';

import RecipeCard from './recipe-card';

export default function RecipeCarousel({data}) {
    const MAX_RECIPES_ON_PAGE = 6;
    const [page_list, set_page_list] = React.useState();

    // receives a list of objects containing: image, name, description
    function pagify_data(data) {
        let pages = [];

        function cardify_data(data) {
            let cards = [];
    
            if(data)
                for(let i = 0; i < data.length; i++)
                    cards.push(<RecipeCard key={i} index={i} data={data[i]} />);
            return cards;
        }

        if(data)
            for(let i = 0; i < data.length; i += MAX_RECIPES_ON_PAGE) {
                const chunk = data.slice(i, i + MAX_RECIPES_ON_PAGE);
                pages.push(
                    <div className="recipe-slide">
                        {cardify_data(chunk)}
                    </div>
                );
            }

        return pages;
    }

    React.useEffect(() => {
        set_page_list(pagify_data(data));
    }, [data])

    return (
        <Pane className='recipe-carousel' containerType="container" rounded>
            <Slideshow enterStyle="fade-in-up" exitStyle="fade-out-against">
                {page_list}
            </Slideshow>
        </Pane>
    );
}