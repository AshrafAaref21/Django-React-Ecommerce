from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from base.serializers import ProductSerializer
from base.models import Product, Review


@api_view(['GET'])
def getProducts(request):
    query = request.query_params.get('keyword')
    page = request.query_params.get('page')
    # print('query: ', query)
    if query == None or query == 'null':
        query = ''
    products = Product.objects.filter(name__icontains=query)
    paginator = Paginator(products, 4)

    try:
        products = paginator.page(page)
    except PageNotAnInteger:
        products = paginator.page(1)
    except EmptyPage:
        products = paginator.page(paginator.num_pages)

    if page == None:
        page = 1

    page = int(page)

    serialized_products = ProductSerializer(products, many=True)

    return Response({'products': serialized_products.data,
                     'page': page,
                     'pages': paginator.num_pages})


@api_view(['GET'])
def getTopProducts(request):
    products = Product.objects.filter(rating__gte=4).order_by('-rating')[:5]
    serialized_products = ProductSerializer(products, many=True)
    return Response(serialized_products.data)


@api_view(['GET'])
def getProduct(request, productId):
    product = Product.objects.get(_id=productId)
    serialized_product = ProductSerializer(product, many=False)
    return Response(serialized_product.data)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    data = request.data
    # print(data)
    user = request.user
    # print(user)
    product = Product.objects.create(
        user=user,
        **data
    )
    serialized_product = ProductSerializer(product, many=False)
    return Response(serialized_product.data)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request, productId):
    data = request.data
    product = Product.objects.get(_id=productId)

    product.name = data['name']
    product.price = data['price']
    product.brand = data['brand']
    product.countInStock = data['countInStock']
    product.category = data['category']
    product.description = data['description']

    product.save()
    serialized_product = ProductSerializer(product, many=False)
    return Response(serialized_product.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request, productId):
    product = Product.objects.get(_id=productId)
    product.delete()
    return Response("Product's Deleted")


@api_view(['POST'])
def uploadImage(request):
    data = request.data
    product_id = data["productId"]
    product = Product.objects.get(_id=product_id)
    product.image = request.FILES.get('image')
    product.save()

    return Response('image was uploaded successfully')


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request, productId):
    user = request.user
    product = Product.objects.get(_id=productId)
    data = request.data

    # 1 - Review already Exists
    isExist = product.review_set.filter(user=user).exists()
    if isExist:
        return Response({'details': "product's aleardy reviewed"}, status=status.HTTP_400_BAD_REQUEST)
    # 2 - No Rating
    elif data['rating'] == 0:
        return Response({'details': "Please Select a rating"}, status=status.HTTP_400_BAD_REQUEST)
    # 3 Create Review
    else:
        review = Review.objects.create(
            user=user,
            product=product,
            name=user.first_name,
            rating=data['rating'],
            comment=data['comment']
        )
        reviews = product.review_set.all()
        product.numReviews = len(reviews)

        total = 0

        for i in reviews:
            total += i.rating

        product.rating = total / len(reviews)
        product.save()

        return Response('Review\'s Added')
