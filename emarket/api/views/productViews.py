from rest_framework.parsers import JSONParser, MultiPartParser
from rest_framework.views import APIView
from rest_framework.response import Response
from api.models.productModels import Product
from api.serializers.productSerializers import ProductSerializer

class Products(APIView):

    parser_classes = [JSONParser, MultiPartParser]

    def get(self, request):
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)
