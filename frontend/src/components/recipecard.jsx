import * as React from 'react';
import { Link } from "gatsby";

export default class RecipeCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            'id': props.data.pk,
            'image_url': props.data.image,
            'image': "",
            'name': props.data.name,
            'description': props.data.desc,
        }
    }

    componentDidMount() {
        (async () => {
            this.setState({'image': (await import(`../images/${this.state.image_url}`)).default})
        })();
    }

    render() {
        return (
            <Link className='recipe-card' to="/recipe/" state={{'recipe_clicked': this.state.name}}>
                <img src={this.state.image} alt={this.state.description} />
                <h2>{this.state.name}</h2>
                <p>{this.state.description}</p>
            </Link>
        );
    }
}