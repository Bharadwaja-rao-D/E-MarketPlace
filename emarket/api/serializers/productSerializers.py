from rest_framework import serializers
from api.models import Product, Image


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'cost', 'images', 'buyer_id']


class ImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = "__all__"

class ProductAddSerializer(serializers.ModelSerializer):
    images = ImagesSerializer(many=True, read_only=True)
    uploaded_images = serializers.ListField(
            child=serializers.ImageField(allow_empty_file=False, use_url=False),
            write_only=True
            )

    class Meta:
        model = Product
        fields = ('id', 'name', 'cost', 'description', 'age', 'seller', 'images', 'uploaded_images')

    def create(self, validated_data):
        uploaded_images = validated_data.pop('uploaded_images')
        product = Product.objects.create(**validated_data)

        for img in uploaded_images:
            print(img)
            Image.objects.create(product=product, image=img)

        return product
