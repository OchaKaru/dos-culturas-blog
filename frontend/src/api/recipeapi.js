import axios from 'axios';
import auth from '../../../sessions/api/auth.json';

import {GET_RECIPE_DETAILS_BY_ID, GET_ALL_GROUPS, GET_ALL_RECIPES, GET_RECIPES_BY_GROUP} from './urls';

let instance;

class RecipeAPI {
    recipe
    group_list
    recipe_list

    set_recipe_data(data) {
        this.recipe = data
    }

    set_group_list(data) {
        this.group_list = data
    }

    set_recipe_list(data) {
        this.recipe_list = data
    }

    async get_recipe_details(id) {
        await axios.get(GET_RECIPE_DETAILS_BY_ID + id, {headers: {
            'Authorization': `Token ${auth.token}`
        }}).then(response => {
            this.set_recipe_data(response.data.data)
        })

        return this.recipe
    }

    async get_groups() {
        await axios.get(GET_ALL_GROUPS, {headers: {
            'Authorization': `Token ${auth.token}`
        }}).then(response => {
            this.set_group_list(response.data.data)
        })

        return this.group_list
    }

    async get_recipes() {
        await axios.get(GET_ALL_RECIPES, {headers: {
            'Authorization': `Token ${auth.token}`
        }}).then(response => {
            this.set_recipe_list(response.data.data)
        })

        return this.recipe_list
    }

    async get_recipes_by_group(group) {
        await axios.get(GET_RECIPES_BY_GROUP + group, {headers: {
            'Authorization': `Token ${auth.token}`
        }}).then(response => {
            this.set_recipe_list(response.data.data)
        })

        return this.recipe_list
    }
}

instance = new RecipeAPI()

export default instance