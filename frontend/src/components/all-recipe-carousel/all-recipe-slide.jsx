import * as React from 'react';
import RecipeCard from '../recipe-card';

export default function AllRecipeSlide({data}) {
    const [card_list, set_card_list] = React.useState();

    function cardify_data(data) {
        let cards = [];

        if(data)
            for(let i = 0; i < data.length; i++)
                cards.push(<RecipeCard key={i} data={data[i]} />);

        return cards;
    }

    React.useEffect(() => {
        set_card_list(cardify_data(data));
    }, [data]);

    return (
        <div className="all-recipe-slide">
            {card_list}
        </div>
    );
}