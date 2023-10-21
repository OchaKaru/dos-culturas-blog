import * as React from "react"
import {Image, Headline, Subheading, Body, Pane, FilledCard, OutlinedCard, TonalButton, Checkbox, Label, SideSheet} from '../arroz-con-webo';

import RecipeAPI from "../api/recipeapi";
import Header from '../components/navigation/header';

import '../styles/recipe/recipe-page.scss';

const RecipePage = ({location: {state}}) => {
  let recipe_id = state.recipe_clicked;

  const [recipe_data, set_recipe_data] = React.useState(undefined);
  React.useEffect(() => {
    (async () => {
      set_recipe_data(await RecipeAPI.get_recipe_details(recipe_id));
    })();
  }, [recipe_id]);

  const [image, set_image] = React.useState("");
  React.useEffect(() => {
    (async () => {
      set_image((await import(`../images/${recipe_data?.image}`)).default);
    })();
  }, [recipe_data])

  const [open, set_open] = React.useState(false);

  return (
    <main>
      <Header />
      <div className="recipe-page">
        <SideSheet open={open}>
          <Subheading>Ingredients</Subheading>
          <TonalButton className="recipe-ingredients-pin" pill onClick={() => set_open(false)}>Pin</TonalButton>
          <Body>
            {recipe_data?.ingredients.map(ingredient => {
              return (
                <Checkbox className="recipe-ingredient" label={ingredient.measure + ' ' + ingredient.unit + ' ' + ingredient.name} />
              );
            })}
          </Body>
        </SideSheet>
        <Pane className="recipe-pane" rounded>
          <div className="recipe-content">
          <FilledCard className="recipe-metadata" role="primary" containerType="container" rounded >
            <Image source={image} alternate={recipe_data?.desc} />
            <div>
              <Headline>{recipe_data?.name}</Headline>
              <Subheading>Description</Subheading>
              <Body>
                {recipe_data?.desc}
              </Body>
            </div>
          </FilledCard>
          <OutlinedCard className="recipe-ingredients" rounded>
            <Subheading>Ingredients</Subheading>
            <TonalButton className="recipe-ingredients-pin" pill onClick={() => set_open(true)}>Pin</TonalButton>
            <Body>
              {recipe_data?.ingredients.map(ingredient => {
                return (
                  <Checkbox className="recipe-ingredient" label={ingredient.measure + ' ' + ingredient.unit + ' ' + ingredient.name} />
                );
              })}
            </Body>
          </OutlinedCard>
          <Subheading>Directions</Subheading>
          <Body>
            <ol>
              {recipe_data?.steps.map(step => {
                return (<li key={step}>
                  {step}
                </li>);
              })}
            </ol>
          </Body>
          <ul>
            {recipe_data?.groups.map(group => {
              return (
                <li key={group.name}>
                  <Label role="secondary" pill>{group.name + ': ' + group.desc}</Label>
                </li>
              );
            })}
          </ul>
          </div>
        </Pane>
      </div>
    </main>
  );
}

export default RecipePage

export const Head = () => <title>Recipe Page</title>