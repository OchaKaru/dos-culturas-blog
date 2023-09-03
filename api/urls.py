from django.urls import path
from . import views

# URLConf
urlpatterns = [
    path('get-all-recipes/', views.get_all_recipes)
]