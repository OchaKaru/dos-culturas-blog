import * as React from 'react';
import RecipeCard from '../recipe-card';

export default function AllRecipeSlide({data}) {
    const [card_list, set_card_list] = React.useState();

    function cardify_data(data) {
        let cards = [];

        if(data)
            for(let i = 0; i < data.length; i++)
                cards.push(<RecipeCard key={i} index={i} data={data[i]} />);

        return cards;
    }

    React.useEffect(() => {
        set_card_list(cardify_data(data));
    }, [data]);

    return (
        <div className="all-recipe-slide" style={{"width": "1200px"}}>
            {card_list}
        </div>
    );
}