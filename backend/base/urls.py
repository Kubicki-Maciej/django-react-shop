from django.urls import path 
from . import views

# JWT 
# from rest_framework_simplejwt.views import (
#     TokenObtainPairView,
# )


urlpatterns = [
    path('user/login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('users/register/', views.register_user, name="register_user"),
    path('users/profile/', views.get_user_profile, name="get_user_profile"),
    path('users/', views.get_users, name="get_users"),

    path('', views.getRoutes, name="routes"),
    
    path('products/', views.get_products, name="get_products"),
    path('products/<str:pk>', views.get_single_product, name="get_single_product"),

]