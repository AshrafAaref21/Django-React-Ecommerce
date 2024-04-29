from typing import Any, Dict

from django.contrib.auth.hashers import make_password
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response

from django.contrib.auth.models import User


from base.serializers import UserSerializer, UserSerializerWithToken

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    def validate(self, attrs: Dict[str, Any]) -> Dict[str, str]:
        data = super().validate(attrs)
        serializer = UserSerializerWithToken(self.user).data

        for k, v in serializer.items():
            data[k] = v
        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['POST'])
def registerUser(request):
    data = request.data
    try:
        user = User.objects.create(
            first_name=data['name'],
            username=data['email'],
            email=data['email'],
            password=make_password(data['password'])
        )
        serializeed_user = UserSerializerWithToken(user, many=False)
        return Response(serializeed_user.data)

    except:
        message = {'details': 'User with this email aleardy exists'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user = request.user
    serialized_user = UserSerializer(user, many=False)
    user.first_name = request.data['name']
    user.username = request.data['email']
    user.email = request.data['email']
    if request.data['password'] != '':
        user.password = make_password(request.data['password'])
    user.save()
    return Response(serialized_user.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    serialized_user = UserSerializerWithToken(user, many=False)
    return Response(serialized_user.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.all()
    serialized_users = UserSerializer(users, many=True)
    return Response(serialized_users.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteUser(request, userId):
    user_delete = User.objects.get(id=userId)
    user_delete.delete()
    return Response("User's Successfully Deleted")


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUserById(request, userId):
    user = User.objects.get(id=userId)
    serialized_user = UserSerializer(user, many=False)
    return Response(serialized_user.data)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateUser(request, userId):
    user = User.objects.get(id=userId)
    serialized_user = UserSerializer(user, many=False)
    user.first_name = request.data['name']
    user.username = request.data['email']
    user.email = request.data['email']
    if request.data['isAdmin'] == 'on' or request.data['isAdmin'] == True:
        user.is_staff = True
    else:
        user.is_staff = False

    user.save()
    return Response(serialized_user.data)
