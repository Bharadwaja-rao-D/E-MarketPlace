from django.db import models
from api.models.customerModels import Customer

def user_images_path(instance, filename):
    return 'images/{0}/{1}'.format(instance.product.seller.id, filename)



class Product(models.Model):
    name = models.CharField(max_length=30)
    cost = models.PositiveIntegerField()
    description = models.CharField(max_length=100)
    date_of_purchase = models.DateField()
    seller = models.ForeignKey( Customer, on_delete=models.CASCADE, related_name='seller_id')
    buyer = models.ForeignKey(Customer, on_delete=models.CASCADE, null=True, blank=True, related_name='buyer_id')

    def __str__(self):
        return self.name


class Image(models.Model):
    image = models.ImageField(upload_to=user_images_path)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='images')

    def __str__(self):
        return self.image.name

class Comments(models.Model):
    comment = models.CharField(max_length=100)
    product_id = models.ForeignKey(Product, on_delete=models.CASCADE)
    commentor_id = models.ForeignKey(Customer, on_delete=models.CASCADE)

    def __str__(self):
        return "product: %s, commentor: %s and comment: %s" % (self.product_id, self.commentor_id, self.comment)

class Interested(models.Model):
    product_id = models.ForeignKey(Product, on_delete=models.CASCADE)
    buyer_id = models.ForeignKey(Customer, on_delete=models.CASCADE)
    accept = models.BooleanField(default=False)

