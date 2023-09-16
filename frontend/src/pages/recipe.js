import * as React from "react"

import RecipeAPI from "../api/recipeapi";

const RecipePage = ({location: {state}}) => {
  const [recipe_data, set_recipe_data] = React.useState(undefined);
  const [rendered_component, set_component] = React.useState(<></>)

  let recipe_id = state.recipe_clicked;

  React.useEffect(() => {
    (async () => {
      set_recipe_data(await RecipeAPI.get_recipe_details(recipe_id));
    })();
  }, [recipe_id]);

  React.useEffect(() => {
    if(recipe_data)
      set_component(
        <>
          <img />
          <h1>{recipe_data?.name}</h1>
          <p>{recipe_data?.desc}</p>
          <ul>
            {recipe_data?.ingredients.map(ingredient => {
              return (<li key={ingredient.name}>
                {ingredient.measure + ' ' + ingredient.unit + ' ' + ingredient.name}
              </li>);
            })}
          </ul>
          <ol>
            {recipe_data.steps.map(step => {
              return (<li key={step}>
                {step}
              </li>);
            })}
          </ol>
          <ul>
            {recipe_data.groups.map(group => {
              return (<li key={group.name}>
                {group.name + ': ' + group.desc}
              </li>);
            })}
          </ul>
        </>
      );
  }, [recipe_data]);

  return (
    <main>
      {rendered_component}
    </main>
  );
}

export default RecipePage

export const Head = () => <title>Recipe Page</title>