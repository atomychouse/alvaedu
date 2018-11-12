import os
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


'''
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql', 
        'NAME': 'norma',
        'USER': 'root',
        'PASSWORD': 'master',
        'HOST': 'localhost',   # Or an IP Address that your DB is hosted on
        'PORT': '3306',
    }
}

'''


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'brand.sqlite3'),
    }
}


STATICFILES_DIRS = (
    # os.path.join(BASE_DIR, 'static'),
    # os.path.join(BASE_DIR, 'manager', 'static'),
    os.path.join(os.path.abspath(os.path.dirname(__file__) + '/..'), 'static'),
    )

STATIC_ROOT = os.path.join(os.path.abspath(os.path.dirname(__file__) + '/..'), 'statics/')
STATIC_URL = '/static/'


LOGIN_URL = "/"
LOGIN_REDIRECT_VIEW = "/"
LOGOUT_URL = "/logout/"

EMAIL_HOST = 'mail.normatividadclaro.com'
EMAIL_HOST_USER = 'claro@normatividadclaro.com'
EMAIL_HOST_PASSWORD = 's4nt4scachuchas'
DEFAULT_FROM_EMAIL = 'claro@normatividadclaro.com'
SERVER_EMAIL = 'claro@normatividadclaro.com'
EMAIL_PORT = 25
EMAIL_USE_TLS = False
