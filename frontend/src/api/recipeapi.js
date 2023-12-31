import axios from 'axios';
import auth from '../../../sessions/api/auth.json';

import {GET_ALL_RECIPES, GET_RECIPES_BY_GROUP, GET_GROUPS_BY_TYPE, GET_FEATURED_RECIPES, GET_RECIPE_DETAILS_BY_ID} from './util/urls';

let instance;

class RecipeAPI {
    recipe;
    group_list;
    recipe_list;

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
        await axios.get(GET_GROUPS_BY_TYPE, {headers: {
            'Authorization': `Token ${auth.token}`
        }}).then(response => {
            this.set_group_list(response.data.data)
        })

        return this.group_list
    }

    async get_recipes(groups) {
        if(!groups || groups.length === 0) {
            await axios.get(GET_ALL_RECIPES, {headers: {
                'Authorization': `Token ${auth.token}`
            }}).then(response => {
                this.set_recipe_list(response.data.data)
            })
    
            return this.recipe_list
        }

        for(let i = 0; i < groups.length; i++)
            groups[i] = groups[i].replace(" ", "_");
        groups = groups.join("&");

        await axios.get(GET_RECIPES_BY_GROUP + groups, {headers: {
            'Authorization': `Token ${auth.token}`
        }}).then(response => {
            this.set_recipe_list(response.data.data)
        })

        return this.recipe_list
    }

    async get_featured() {
        await axios.get(GET_FEATURED_RECIPES, {headers: {
            'Authorization': `Token ${auth.token}`
        }}).then(response => {
            this.set_recipe_list(response.data.data)
        })

        return this.recipe_list
    }
}

instance = new RecipeAPI();

export default instance;