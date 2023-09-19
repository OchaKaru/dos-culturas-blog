import * as React from "react";
import Header from '../components/header';
import AllRecipeCarousel from '../components/allrecipecarousel';
import FilterAccordian from '../components/filteraccordian';

import RecipeAPI from "../api/recipeapi";

const LibraryPage = () => {
  let [recipe_data, set_recipe_data] = React.useState(undefined);
  let [group_data, set_group_data] = React.useState(undefined);

  let [pagifier_component, set_pagifier] = React.useState(<></>);
  let [filter_list_component, set_filter_list] = React.useState(<></>);

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

  React.useEffect(() => {
    if(group_data)
      set_filter_list(<FilterAccordian data={group_data} onFilter={filter_recipes}  onReset={reset_recipes} />);
  }, [group_data])

  React.useEffect(() => {
    if(recipe_data)
      set_pagifier(<AllRecipeCarousel data={recipe_data} />);
  }, [recipe_data]);

  return (
    <main>
      <Header />
      {filter_list_component}
      {pagifier_component}
    </main>
  );
}

export default LibraryPage

export const Head = () => <title>All Recipes Page</title>