from rest_framework_simplejwt.tokens import AccessToken
from rest_framework.pagination import PageNumberPagination
from api.models import Customer, Product

def get_user_id_from_token(request):
    auth_header = request.headers.get('Authorization')
    token = auth_header.split(' ')[1]
    decoded = AccessToken(token)
    user_id = decoded['user_id']
    return user_id

def get_product(pk):
    try:
        return Product.objects.get(pk=pk)
    except Product.DoesNotExist:
        return None

def get_buyer(request):
    buyer_id = get_user_id_from_token(request)
    return Customer.objects.get(pk=buyer_id)


class MyPaginationClass(PageNumberPagination):
    page_size = 12
    page_query_param = 'page'
    page_size_query_param = 'page_size'
    max_page_size = 100
