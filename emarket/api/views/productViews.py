from rest_framework.parsers import FormParser, JSONParser, MultiPartParser
from rest_framework.views import APIView, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.db import IntegrityError

from api.serializers.productSerializers import ProductDetailBuyerSerializer,  ProductDetailSerializer, ProductSerializer
from api.utils import get_user_id_from_token
from api.models import Customer, Interested, Product

# GET to get grid view of products
# POST to add a new product
# TODO: Add different query params: one for search, one for sorting, one for categories and so on...

class Products(APIView):

    authentication_classes = [JWTAuthentication ]
    permission_classes = [IsAuthenticated]
    parser_classes = [JSONParser, MultiPartParser, FormParser]

    def get(self, request):
        _type = request.query_params.get('type')
        user_id = get_user_id_from_token(request)
        if _type == 'seller':
            # Products whose seller is the caller of api will be extracted here
            products = Product.objects.filter(seller=user_id)
        elif _type == 'interested':
            # Products present in the caller cart will be extracted
            # TODO: Join Interested table and Product table
            pass
        else:
            # All products will be extract here
            products = Product.objects.all()
        serilaizer = ProductSerializer(products, many=True)
        return Response(serilaizer.data)


    def post(self, request):
        seller_id = get_user_id_from_token(request)
        serializer = ProductDetailSerializer(data=request.data, context={'seller_id':seller_id})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

# Get to get detailed view of product
# cart query param in get to add/remove from the cart
# POST to edit the info of the product
# TODO: Small refactoring
class ProductsDetailed(APIView):

    parser_classes = [JSONParser, MultiPartParser, FormParser]
    authentication_classes = [JWTAuthentication ]
    permission_classes = [IsAuthenticated]


    def get_product(self, pk):
        try:
            return Product.objects.get(pk=pk)
        except Product.DoesNotExist:
            return None

    def get(self, request, pk):
        buyer_id = get_user_id_from_token(request)
        buyer = Customer.objects.get(pk=buyer_id)
        interested = request.query_params.get('interested')

        # Extract the product
        product = self.get_product(pk)
        if product is None:
            return Response(data={"message": "product not found"},status=status.HTTP_404_NOT_FOUND)


        #TODO: See a good way to handle different query params instead of many if else statements
        if interested == "true":
            # Add product into the callers cart
            interest = Interested(product=product, buyer=buyer)
            try:
                interest.save()
                return Response(status=status.HTTP_200_OK)
            except IntegrityError :
                return Response(data={"message": "product already added to cart"},status=status.HTTP_409_CONFLICT)


        elif interested == "false":
            # Remove product from callers cart
            try:
                interest = Interested.objects.get(product=product, buyer=buyer)
                interest.delete()
                return Response(status=status.HTTP_200_OK)
            except Interested.DoesNotExist:
                return Response(data={"message": "product is not in cart"},status=status.HTTP_404_NOT_FOUND)

        seller = product.seller

        """
        if buyer_id == seller.id:
            # Sellers mode

            # Join query
            interested = Interested.objects.filter(
            serializer = ProductDetailSellerSerializer({'product': product, 'interested_buyers': })

        else:
        """
    # Buyers mode
    # Check and extract other details and send it to the serializer

        contact = None
        interest_obj = None

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
        serializer = ProductDetailBuyerSerializer({'product': product, 'interested': interested, 'contact': contact, 'email': email, 'username': username})
        return Response(serializer.data)

    # To post the product
    # Should be accessible only to the seller of the product
    def put(self, request, pk):
        user_id = get_user_id_from_token(request)

        product = self.get_product(pk)
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
    # Should be accessible only to the seller of the product
    def delete(self, request, pk):
        user_id = get_user_id_from_token(request)

        product = self.get_product(pk)
        if product is None:
            return Response(data={"message": "product not found"},status=status.HTTP_400_BAD_REQUEST)

        if user_id != product.seller_id:
            return Response(data={"message": "Accessible only to seller"},status=status.HTTP_403_FORBIDDEN)

        product.delete() # Deletes images in the Image model and deletes the images from the file system

        return Response(status=status.HTTP_200_OK)

class Test(APIView):
    parser_classes = [JSONParser]

    def get(self, request):

        product_info = Product.objects.get(pk=1)
        seller_info = Product.objects.get(pk=1)

        info = ProductDetailBuyerSerializer({'product_info': product_info, 'seller_info': seller_info})
        return Response(info.data)

