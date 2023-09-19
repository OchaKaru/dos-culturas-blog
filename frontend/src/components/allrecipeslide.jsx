import * as React from 'react';
import RecipeCard from './recipecard';

export default class AllRecipeSlide extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            "card_list": this.cardify_data(props.data)
        }
    }

    cardify_data(data) {
        let card_list = [];

        for(let i = 0; i < data.length; i++)
            card_list.push(<RecipeCard key={i} data={data[i]} />);

        return card_list;
    }

    render() {
        return (
            <div className="allrecipeslide">
                {this.state.card_list}
            </div>
        );
    }
}