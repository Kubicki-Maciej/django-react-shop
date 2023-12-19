from django.urls import path 
from base.views import order_views as views



urlpatterns = [
    path('add/', views.add_order_items, name="order-add"),
    path('<str:pk>/', views.get_order_by_id, name="get-order-by-id"),
]