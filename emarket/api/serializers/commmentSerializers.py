from rest_framework import serializers

from api.models.productModels import Comment, Product
from api.models.customerModels import Customer


class CommentSerializer(serializers.ModelSerializer):

    commentor = serializers.CharField(read_only=True)


    class Meta:
        model = Comment
        fields = ("comment", 'commentor')

    def create(self, validated_data):
        # Get the seller id from the view and add it to the serialzer
        commentor_id = self.context.get('commentor_id')
        commentor = Customer.objects.get(pk=commentor_id)

        product_id = self.context.get('product_id')
        product = Product.objects.get(pk=product_id)

        validated_data['commentor_id'] = commentor
        validated_data['product_id'] = product

        comment = Comment.objects.create(**validated_data)

        return comment

    def to_representation(self, instance):
        representation =  super().to_representation(instance)
        representation['commentor'] = str(instance.commentor_id)

        return representation
