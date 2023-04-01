# All the apis here will start with the url /api/seller/

from rest_framework.parsers import FormParser, JSONParser, MultiPartParser
from rest_framework.views import APIView, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.db import IntegrityError

from api.serializers.productSerializers import  InterestedSerializer, ProductDetailSellerSerializer,  ProductDetailSerializer, ProductSerializer
from api.utils import get_product, get_user_id_from_token
from api.models import  Interested, Product

class ProductsSeller(APIView):

    parser_classes = [JSONParser, MultiPartParser, FormParser]
    authentication_classes = [JWTAuthentication ]
    permission_classes = [IsAuthenticated]

    # For grid view in myproducts page
    def get(self, request):
        seller_id = get_user_id_from_token(request)
        products = Product.objects.filter(seller_id=seller_id)
        serilaizer = ProductSerializer(products, many=True)
        return Response(serilaizer.data)

    # To add new product
    def post(self, request):
        seller_id = get_user_id_from_token(request)
        serializer = ProductDetailSerializer(data=request.data, context={'seller_id':seller_id})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

# Get request to get the info that is displayed in myproduct/:id page
# Only seller can call it
# PUT to update the product
# DELETE to remove the product
class ProductDetailedSeller(APIView):
    parser_classes = [JSONParser, MultiPartParser, FormParser]
    authentication_classes = [JWTAuthentication ]
    permission_classes = [IsAuthenticated]

    # Get request to get the info that is displayed in myproduct/:id page
    def get(self, request, pk):

        caller_id = get_user_id_from_token(request)
        product = get_product(pk)
        seller = product.seller

        if seller.id != caller_id:
            return Response(data={"message": "Accessible only to seller"},status=status.HTTP_403_FORBIDDEN)

        serializer = ProductDetailSerializer(product)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # To update the product
    def put(self, request, pk):

        user_id = get_user_id_from_token(request)
        product = get_product(pk)

        if product is None:
            return Response(data={"message": "product not found"},status=status.HTTP_404_NOT_FOUND)

        if user_id != product.seller_id:
            return Response(data={"message": "Accessible only to seller"},status=status.HTTP_403_FORBIDDEN)

        serializer = ProductDetailSerializer(product, data = request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # To delete the product
    def delete(self, request, pk):

        user_id = get_user_id_from_token(request)

        product = get_product(pk)
        if product is None:
            return Response(data={"message": "product not found"},status=status.HTTP_400_BAD_REQUEST)

        if user_id != product.seller_id:
            return Response(data={"message": "Accessible only to seller"},status=status.HTTP_403_FORBIDDEN)

        product.delete() # Deletes images in the Image model and deletes the images from the file system

        return Response(status=status.HTTP_200_OK)


class ProductInterestedSeller(APIView):

    # Get info of interested_peeps
    def get(self, request, pk):

        product = get_product(pk)
        seller = product.seller
        caller_id = get_user_id_from_token(request)

        if product is None:
            return Response(data={"message": "product not found"},status=status.HTTP_400_BAD_REQUEST)

        if seller.id != caller_id:
            return Response(data={"message": "Accessible only to seller"},status=status.HTTP_403_FORBIDDEN)

        interested_peeps = Interested.objects.filter(product=product)
        serializer = InterestedSerializer(interested_peeps, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    # To accept/reject the interest of the buyer
    def post(self, request):
        pass
