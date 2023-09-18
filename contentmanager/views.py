from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from random import randint

from .models import *
from .serializers import *

# this gets all the recipes so that the frontend
# can put them in pages
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_all_recipes(request) -> Response:
    if request.method == 'GET':
        data = Recipe.objects.all()
        serializer = RecipeSerializer(data, context = {'request': request}, many = True)

        content = {
            'user': str(request.user),
            'auth': str(request.auth),
            'status': 'request was permitted',
            'data': serializer.data
        }

        return Response(content)

# this is the more usable big brother to get_recipe_by_name,
# which has terrible implications and forces recipes to
# follow a specific regex format
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_recipe_by_id(request, id) -> Response:
    if request.method == 'GET':
        recipe = Recipe.objects.get(id = id)

        recipe_ingredients = RecipeIngredient.objects.filter(recipe = recipe)
        recipe_groups = RecipeGroup.objects.filter(recipe = recipe)

        recipe_data = {}
        recipe_data['image'] = recipe.image
        recipe_data['name'] = recipe.name
        recipe_data['desc'] = recipe.desc
        recipe_data['steps'] = [step for step in recipe.steps.split(';')]

        recipe_data['ingredients'] = []
        for recipe_ingredient in recipe_ingredients:
            recipe_data['ingredients'].append({
                'name': recipe_ingredient.ingredient.name,
                'measure': recipe_ingredient.measure,
                'unit': recipe_ingredient.unit
            })

        recipe_data['groups'] = []
        for recipe_group in recipe_groups:
            recipe_data['groups'].append({
                'name': recipe_group.group.name,
                'group_type': recipe_group.group.group_type,
                'desc': recipe_group.desc
            })

        content = {
            'user': str(request.user),
            'auth': str(request.auth),
            'status': 'request was permitted',
            'data': recipe_data
        }

        return Response(content)

# this function will be used to filter recipes by tags
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_recipes_by_group(request, group) -> Response:
    if request.method == 'GET':
        group = group.replace('_', ' ')
        groups = group.split('&')

        group_set = []
        for group in groups:
            group_set.append(Group.objects.get(name = group))
        
        query_set = RecipeGroup.objects.all()
        subsets = []
        for group in group_set:
            subsets.append(query_set.filter(group = group))

        for subset in subsets:
            new_query_set = []
            for i in query_set:
                for j in subset:
                    if i.recipe == j.recipe:
                        new_query_set.append(i)
            query_set = new_query_set

        recipes = []
        for recipe_group in query_set:
            recipes.append(recipe_group.recipe)

        serializer = RecipeSerializer(list(set(recipes)), context = {'request': request}, many = True)
        return Response(serializer.data)

def get_random_recipes(request) -> Response:
    if request.method == 'GET':
        MAX_FEATURED_RECIPES = 4

        count = Recipe.objects.count()
        data = Recipe.objects.all()

        if count <= MAX_FEATURED_RECIPES:
            serializer = RecipeSerializer(data, context = {'request': request}, many = True)
        else:
            recipe_data = []
            for _ in range(MAX_FEATURED_RECIPES):
                recipe_data.append(data[randint(0, count - 1)])
            serializer = RecipeSerializer(recipe_data, context = {'request': request}, many = True)

        content = {
            'user': str(request.user),
            'auth': str(request.auth),
            'status': 'request was permitted',
            'data': serializer.data
        }

        return Response(content)

# this function should be used to get all the groups separated by types
@api_view(['GET'])
# @authentication_classes([TokenAuthentication])
# @permission_classes([IsAuthenticated])
def get_groups_by_type(request):
    if request.method == 'GET':
        group_types = ['Main Ingredient', 'Dietary Restriction', 'Culture', 'Cooking Method']

        groups = {}
        for group_type in group_types:
            query_set = Group.objects.filter(group_type = group_type)
            groups[group_type] = GroupSerializer(query_set, context = {'request': request}, many = True).data

        return Response(groups)

# this function should only be used by the backend,
# so the endpoint will be modified along with the
# debugging functions once deployed
@api_view(['POST'])
def post_new_recipe(request) -> Response:
    if request.method == 'POST':
        try:
            if Recipe.objects.filter(name = request.data['name']).exists():
                print("ERROR: Recipe Serializer was not valid.")
                return Response(status = status.HTTP_400_BAD_REQUEST)

            recipe = RecipeSerializer(data = {
                'image': request.data['image'],
                'name': request.data['name'],
                'desc': request.data['desc'],
                'steps': ';'.join(request.data['steps'])
            })
            if recipe.is_valid():
                recipe = recipe.save()
            else:
                print("ERROR: Recipe Serializer was not valid.")
                return Response(status = status.HTTP_500_INTERNAL_SERVER_ERROR)
            
            ingredients = []
            for ingredient in request.data['ingredients']:
                query_set = Ingredient.objects.filter(name = ingredient['name'])
                if not query_set.exists():
                    ingredient_serializer = IngredientSerializer(data = {'name': ingredient['name']})
                    if ingredient_serializer.is_valid():
                        ingredients.append({
                            'ingredient': ingredient_serializer.save(),
                            'measure': ingredient['measure'],
                            'unit': ingredient['unit']
                        })
                    else:
                        recipe.delete()
                        print("ERROR: Ingredient Serializer was not valid.", ingredient_serializer.errors)
                        return Response(status = status.HTTP_500_INTERNAL_SERVER_ERROR)
                else:
                    ingredients.append({
                        'ingredient': query_set[0],
                        'measure': ingredient['measure'],
                        'unit': ingredient['unit']
                    })

            recipe_ingredients = []
            for ingredient in ingredients:
                recipe_ingredient_serializer = RecipeIngredientSerializer(data = {
                    'recipe': recipe.pk,
                    'ingredient': ingredient['ingredient'].pk,
                    'measure': ingredient['measure'],
                    'unit': ingredient['unit']
                })
                if recipe_ingredient_serializer.is_valid():
                    recipe_ingredients.append(recipe_ingredient_serializer.save())
                else:
                    for ingredient in ingredients:
                        ingredient['ingredient'].delete()
                    for recipe_ingredient in recipe_ingredients:
                        recipe_ingredient.delete()
                    recipe.delete()
                    print("ERROR: RecipeIngredient Serializer was not valid.", recipe_ingredient_serializer.errors)
                    return Response(status = status.HTTP_500_INTERNAL_SERVER_ERROR)

            groups = []
            for group in request.data['groups']:
                query_set = Group.objects.filter(name = group['name'])
                if not query_set.exists():
                    group_serializer = GroupSerializer(data = {'name': group['name'], 'group_type': group['group_type']})
                    if group_serializer.is_valid():
                        groups.append({
                            'group': group_serializer.save(),
                            'desc': group['desc']
                        })
                    else:
                        recipe.delete()
                        print("ERROR: Group Serializer was not valid.", group_serializer.errors)
                        return Response(status = status.HTTP_500_INTERNAL_SERVER_ERROR)
                else:
                    groups.append({
                        'group': query_set[0],
                        'desc': group['desc']
                    })

            recipe_groups = []
            for group in groups:
                recipe_group = RecipeGroupSerializer(data = {
                    'recipe': recipe.pk,
                    'group': group['group'].pk,
                    'desc': group['desc'],
                })
                if recipe_group.is_valid():
                    recipe_groups.append(recipe_group.save())
                else:
                    for recipe_ingredient in recipe_ingredients:
                        recipe_ingredient.delete()
                    for recipe_group in recipe_groups:
                        recipe_group.delete()
                    recipe.delete()
                    print("ERROR: RecipeGroup Serializer was not valid.", recipe_group.errors)
                    return Response(status = status.HTTP_500_INTERNAL_SERVER_ERROR)
        except KeyError:
            return Response(status = status.HTTP_400_BAD_REQUEST)

        return Response(status = status.HTTP_201_CREATED)

# these api functions are used for testing
# they don't really serve a functional purpose for the website
# maybe an all ingredients page where a user can filter recipes 
# by a certain ingredient
@api_view(['GET'])
def get_recipe_by_name(request, recipe) -> Response:
    if request.method == 'GET':
        recipe = recipe.replace("_", " ")
        recipe = Recipe.objects.get(name = recipe)

        recipe_ingredients = RecipeIngredient.objects.filter(recipe = recipe)
        recipe_groups = RecipeGroup.objects.filter(recipe = recipe)

        recipe_data = {}
        recipe_data['id'] = recipe.pk
        recipe_data['image'] = recipe.image
        recipe_data['name'] = recipe.name
        recipe_data['desc'] = recipe.desc
        recipe_data['steps'] = [step for step in recipe.steps.split(';')]

        recipe_data['ingredients'] = []
        for recipe_ingredient in recipe_ingredients:
            recipe_data['ingredients'].append({
                'name': recipe_ingredient.ingredient.name,
                'measure': recipe_ingredient.measure,
                'unit': recipe_ingredient.unit
            })

        recipe_data['groups'] = []
        for recipe_group in recipe_groups:
            recipe_data['groups'].append({
                'name': recipe_group.group.name,
                'group_type': recipe_group.group.group_type,
                'desc': recipe_group.desc
            })

        return Response(recipe_data)

@api_view(['GET'])
def get_all_groups(request):
    if request.method == 'GET':
        data = Group.objects.all()
        serializer = GroupSerializer(data, context = {'request': request}, many = True)
        return Response(serializer.data)

@api_view(['GET'])
def get_all_ingredients(request):
    if request.method == 'GET':
        data = Ingredient.objects.all()
        serializer = IngredientSerializer(data, context = {'request': request}, many = True)
        return Response(serializer.data)

@api_view(['GET'])
def reset_database(request):
    if request.method == 'GET':
        data = Recipe.objects.all()
        for recipe in data:
            recipe.delete()
        
        data = Ingredient.objects.all()
        for ingredient in data:
            ingredient.delete()
        
        data = RecipeIngredient.objects.all()
        for recipe_ingredient in data:
            recipe_ingredient.delete()

        data = Group.objects.all()
        for group in data:
            group.delete()

        data = RecipeGroup.objects.all()
        for recipe_group in data:
            recipe_group.delete()
    
        return Response(status = status.HTTP_205_RESET_CONTENT)
