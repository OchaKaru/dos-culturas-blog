import * as React from 'react';
import {Link} from "gatsby";

import {FilledCard, Label, Subheading} from '../arroz-con-webo';

export default class RecipeCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            'id': props.data?.pk,
            'image_url': props.data?.image,
            'image': "",
            'name': props.data?.name,
            'culture': props.data?.culture,
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
                    'culture': this.props.data.culture,
                });
            })();
        }
    }

    render() {
        return (
            <Link to="/recipe/" state={{'recipe_clicked': this.state.id}}>
                <FilledCard className='recipe-card' role={"secondary"} containerType="container" rounded interactable>
                    <figure className='recipe-image'>
                        <img src={this.state.image} alt={this.state.description} />
                    </figure>
                    <div className='recipe-meta'>
                        <Label className='recipe-culture' role="primary" pill>{this.state.culture}</Label>
                        <Subheading className='recipe-name'>{this.state.name}</Subheading>
                    </div>
                </FilledCard>
            </Link>
        );
    }
}