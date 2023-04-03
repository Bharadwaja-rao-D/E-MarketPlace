from rest_framework.generics import GenericAPIView
from rest_framework.parsers import FormParser, JSONParser, MultiPartParser
from rest_framework.views import APIView, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.db import IntegrityError
from drf_yasg.utils import swagger_auto_schema

from api.serializers.productSerializers import ProductDetailBuyerSerializer,  ProductSerializer
from api.utils import get_buyer, get_product
from api.models import  Interested, Product

# GET to get grid view of products
# POST to add a new product
# TODO: Add different query params: one for search, one for sorting, one for categories and so on...

class Products(GenericAPIView):

    authentication_classes = [JWTAuthentication ]
    permission_classes = [IsAuthenticated]
    parser_classes = [JSONParser, MultiPartParser, FormParser]
    serializer_class = ProductSerializer

    #@swagger_auto_schema(method='get', query_serializer=ProductSerializer)
    def get(self, request):
        products = Product.objects.all()
        serilaizer = ProductSerializer(products, many=True)
        return Response(serilaizer.data)


# Get to get detailed view of product
class ProductsDetailedBuyer(GenericAPIView):

    parser_classes = [JSONParser, MultiPartParser, FormParser]
    authentication_classes = [JWTAuthentication ]
    permission_classes = [IsAuthenticated]
    serializer_class = ProductDetailBuyerSerializer

    #@swagger_auto_schema( request_body=ProductDetailBuyerSerializer)

    def get(self, request, pk):

        # Extract the product
        product = get_product(pk)
        buyer = get_buyer(request)

        if product is None:
            return Response(data={"message": "product not found"},status=status.HTTP_404_NOT_FOUND)


        seller = product.seller
        contact = None

        # If there as an entry in interested table and the accept is true then give sellers contact, else no
        try:
            interest_obj = Interested.objects.get(product=product, buyer=buyer)
            interested = True
            if interest_obj.accept:
                contact = seller.contact
        except Interested.DoesNotExist:
            interested = False

        email = seller.email
        username = seller.username

        serializer = ProductDetailBuyerSerializer({
            'product': product, 'interested': interested, 'contact': contact, 'email': email, 'username': username
            })
        return Response(serializer.data, status=status.HTTP_200_OK)



class ProductInterestedBuyer(GenericAPIView):

    parser_classes = [JSONParser, MultiPartParser, FormParser]
    authentication_classes = [JWTAuthentication ]
    permission_classes = [IsAuthenticated]
    serializer_class = ProductSerializer


    # Get products in the cart for grid view
    def get(self, request):
        products = Product.objects.all()
        serilaizer = ProductSerializer(products, many=True)
        return Response(serilaizer.data)

    # To add product into the cart
    def post(self, request, pk):

        product = get_product(pk)
        buyer = get_buyer(request)

        if product is None:
            return Response(data={"message": "product not found"},status=status.HTTP_404_NOT_FOUND)

        interest = Interested(product=product, buyer=buyer)

        try:
            interest.save()
            return Response(status=status.HTTP_200_OK)
        except IntegrityError :
            return Response(data={"message": "product already added to cart"},status=status.HTTP_409_CONFLICT)


    # To delete the product from the cart
    def delete(self, request, pk):

        product = get_product(pk)
        buyer = get_buyer(request)

        # Remove product from callers cart
        try:
            interest = Interested.objects.get(product=product, buyer=buyer)
            interest.delete()
            return Response(status=status.HTTP_200_OK)
        except Interested.DoesNotExist:
            return Response(data={"message": "product is not in cart"},status=status.HTTP_404_NOT_FOUND)



