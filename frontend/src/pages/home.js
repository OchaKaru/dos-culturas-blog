import * as React from "react";

import RecipeAPI from "../api/recipeapi";

import WeeklyRecipeCard from "../components/weekly-recipe-card";
import NewsLetterSubscribe from "../components/news-letter-subscribe";
import FeaturedRecipes from "../components/featured-recipes";

import "../styles/home/home-page.scss";

const HomePage = () => {
  const [recipe_data, set_recipe_data] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      set_recipe_data(await RecipeAPI.get_featured());
    })();
  }, []);

  return (
    <main className="home-page">
      <WeeklyRecipeCard data={recipe_data[0]} />
      <NewsLetterSubscribe />
      <FeaturedRecipes data={recipe_data.slice(1)} />
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