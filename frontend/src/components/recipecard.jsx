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
            'culture': props.data.culture,
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
                <div className='recipe-card'>
                    <figure className='recipe-image'>
                        <img src={this.state.image} alt={this.state.description} />
                    </figure>
                    <div className='recipe-meta'>
                        <p className='recipe-culture'>{this.state.culture}</p>
                        <h1 className='recipe-name'>{this.state.name}</h1>
                    </div>
                </div>
            </Link>
        );
    }
}