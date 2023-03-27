from rest_framework import serializers
from api.models import Product, Image
from api.models import Customer

class ImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ('image', 'id')

# Used in the grid view of home page
# where only name, cost, age and a single image is displayed
class ProductSerializer(serializers.ModelSerializer):

    # Nesting serializers will automatically perform inner joins
    image = ImagesSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = ('id', 'name', 'cost', 'date_of_purchase', 'image')

    def to_representation(self, instance):
        representation =  super().to_representation(instance)
        first_img = Image.objects.filter(product=instance).order_by('id').first()
        if first_img:
            representation['image'] = ImagesSerializer(first_img).data
        else:
            representation['image'] = None

        return representation



# To get the detailed info of a product
class ProductDetailSerializer(serializers.ModelSerializer):
    images = ImagesSerializer(many=True, read_only=True) # To send images present in db
    uploaded_images = serializers.ListField(
            child=serializers.ImageField(allow_empty_file=False, use_url=False),
            write_only=True
            ) # To add/upload new images into the db

    class Meta:
        model = Product
        fields = ('id', 'name', 'cost', 'description', 'date_of_purchase', 'images', 'uploaded_images')

    def create(self, validated_data):
        # Get the seller id from the view and add it to the serialzer
        seller_id = self.context.get('seller_id')
        seller = Customer.objects.get(pk=seller_id)
        validated_data['seller'] = seller
        uploaded_images = validated_data.pop('uploaded_images')
        product = Product.objects.create(**validated_data)

        for img in uploaded_images:
            Image.objects.create(product=product, image=img)

        return product

