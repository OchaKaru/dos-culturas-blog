from rest_framework import serializers
from .models import *

class RecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = (
            'pk',
            'image',
            'name',
            'desc',
            'steps',
        )

class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = (
            'pk',
            'name',
        )

class GroupTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = (
            'pk',
            'name',
        )

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = (
            'pk',
            'name',
            'group_type',
        )

class RecipeIngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecipeIngredient
        fields = (
            'recipe',
            'ingredient',
            'measure',
            'unit',
        )

class RecipeGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecipeGroup
        fields = (
            'recipe',
            'group',
            'desc',
        )
