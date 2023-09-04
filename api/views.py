from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .models import *
from .serializers import *

# Create your views here.
# request handler

@api_view(['GET'])
def get_all_recipes(request):
    if request.method == 'GET':
        data = Recipe.objects.all()
        serializer = RecipeSerializer(data, context = {'request': request}, many = True)
        return Response(serializer.data)
    
@api_view(['POST'])
def post_new_recipe(request):
    if request.method == 'POST':
        try:
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
                    ingredient_ser = IngredientSerializer(data = {'name': ingredient['name']})
                    if ingredient_ser.is_valid():
                        ingredients.append({
                            'ingredient': ingredient_ser.save(),
                            'measure': ingredient['measure'],
                            'unit': ingredient['unit']
                        })
                    else:
                        for ingredient in ingredients:
                            ingredient['ingredient'].delete()
                        recipe.delete()
                        print("ERROR: Ingredient Serializer was not valid.")
                        return Response(status = status.HTTP_500_INTERNAL_SERVER_ERROR)
                else:
                    ingredients.append({
                        'ingredient': query_set[0],
                        'measure': ingredient['measure'],
                        'unit': ingredient['unit']
                    })

            # groups = []
            # for group in request.data['groups']:
            #     query_set = Group.objects.filter(name = group['name'])
            #     if not query_set.exists():
            #         group_type = GroupType.objects.filter(name = group['group_type'])
            #         if not group_type.exists():
            #             group_type_ser = GroupTypeSerializer(data = {'name': group['group_type']})
            #             if group_type_ser.is_valid():
            #                 group_type = group_type_ser.save()
            #             else:
            #                 for ingredient in ingredients:
            #                     ingredient['ingredient'].delete()
            #                 recipe.delete()
            #                 print("ERROR: GroupType Serializer was not valid.")
            #                 return Response(group_type_ser.errors, status = status.HTTP_500_INTERNAL_SERVER_ERROR)

            #         else:
            #             group_type = group_type[0]

            #         group_ser = GroupSerializer(data = {'name': group['name'], 'group_type': group_type.pk})
            #         if group_ser.is_valid():
            #             groups.append({
            #                 'group': group_ser.save(),
            #                 'desc': group['desc']
            #             })
            #         else:
            #             for group in groups:
            #                 groups['group'].delete()
            #             for ingredient in ingredients:
            #                 ingredient['ingredient'].delete()
            #             recipe.delete()
            #             print("ERROR: Group Serializer was not valid.")
            #             return Response(group_ser.errors, status = status.HTTP_500_INTERNAL_SERVER_ERROR)
            #     else:
            #         groups.append({
            #             'group': query_set[0],
            #             'desc': group['desc']
            #         })
            
            recipe_ingredients = []
            for ingredient in ingredients:
                recipe_ingredient = RecipeIngredientSerializer(data = {
                    'recipe': recipe.pk,
                    'ingredient': ingredient['ingredient'].pk,
                    'measure': ingredient['measure'],
                    'unit': ingredient['unit']
                })
                if recipe_ingredient.is_valid():
                    recipe_ingredients.append(recipe_ingredient.save())
                else:
                    for group in groups:
                            groups['group'].delete()
                    for ingredient in ingredients:
                        ingredient['ingredient'].delete()
                    for recipe_ingredient in recipe_ingredients:
                        recipe_ingredient.delete()
                    recipe.delete()
                    print("ERROR: RecipeIngredient Serializer was not valid.")
                    return Response(recipe_ingredient.errors, status = status.HTTP_500_INTERNAL_SERVER_ERROR)
            
            # recipe_groups = []
            # for group in groups:
            #     recipe_group = RecipeGroupSerializer(data = {
            #         'recipe': recipe.pk,
            #         'ingredient': group['group'].pk,
            #         'desc': group['desc'],
            #     })
            #     if recipe_group.is_valid():
            #         recipe_groups.append(recipe_group.save())
            #     else:
            #         for group in groups:
            #                 groups['group'].delete()
            #         for ingredient in ingredients:
            #             ingredient['ingredient'].delete()
            #         for recipe_ingredient in recipe_ingredients:
            #             recipe_ingredient.delete()
            #         for recipe_group in recipe_groups:
            #             recipe_group.delete()
            #         recipe.delete()
            #         print("ERROR: RecipeGroup Serializer was not valid.")
            #         return Response(recipe_group.errors, status = status.HTTP_500_INTERNAL_SERVER_ERROR)
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
def get_group_by_type(request, group_type):
    if request.method == 'GET':
        group_type = GroupType.objects.filter(name = group_type)
        groups = Group.objects.filter(group_type = group_type)

@api_view(['GET'])
def reset_database(request):
    if request.method == 'GET':
        data = Recipe.objects.all()
        for recipe in data:
            recipe.delete()
        
        data = Ingredient.objects.all()
        for ingredient in data:
            ingredient.delete()

        data = GroupType.objects.all()
        for group_type in data:
            group_type.delete()

        data = Group.objects.all()
        for group in data:
            group.delete()
        
        data = RecipeIngredient.objects.all()
        for recipe_ingredient in data:
            recipe_ingredient.delete()

        data = RecipeGroup.objects.all()
        for recipe_group in data:
            recipe_group.delete()
    
        return Response(status = status.HTTP_205_RESET_CONTENT)
    
        
