from django.urls import path
from base.views import product_views as views

urlpatterns = [

    path('', view=views.getProducts, name='products'),
    path('create/', view=views.createProduct, name='create-product'),
    path('upload/', view=views.uploadImage, name='image-upload'),
    path('top/', view=views.getTopProducts, name='top-products'),

    path('<str:productId>/', view=views.getProduct, name='product'),
    path('<str:productId>/reviews/',
         view=views.createProductReview, name='create-review'),
    path('delete/<str:productId>/',
         view=views.deleteProduct, name='delete-product'),
    path('update/<str:productId>/',
         view=views.updateProduct, name='update-product'),

]
