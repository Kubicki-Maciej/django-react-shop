#Django


from django.shortcuts import render

# Imported model

from base.models import Product, Order, OrderItem, ShippingAddress

# RestFramework
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser

# handler to custom message
from rest_framework import status

# Serializer 
from base.serializer import ProductSerializer, OrderSerializer



# ORDER VIEWS


# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def add_order_items(request):
#     user = request.user
#     data = request.data 
#     orderItems = data['orderItems']

#     if orderItems and len(orderItems) == 0:
         
#         return Response({'detail':'No order items'}, status=status.HTTP_400_BAD_REQUEST)
#     else:
#         print()
#         # create order 
#         order = Order.objects.create(
#             user=user,
#             payment_method=data['paymentMethod'],
#             tax_price=data['taxPrice'],
#             shipping_price=data['shippingPrice'],
#             total_price=data['totalPrice'],
            
#         )

#         shipping_address = ShippingAddress.objects.create(
#             order = order,
#             address = data['shippingAddress']['address'],
#             city = data['shippingAddress']['city'],
#             postal_code = data['shippingAddress']['postalCode'],
#             country = data['shippingAddress']['country'],
#         )


#         for item in orderItems:
#             product = Product.objects.get(_id=item['product'])
            
#             itemModel = OrderItem.objects.create(
#                 product=product,
#                 order=order,
#                 name=product.name,
#                 qty=item['qty'],
#                 price=item['price'],
#                 image=product.image.url,
#             )
#             # UpdateStock
#             product.count_in_stock -= item.qty
#             product.save()
        
#         # create shipping address
#         # loop order items 
#         # create order items
#         # updatestock
        
#         serializer = OrderSerializer(order, many=False)
#         return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_order_items(request):
    print('run order')
    user = request.user
    data = request.data

    orderItems = data['orderItems']

    if orderItems and len(orderItems) == 0:
        return Response({'detail': 'No Order Items'}, status=status.HTTP_400_BAD_REQUEST)
    else:

        # (1) Create order

        order = Order.objects.create(
            user=user,
            payment_method=data['paymentMethod'],
            tax_price=data['taxPrice'],
            shipping_price=data['shippingPrice'],
            total_price=data['totalPrice'],
        )

        # (2) Create shipping address

        shipping_address = ShippingAddress.objects.create(
            order = order,
            address = data['shippingAddress']['address'],
            city = data['shippingAddress']['city'],
            postal_code = data['shippingAddress']['postalCode'],
            country = data['shippingAddress']['country'],
        )

        # (3) Create order items adn set order to orderItem relationship
        for i in orderItems:
            product = Product.objects.get(_id=i['product'])

            item = OrderItem.objects.create(
                product=product,
                order=order,
                name=product.name,
                qty=i['qty'],
                price=i['price'],
                image=product.image.url,
            )

            # (4) Update stock

            product.count_in_stock -= item.qty
            product.save()

        serializer = OrderSerializer(order, many=False)
        return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_order_by_id(request, pk):
    user = request.user

    order = Order.objects.get(_id=pk)
    # testuser@gmail.com p dk0062m4 order 10
    print(order)
    try:
        if user.is_staff or order.user == user:
            serializer = OrderSerializer(order, many=False)

            return Response(serializer.data)
        else:
            Response({'detail': 'Not authorizzed to view this order'}, 
            status=status.HTTP_400_BAD_REQUEST)

    except:
        return Response({'detail': 'Order does not exists'}, 
            status=status.HTTP_400_BAD_REQUEST)