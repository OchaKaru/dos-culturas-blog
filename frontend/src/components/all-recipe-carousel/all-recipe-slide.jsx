import * as React from 'react';
import RecipeCard from '../recipe-card';

export default class AllRecipeSlide extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            "card_list": this.cardify_data(props.data)
        }
    }

    componentDidUpdate(prevProps) {
        if(prevProps.data !== this.props.data)
            this.setState({"card_list": this.cardify_data(this.props.data)});
    }

    cardify_data(data) {
        let card_list = [];

        for(let i = 0; i < data.length; i++)
            card_list.push(<RecipeCard key={i} data={data[i]} />);

        return card_list;
    }

    render() {
        return (
            <div className="all-recipe-slide">
                {this.state.card_list}
            </div>
        );
    }
}