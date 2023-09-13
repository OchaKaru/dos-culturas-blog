import * as React from "react"
import axios from 'axios';

import auth from '../../../sessions/api/auth.json';

let url = "http://127.0.0.1:9000/contentmanager/get-recipe-by-name/Elote/"

const RecipePage = () => {
  const [recipe_data, set_recipe_data] = React.useState();

  React.useEffect(() => {
    axios.get(url, {
      headers: {
        'Authorization': `Token ${auth.token}`
      }
    }).then(response => {
      set_recipe_data(response.data)
    })
  });

  return (
    <main>{JSON.stringify(recipe_data)}</main>
  );
}

export default RecipePage

export const Head = () => <title>Page</title>