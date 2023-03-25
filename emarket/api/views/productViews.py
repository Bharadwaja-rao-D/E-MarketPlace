from rest_framework.parsers import FormParser, JSONParser, MultiPartParser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

from api.models.productModels import Product
from api.serializers.productSerializers import ProductDetailSerializer, ProductSerializer
from api.utils import get_user_id_from_token

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
# POST to edit the info of the product
class ProductsDetailed(APIView):

    parser_classes = [JSONParser]

    def get(self, request, pk):
        product = Product.objects.get(pk=pk)
        serializer = ProductDetailSerializer(product)
        return Response(serializer.data)
