from django.shortcuts import render
from django.http import JsonResponse

# Imported model
from .product import products
from .models import Product

# RestFramework
from rest_framework.response import Response
from rest_framework.decorators import api_view

# Serializer 
from .serializer import ProductSerializer


# Create your views here.
@api_view(['GET'])
def getRoutes(request):
    routes = [
        'jeden',
        'dwa',
        ]
    return Response(routes)


# Response dziala tylko wtedy kiedy ma dekorator api_view. https://www.django-rest-framework.org/api-guide/views/#api_view


@api_view(['GET'])
def get_products(request):
    """ return list of products"""
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)



@api_view(['GET'])
def get_single_product(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)    
    return Response(serializer.data)



