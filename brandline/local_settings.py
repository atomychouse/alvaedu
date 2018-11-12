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

EMAIL_HOST = 'mail.atomyc.house'
EMAIL_HOST_USER = 'rios@atomyc.house'
EMAIL_HOST_PASSWORD = 'saruman999'
DEFAULT_FROM_EMAIL = 'rios@atomyc.house'
SERVER_EMAIL = 'rios@atomyc.house'
EMAIL_PORT = 25
EMAIL_USE_TLS = False
