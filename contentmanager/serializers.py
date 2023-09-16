from rest_framework import serializers
from .models import *

class RecipeSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['pk'] = str(representation['pk'])   
        return representation

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
            'pk',
            'recipe',
            'ingredient',
            'measure',
            'unit',
        )

class RecipeGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecipeGroup
        fields = (
            'pk',
            'recipe',
            'group',
            'desc',
        )
