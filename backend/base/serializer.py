from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Product, Order, OrderItem, ShippingAddress
from rest_framework_simplejwt.tokens import RefreshToken


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    is_admin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'name', 'is_admin']

    def get_is_admin(self, obj):
        return obj.is_staff

    def get_name(self, obj):
        name = obj.first_name

        if name == '':
            name = obj.email

        return name

class UserSerializerWithToken(UserSerializer):

    token = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'name', 'is_admin', 'token']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)

class ShippingSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = ShippingAddress
        fields = '__all__'


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):
    orders_items = serializers.SerializerMethodField(read_only=True)
    shipping_address = serializers.SerializerMethodField(read_only=True)
    user = serializers.SerializerMethodField(read_only=True)


    class Meta:
        model = Order
        fields = '__all__'
    # 
    # czemu tu musi byc get_ordersItems a nie get_orders_item ??? gdzie to jest wykorzystywane ? 
    def get_orders_items(self, obj):
        items = obj.orderitem_set.all()
        serializers = OrderItemSerializer(items, many=True)
        return serializers.data

    def get_shipping_address(self, obj):
        try:
            address = ShippingSerializer(obj.shippingaddress, many=False).data
            
        except:
            address = False
        return address

    def get_user(self, obj):
        user = obj.user
        serializers = UserSerializer(user, many=False)
        return serializers.data
