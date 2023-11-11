import * as React from "react";

import RecipeAPI from "../../api/recipeapi";
import RecipeCarousel from '../../components/recipe-carousel';
import FilterAccordion from '../../components/filter-accordion';

export default function LibraryPage() {
  let [recipe_data, set_recipe_data] = React.useState([]);
  let [group_data, set_group_data] = React.useState({"Main Ingredient": [], "Dietary Restriction": [], "Culture": [], "Cooking Method": []});

  let [reset, set_reset] = React.useState(true);

  function filter_recipes(groups) {
    (async () => {
      set_recipe_data(await RecipeAPI.get_recipes(groups));
    })();
  }

  function reset_recipes() {
    set_reset(true);
  }

  React.useEffect(() => {
    if(reset)
      (async () => {
        set_group_data(await RecipeAPI.get_groups());
        set_recipe_data(await RecipeAPI.get_recipes());
      })();

    set_reset(false);
  }, [reset]);

  return (
    <main className="recipe-library">
      <FilterAccordion data={group_data} onFilter={filter_recipes} onReset={reset_recipes} />
      <RecipeCarousel data={recipe_data} />
    </main>
  );
}

export const Head = () => <title>All Recipes Page</title>