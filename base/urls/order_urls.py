from django.urls import path

from base.views import order_views as views

urlpatterns = [
    path('', views.getOrders, name='orders'),
    path('add/', views.addOrderItems, name='order-add'),
    path('userorders/', views.getUserOrders, name='user-orders'),

    path('<str:orderId>/', views.getOrderByID, name='user-order'),

    path('<str:orderId>/pay/', views.updateOrderToPaid, name='pay'),
    path('<str:orderId>/deliver/', views.updateOrderToDelivered, name='deliver'),


]
