from django.contrib.admin.options import Paginator
from django.http import HttpResponse
from rest_framework.parsers import JSONParser
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication

from api.utils import get_user_id_from_token
from api.models.productModels import Product

class products(APIView):
    #authentication_classes = [JWTAuthentication ]
    #permission_classes = [IsAuthenticated]

    # Get info of all products in the paginated form
    def get(self, request):
        products = Product.objects.all() # TODO: Should actually extract only few fields...
        paginator = Paginator(products, 10)
        page_obj = paginator.get_page(request.GET.get('page')) # Hoping this to work... Verify later
        return Response({'products': page_obj}, status=status.HTTP_200_OK)

    # Add a new product to the db
    def post(self, request):
        u_id = get_user_id_from_token(request)
        return Response({'user_id': u_id}, status=status.HTTP_200_OK)
