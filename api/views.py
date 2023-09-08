from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .models import *
from .serializers import *

# Create your views here.
# request handler

@api_view(['GET'])
def get_all_recipes(request) -> Response:
    if request.method == 'GET':
        data = Recipe.objects.all()
        serializer = RecipeSerializer(data, context = {'request': request}, many = True)
        return Response(serializer.data)

@api_view(['GET'])
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

@api_view(['GET'])
def get_all_groups(request):
    if request.method == 'GET':
        data = Group.objects.all()
        serializer = GroupSerializer(data, context = {'request': request}, many = True)
        return Response(serializer.data)

@api_view(['GET'])
def get_groups_by_type(request, group_type):
    if request.method == 'GET':
        group_type = group_type.replace('_', ' ')
        group_types = group_type.split('&')
        
        query_set = []
        for group_type in group_types:
            query_set.extend(Group.objects.filter(group_type = group_type))

        serializer = GroupSerializer(query_set, context = {'request': request}, many = True)
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
    
        
