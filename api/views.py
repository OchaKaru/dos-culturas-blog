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

@api_view(['GET'])
def get_all_groups(request):
    if request.method == 'GET':
        data = Group.objects.all()
        serializer = GroupSerializer(data, context = {'request': request}, many = True)
        return Response(serializer.data)

@api_view(['GET'])
def get_group_by_type(request):
    if request.method == 'GET':
        pass
