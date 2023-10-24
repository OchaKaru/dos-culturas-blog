import * as React from "react";

import RecipeAPI from "../api/recipeapi";

import WeeklyRecipeCard from "../components/weekly-recipe-card";
import NewsLetterSubscribe from "../components/news-letter-subscribe";
import FeaturedRecipes from "../components/featured-recipes";

const HomePage = () => {
  let [recipe_data, set_recipe_data] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      set_recipe_data(await RecipeAPI.get_featured());
    })();
  }, []);

  return (
    <main>
      <WeeklyRecipeCard />
      <NewsLetterSubscribe />
      <FeaturedRecipes />
    </main>
  );
}

export default HomePage;

export const Head = () => <title>Home Page</title>;

/*
<div>
    <Image>
        <Filter />
    </Image>
    <div>
        <Title />
        <Subtitle />
        <Button />
    </div>
</div>
*/