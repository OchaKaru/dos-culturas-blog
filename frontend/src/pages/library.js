import * as React from "react";
import Header from '../components/header';
import Pagifier from '../components/pagifier';

import RecipeAPI from "../api/recipeapi";

const LibraryPage = () => {
  let [recipe_data, set_recipe_data] = React.useState(undefined);
  let [group_data, set_group_data] = React.useState(undefined);

  let [pagifier_component, set_pagifier] = React.useState(<></>);
  let [filter_list_component, set_filter_list] = React.useState(<></>);

  React.useEffect(() => {
    (async () => {
      set_recipe_data(await RecipeAPI.get_recipes());
      set_group_data(await RecipeAPI.get_groups())
    })();
  }, []);

  React.useEffect(() => {
    if(recipe_data)
      set_pagifier(<Pagifier data={recipe_data} />);
  }, [recipe_data]);

  React.useEffect(() => {
    if(group_data)
      //<FilterAccordian data={group_data} />
      set_filter_list(<></>);
  }, [group_data])

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