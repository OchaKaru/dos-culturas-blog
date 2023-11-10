import * as React from 'react';
import {Link} from 'gatsby';
import loadable from '@loadable/component';

import '../styles/home/weekly-recipe-card.scss';

const FilledCard = loadable(() => import('../arroz-con-webo').FilledCard);
const Title = loadable(() => import('../arroz-con-webo').Title);
const Subheading = loadable(() => import('../arroz-con-webo').Subheading);
const Label = loadable(() => import('../arroz-con-webo').Label);
const Body = loadable(() => import('../arroz-con-webo').Body);
const Image = loadable(() => import('../arroz-con-webo').Image);

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
                <Image className="weekly-recipe-image" source={image} />
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