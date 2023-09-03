from rest_framework import serializers
from .models import *

class RecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = (
            'pk',
            'source',
            'name',
            'desc',
            'steps'
        )

class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = (
            'pk',
            'name'
        )

class RecipeGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = (
            'pk',
            'name',
            'group_type',
            'desc'
        )

class RecipeIngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecipeIngredient
        fields = (
            'recipe',
            'ingredients',
            'measure',
            'unit'
        )

class RecipeGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecipeGroup
        fields = (
            'recipe',
            'group',
        )
