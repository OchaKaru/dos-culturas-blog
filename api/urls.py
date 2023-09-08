from django.urls import path, re_path
from . import views

# URLConf
urlpatterns = [
    path('get-all-recipes/', views.get_all_recipes),
    re_path(r'get-recipes-by-group/(?P<group>[A-z-&_]+)/$', views.get_recipes_by_group),
    path('post-new-recipe/', views.post_new_recipe),
    path('get-all-groups/', views.get_all_groups),
    re_path(r'get-groups-by-type/(?P<group_type>[A-z&_]+)/$', views.get_groups_by_type),
    path('get-all-ingredients/', views.get_all_ingredients),
    path('reset-database/', views.reset_database),
]