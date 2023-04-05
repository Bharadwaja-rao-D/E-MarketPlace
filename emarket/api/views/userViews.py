import requests
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from api.serializers.userSerializers import CustomerSerializer
from api.models.customerModels import Customer
from api.utils import get_user_id_from_token


# A protected resource
class index(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        u_id = get_user_id_from_token(request)
        return Response({'user_id': u_id}, status=status.HTTP_200_OK)

    def post(self, request):
        u_id = get_user_id_from_token(request)
        return Response({'user_id': u_id}, status=status.HTTP_200_OK)


def get_user_info(token):
    url = "https://www.googleapis.com/oauth2/v1/userinfo?access_token="+token
    profile = requests.get(url, headers={"Authorization": "Bearer "+token})
    return profile.json()


@api_view(['POST'])
def signin(request):
    data = JSONParser().parse(request)
    token = data['token']
    profile = get_user_info(token)
    email = profile['email']
    name = profile['name']

    try:
        customer = Customer.objects.get(username=name, email=email)
    except Customer.DoesNotExist:
        return Response({}, status=status.HTTP_404_NOT_FOUND)

    refresh = RefreshToken.for_user(customer)
    return Response({
        'token': {
            'refresh': str(refresh),
            'access': str(refresh.access_token)
        },
        'profile': profile
    }, status=status.HTTP_200_OK)


@api_view(['POST'])
def signup(request):
    data = JSONParser().parse(request)
    token = data['token']
    contact = data['contact']
    profile = get_user_info(token)
    email = profile['email']
    name = profile['name']

    customer = {'email': email, 'username': name, 'contact': contact}
    serializer = CustomerSerializer(data=customer)
    if serializer.is_valid():
        serializer.save()
        customer = Customer.objects.get(username=name, email=email)
        refresh = RefreshToken.for_user(customer)
        return Response({
            'token': {
                'refresh': str(refresh),
                'access': str(refresh.access_token)
            },
            'profile': profile
        }, status=status.HTTP_200_OK)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
