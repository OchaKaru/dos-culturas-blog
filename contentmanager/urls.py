from django.urls import path, re_path
from . import views

# URLConf
urlpatterns = [
    # functional views
    path('get_all_recipes/', views.get_all_recipes),
    re_path(r'get_recipe_by_id/(?P<id>[0-9]+)/$', views.get_recipe_by_id),
    re_path(r'get_recipes_by_group/(?P<group>[A-z\-&_]+)/$', views.get_recipes_by_group),
    path('get_random_recipes/', views.get_random_recipes),
    path('get_groups_by_type/', views.get_groups_by_type),

    # change this endpoint to be more secure for the backend
    path('post_new_recipe/', views.post_new_recipe),

    # testing/debugging views
    re_path(r'get_recipe_by_name/(?P<recipe>[A-z\-_\(\)/]+)/$', views.get_recipe_by_name),
    path('get_all_groups/', views.get_all_groups),
    path('get_all_ingredients/', views.get_all_ingredients),
    path('reset_database/', views.reset_database),
]