from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication

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


# Takes email and username, returns token if the user is found, else returns error
@api_view(['POST'])
def signin(request):

    data = JSONParser().parse(request)
    try:
        customer = Customer.objects.get(email=data['email'])
    except Customer.DoesNotExist:
        return HttpResponse(status=status.HTTP_404_NOT_FOUND)
    refresh = RefreshToken.for_user(customer)
    return Response({
        'token': {
            'refresh': str(refresh),
            'access': str(refresh.access_token)
        }
    }, status=status.HTTP_200_OK)


# Takes email, username and contact, adds the new user to database and returns the token
class Signup(APIView):
    parser_classes = [JSONParser]

    def post(self, request):
        data = JSONParser().parse(request)
        serializer = CustomerSerializer(data=data)
        if serializer.is_valid():
            try:
                serializer.save()
            except Customer.IntegrityError:
                return Response({}, status=status.HTTP_400_BAD_REQUEST)
            user = Customer.objects.get(email=serializer.data['email'])
            refresh = RefreshToken.for_user(user)
            return Response({
                'token': {
                    'refresh': str(refresh),
                    'access': str(refresh.access_token)
                }
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    """
    def put(self, request):
        serializer = CustomerSerializer(data=request.data)
        user = Customer.objects.get(email=email)
        if serializer.is_valid():
            try:
                serializer.save()
            except Customer.IntegrityError:
                return Response({}, status=status.HTTP_400_BAD_REQUEST)
            user = Customer.objects.get(email=serializer.data['email'])
            refresh = RefreshToken.for_user(user)
            return Response({
                'token': {
                    'refresh': str(refresh),
                    'access': str(refresh.access_token)
                }
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    """

