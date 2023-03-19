from django.db import models
from api.models.customerModels import Customer

class Product(models.Model):
    name = models.CharField(max_length=30)
    cost = models.PositiveIntegerField()
    description = models.CharField(max_length=100)
    age = models.CharField(max_length=10)
    seller_id = models.ForeignKey( Customer, on_delete=models.CASCADE, related_name='seller_id')
    buyer_id = models.ForeignKey(Customer, on_delete=models.CASCADE, null=True, related_name='buyer_id')

    folder_name = 'images'+str(seller_id)
    images = models.ImageField(upload_to=folder_name)

    def __str__(self):
        return self.name


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

