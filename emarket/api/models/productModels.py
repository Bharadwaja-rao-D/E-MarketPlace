#TODO: Add a seperate table sold product

import os
from django.db import models
from django.dispatch import receiver
from api.models.customerModels import Customer


def user_images_path(instance, filename):
    return 'images/{0}/{1}'.format(instance.product.seller.id, filename)


class Product(models.Model):
    name = models.CharField(max_length=30)
    actual_cost = models.PositiveIntegerField()
    selling_cost = models.PositiveIntegerField()
    description = models.CharField(max_length=100)
    date_of_purchase = models.DateField()
    seller = models.ForeignKey(
        Customer, on_delete=models.CASCADE, related_name='seller_id')

    def __str__(self):
        return self.name


class Image(models.Model):
    image = models.ImageField(upload_to=user_images_path)
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name='images')

    def __str__(self):
        return self.image.name


class Comments(models.Model):
    comment = models.CharField(max_length=100)
    product_id = models.ForeignKey(Product, on_delete=models.CASCADE)
    commentor_id = models.ForeignKey(Customer, on_delete=models.CASCADE)

    def __str__(self):
        return "product: %s, commentor: %s and comment: %s" % (self.product_id, self.commentor_id, self.comment)


class Interested(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    buyer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    accept = models.BooleanField(default=False)

    class Meta:
        unique_together = (('product', 'buyer'),)

@receiver(models.signals.post_delete, sender=Image)
def auto_delete_file_on_delete(sender, instance, **kwargs):
    """
    Deletes file from filesystem
    when corresponding `Product` object is deleted.
    """
    if instance.image:
        if os.path.isfile(instance.image.path):
            os.remove(instance.image.path)

