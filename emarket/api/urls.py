from django.urls import path
from api.views import userViews
from api.views import productViews
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [

    # Token related paths
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # All user related views
    path('users/', userViews.index.as_view()),
    path('users/signin/', userViews.signin),
    path('users/signup/', userViews.signup),

    # All product related views

    path('products/', productViews.Products.as_view()),
]
