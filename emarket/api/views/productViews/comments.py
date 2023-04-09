from django.contrib.auth import get_user
from rest_framework.decorators import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import status
from rest_framework_simplejwt.authentication import JWTAuthentication

from api.utils import get_buyer, get_product, get_user_id_from_token
from api.models import Comment
from api.serializers.commmentSerializers import CommentSerializer

class Comments(APIView):

    authentication_classes = [JWTAuthentication ]
    permission_classes = [IsAuthenticated]


    # Get all comments for a particular product
    def get(self, request, pk):

        comments = Comment.objects.filter(product_id=pk)
        serializer = CommentSerializer(comments, many=True)

        return Response(serializer.data)

    def post(self, request, pk):

        commentor_id = get_user_id_from_token(request)
        ser = CommentSerializer(data=request.data, context={'commentor_id': commentor_id, 'product_id': pk})
        if ser.is_valid():
            ser.save()
            return Response({})
        return Response(status=status.HTTP_400_BAD_REQUEST)



