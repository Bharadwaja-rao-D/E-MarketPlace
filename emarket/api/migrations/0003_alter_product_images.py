# Generated by Django 4.1.7 on 2023-03-18 07:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_product_interested_comments'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='images',
            field=models.ImageField(upload_to='images<django.db.models.fields.related.ForeignKey>'),
        ),
    ]
