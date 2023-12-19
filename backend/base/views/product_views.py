#Django
from django.shortcuts import render

# Imported model
from base.product import products
from base.models import Product

# RestFramework
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser

# handler to custom message
from rest_framework import status

# Serializer 
from base.serializer import ProductSerializer



# PRODUCTS


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
