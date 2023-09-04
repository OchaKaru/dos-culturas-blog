from django.db import models as dj

# Create your models here.
class Recipe(dj.Model):
    image = dj.CharField(max_length = 70)
    name = dj.CharField(max_length = 70)
    desc = dj.TextField()
    steps = dj.TextField()

class Ingredient(dj.Model):
    name = dj.CharField(max_length = 50)

class GroupType(dj.Model):
    name = dj.CharField(max_length = 50)

class Group(dj.Model):
    name = dj.CharField(max_length = 50)
    group_type = dj.ForeignKey(GroupType, on_delete = dj.CASCADE)

class RecipeIngredient(dj.Model):
    recipe = dj.ForeignKey(Recipe, on_delete = dj.CASCADE)
    ingredient = dj.ForeignKey(Ingredient, on_delete = dj.CASCADE)
    measure = dj.FloatField()
    unit = dj.CharField(max_length = 20)

class RecipeGroup(dj.Model):
    recipe = dj.ForeignKey(Recipe, on_delete = dj.CASCADE)
    group = dj.ForeignKey(Group, on_delete = dj.CASCADE)
    desc = dj.TextField()
