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

    componentDidUpdate(prevProps) {
        if(prevProps.data !== this.props.data) {
            (async () => {
                this.setState({
                    'id': this.props.data.pk,
                    'image_url': this.props.data.image,
                    'image': (await import(`../images/${this.props.data.image}`)).default,
                    'name': this.props.data.name,
                    'description': this.props.data.desc,
                });
            })();
        }
    }

    render() {
        return (
            <Link to="/recipe/" state={{'recipe_clicked': this.state.id}}>
                <div className='recipecard'>
                    <img src={this.state.image} alt={this.state.description} />
                    <div className='recipecardtext'>{this.state.name}</div>                    
                </div>
            </Link>
        );
    }
}