from rest_framework.parsers import FormParser, JSONParser, MultiPartParser
from rest_framework.views import APIView
from rest_framework.response import Response
from api.models.productModels import Product
from api.serializers.productSerializers import ProductSerializer, ProductAddSerializer

class Products(APIView):

    parser_classes = [JSONParser, MultiPartParser, FormParser]


    def post(self, request):
        serializer = ProductAddSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)
