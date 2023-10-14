import * as React from 'react';
import {Slideshow} from '../../arroz-con-webo';

import AllRecipeSlide from './all-recipe-slide';

export default function AllRecipeCarousel({data}) {
    const MAX_RECIPES_ON_PAGE = 9;
    const [page_list, set_page_list] = React.useState();

    // receives a list of objects containing: image, name, description
    function pagify_data(data) {
        let pages = [];

        if(data)
            for(let i = 0; i < data.length; i += MAX_RECIPES_ON_PAGE) {
                const chunk = data.slice(i, i + MAX_RECIPES_ON_PAGE);
                pages.push(<AllRecipeSlide key={i} data={chunk} />);
            }

        return pages;
    }

    React.useEffect(() => {
        set_page_list(pagify_data(data));
    }, [data])

    return (
        <Slideshow className='all-recipe-carousel' enterStyle="fade-in-up" exitStyle="fade-out-against">
            {page_list}
        </Slideshow>
    );
}