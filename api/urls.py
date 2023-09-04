from django.urls import path
from . import views

# URLConf
urlpatterns = [
    path('get-all-recipes/', views.get_all_recipes),
    path('get-all-groups/', views.get_all_groups),
    path('get-groups-by-type/', views.get_group_by_type),
    path('post-new-recipe/', views.post_new_recipe),
    path('reset-database/', views.reset_database),
]