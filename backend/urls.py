from django.urls import path
from . import views

urlpatterns = [
        path('', views.home),
        path('signIn/', views.signIn),
        path('signUp/', views.signUp),
        path('current_user/', views.curr_user),
        path('log_out/', views.log_out),
        path('search/', views.search),
        path('search-review/', views.search_review),
        path('location/', views.location_getter),    
        path('user_list/', views.user_list),    
        ]
