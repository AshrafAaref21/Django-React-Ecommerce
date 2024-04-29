from typing import Any, Dict
from base.models import Product, Order, OrderItem, ShippingAddress
from base.serializers import ProductSerializer, OrderSerializer
from rest_framework.response import Response

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from django.views.decorators.csrf import requires_csrf_token
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user = request.user
    print(user)
    data = request.data
    print(data)
    orderItems = data['orderItems']
    print('orderItem: ', orderItems)
    if orderItems and len(orderItems) == 0:
        return Response({'detail': 'No order Items'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        order = Order.objects.create(
            user=user,
            paymentMethod=data['paymentMethod'],
            taxPrice=data['taxPrice'],
            shippingPrice=data['shippingPrice'],
            totalPrice=data['totalPrice']
        )

        shipping = ShippingAddress.objects.create(
            order=order,
            address=data['shippingAddress']['address'],
            city=data['shippingAddress']['city'],
            country=data['shippingAddress']['country'],
            postalCode=data['shippingAddress']['postalCode'],
        )

        for i in orderItems:
            product = Product.objects.get(_id=i['product'])
            item = OrderItem.objects.create(
                product=product,
                order=order,
                name=product.name,
                qty=i['qty'],
                price=i['price'],
                image=product.image.url
            )
            product.countInStock -= item.qty
            product.save()

        serializer = OrderSerializer(order, many=False)
        return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderByID(request, orderId):
    user = request.user
    try:
        order = Order.objects.get(_id=orderId)

        if user.is_staff or order.user == user:
            serialized_order = OrderSerializer(order, many=False)
            return Response(serialized_order.data)
        else:
            return Response({"detail": "Not Autherized To See This Order"},
                            status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({"detail": "Order Is Not Exist"},
                        status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserOrders(request):
    user = request.user
    orders = user.order_set.all()
    orders_serializer = OrderSerializer(orders, many=True)
    return Response(orders_serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateOrderToPaid(request, orderId):
    order = Order.objects.get(_id=orderId)
    order.isPaid = True
    order.paidAt = datetime.now()
    order.save()

    return Response('Order Was Paid')


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getOrders(request):
    orders = Order.objects.all()
    orders_serializer = OrderSerializer(orders, many=True)
    return Response(orders_serializer.data)


@api_view(['PUT'])
# @permission_classes([IsAdminUser])
@requires_csrf_token
def updateOrderToDelivered(request, orderId):
    print("user: ", request.user)
    order = Order.objects.get(_id=orderId)
    order.isDelivered = True
    order.deliveredAt = datetime.now()
    order.save()

    return Response('Order Was Delivered')
