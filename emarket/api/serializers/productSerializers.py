from rest_framework import serializers
from api.models.productModels import Product


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'cost', 'images', 'buyer_id']


