from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from rest_framework import status

from api.serializers.userSerializers import CustomerSerializer
from api.models.customerModels import Customer


def index(request):
    return HttpResponse("In user view right now")


# Takes email and username, returns token if the user is found, else returns error
@api_view(['POST'])
def signin(request):
    data = JSONParser().parse(request)
    try:
        customer = Customer.objects.get(email=data['email'])
    except Customer.DoesNotExist:
        return HttpResponse(status=status.HTTP_404_NOT_FOUND)
    serializer = CustomerSerializer(customer)
    return JsonResponse(serializer.data, status=status.HTTP_200_OK)

# Takes email, username and contact, adds the new user to database and returns the token
@api_view(['POST'])
def signup(request):
    data = JSONParser().parse(request)
    serializer = CustomerSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse(serializer.data,status=status.HTTP_201_CREATED)
    return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

