from django.urls import path
from api.views import userViews
from api.views import productViews

urlpatterns = [
    # All user related views
    path('users/', userViews.index),
    path('users/signin', userViews.signin),
    path('users/signup', userViews.signup),

    # All product related views
    path('products/', productViews.index),
]
