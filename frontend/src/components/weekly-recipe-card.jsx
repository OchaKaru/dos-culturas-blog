import * as React from 'react';
import Link from 'next/link';
import {FilledCard, Title, Subheading, Label, Body, Image} from '../arroz-con-webo';

export default function WeeklyRecipeCard({data}) {
    const [image, set_image] = React.useState("");
    React.useEffect(() => {
        if(data)
            (async () => {
                set_image((await import(`../images/${data.image}`)).default);
            })();
    }, [data])

    return (
        <Link href={`/library/${data?.pk}`}>
            <FilledCard className="weekly-recipe-card" role="primary" containerType="container" rounded interactable>
                <Image className="weekly-recipe-image" source={image.src} />
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