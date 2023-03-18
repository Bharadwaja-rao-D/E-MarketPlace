from rest_framework_simplejwt.tokens import AccessToken

def get_user_id_from_token(request):
    auth_header = request.headers.get('Authorization')
    token = auth_header.split(' ')[1]
    decoded = AccessToken(token)
    user_id = decoded['user_id']
    return user_id

