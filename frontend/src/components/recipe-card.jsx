import * as React from 'react';
import Link from "next/link";
import {FilledCard, Image, Label, Subheading} from '../arroz-con-webo';

export default function RecipeCard({data}) {
    const [recipe_data, set_recipe_data] = React.useState(undefined);
    const [image, set_image] = React.useState("");
    React.useEffect(() => {
        set_recipe_data(data);
        if(recipe_data)
            (async () => {
                set_image((await import(`../images/${recipe_data.image}`)).default);
            })();
    }, [data, recipe_data]);

    return (
        <Link href={`/library/${recipe_data?.pk}`}>
            <FilledCard className='recipe-card' role={"secondary"} containerType="container" rounded interactable>
                <Image className='recipe-image' source={image.src} alternate="" />
                <div className='recipe-meta'>
                    <Label className='recipe-culture' role="primary" pill>{recipe_data?.culture}</Label>
                    <Subheading className='recipe-name'>{recipe_data?.name}</Subheading>
                </div>
            </FilledCard>
        </Link>
    );
}