from rest_framework.parsers import FormParser, JSONParser, MultiPartParser
from rest_framework.views import APIView, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.db import IntegrityError

from api.serializers.productSerializers import ProductDetailSerializer, ProductSerializer
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
class ProductsDetailed(APIView):

    parser_classes = [JSONParser]
    authentication_classes = [JWTAuthentication ]
    permission_classes = [IsAuthenticated]


    def get(self, request, pk):
        buyer_id = get_user_id_from_token(request)
        buyer = Customer.objects.get(pk=buyer_id)
        interested = request.query_params.get('interested')
        product = Product.objects.get(pk=pk)

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
                return Response(data={"message": "product is not in cart"},status=status.HTTP_400_BAD_REQUEST)


        serializer = ProductDetailSerializer(product)
        return Response(serializer.data)
