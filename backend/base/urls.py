from django.urls import path 
from . import views

urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path('products/', views.get_products, name="get_products"),
    path('products/<str:pk>', views.get_single_product, name="get_single_product")
]