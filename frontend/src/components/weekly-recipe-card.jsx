import * as React from 'react';
import {Link} from 'gatsby';
import {FilledCard, Image, Title, Subheading, Label, Body} from '../arroz-con-webo';

import '../styles/home/weekly-recipe-card.scss';

export default function WeeklyRecipeCard({data}) {
    const [image, set_image] = React.useState("");
    React.useEffect(() => {
        (async () => {
            set_image((await import(`../images/${data?.image}`)).default);
        })();
    }, [data])

    return (
        <Link to="/recipe/" state={{'recipe_clicked': data?.pk}}>
            <FilledCard className="weekly-recipe-card" role="primary" containerType="container" rounded interactable>
                <Image source={image} />
                <div className="weekly-recipe-info">
                    <Title>Weekly Recipe!</Title>
                    <Subheading>{data?.name}</Subheading>
                    <Label role="primary" pill>{data?.culture}</Label>
                    <Body>{data?.desc}</Body>
                </div>
            </FilledCard>
        </Link>
    );
}