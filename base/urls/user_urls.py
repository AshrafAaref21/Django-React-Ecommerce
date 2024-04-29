from django.urls import path
from base.views import user_views as views


urlpatterns = [

    path('', view=views.getUsers, name='users'),
    path('login/', views.MyTokenObtainPairView.as_view(),
         name='token_obtain_pair'),

    path('<str:userId>/', view=views.getUserById, name='user'),
    path('delete/<str:userId>/', view=views.deleteUser, name='delete-user'),
    path('update/<str:userId>/', view=views.updateUser, name='update-user'),

    path('register/', view=views.registerUser, name='register'),
    path('profile/', view=views.getUserProfile, name='user-profile'),
    path('profile/update/', view=views.updateUserProfile,
         name='update-user-profile'),
]
