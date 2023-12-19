#Django
from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.hashers import make_password

# Imported model
from .product import products
from .models import Product
from django.contrib.auth.models import User
# RestFramework
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser

# handler to custom message
from rest_framework import status

# Serializer 
from .serializer import ProductSerializer, UserSerializer, UserSerializerWithToken

# JWT 
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView






class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):
        data = super().validate(attrs)
        serializer = UserSerializerWithToken(self.user).data
        

        # data['username'] = self.user.username
        # data['email'] = self.user.email

        for k, v in serializer.items():
            data[k] = v

        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

# Create your views here.
@api_view(['GET'])
def getRoutes(request):
    routes = [
        'jeden',
        'dwa',
        ]
    return Response(routes)

# Response dziala tylko wtedy kiedy ma dekorator api_view. https://www.django-rest-framework.org/api-guide/views/#api_view

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


# USERS


@api_view(['POST'])
def register_user(request):
    data = request.data
    # print(f'Data: {data}')
    try:
        user = User.objects.create(
            first_name=data['name'],
            username=data['email'],
            email=data['email'],
            password=make_password(data['password'])
        )
        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
    except:
        message = {'detail' : 'User with this email already exists'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_profile(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_users(request):
    """ return list of products"""
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

