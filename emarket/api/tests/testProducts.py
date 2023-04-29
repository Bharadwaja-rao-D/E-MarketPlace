from rest_framework.test import APITestCase
from rest_framework_simplejwt.views import status
from api.models import Product
from api.serializers.productSerializers import ProductSerializer
from api.models.customerModels import Customer


class ProductTests(APITestCase):


    email = 'testuser@email.com'
    contact = '999999999'
    name = 'test_user'

    def setUp(self):

        self.user = Customer(username = self.name, email = self.email, contact = self.contact)
        self.client.force_authenticate(user=self.user)

    def test_add_product(self):
        url = '/api/products/seller/'
        data = {'name': 'test product1', 'actual_cost': 500, 'selling_cost': 200,
                'description': ' Product added for testing purposes', 'date-of-purchase': '2022-04-28'}
        res = self.client.post(url, data, fromat='json')
        print(res)

    def test_all_products(self):

        url = '/api/products/'
        res = self.client.get(url)
        self.assertEqual(res.status_code, status.HTTP_200_OK)

