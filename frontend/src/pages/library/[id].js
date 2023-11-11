import * as React from "react";
import {useRouter} from "next/router";
import {Pane} from '../../arroz-con-webo';

import RecipeAPI from "../../api/recipeapi";

import IngredientSheet from "../../components/ingredient-sheet";
import IngredientCard from "../../components/ingredient-card";
import RecipeInformation from '../../components/recipe-information';
import RecipeDirections from "../../components/recipe-direction";
import TagList from "../../components/tag-list";

export default function RecipePage() {
  const router = useRouter();

  const recipe_id = router.query.id;
  const [recipe_data, set_recipe_data] = React.useState(undefined);
  const [image, set_image] = React.useState("");
  React.useEffect(() => {
    (async () => {
      set_recipe_data(await RecipeAPI.get_recipe_details(recipe_id));
    })();
  }, [recipe_id]);

  React.useEffect(() => {
    (async () => {
      if(recipe_data)
        set_image((await import(`../../images/${recipe_data.image}`)).default);
    })();
  }, [recipe_data])

  const [open, set_open] = React.useState(false);
  return (
    <main className="recipe-page">
      <IngredientSheet ingredients={recipe_data?.ingredients} open={open} handleOpen={set_open} />
      <Pane className="recipe-pane" rounded>
        <div className="recipe-content">
          <RecipeInformation image={image.src} name={recipe_data?.name} description={recipe_data?.desc} />
          <IngredientCard ingredients={recipe_data?.ingredients} open={!open} handleOpen={set_open} />
          <RecipeDirections steps={recipe_data?.steps} />
          <TagList tags={recipe_data?.groups} />
        </div>
      </Pane>
    </main>
  );
}

export const Head = () => <title>Recipe Page</title>;