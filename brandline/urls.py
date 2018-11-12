from django.conf.urls import include, url
from django.contrib import admin
from django.conf.urls.static import static
from django.conf import settings
from django.contrib.auth.decorators import login_required, permission_required

urlpatterns = [

    #url(r'^admon/', include('doctor.urls')),
    url(r'^', include('mainapp.urls')),
    #url(r'^admins/', include(admins.site.urls)),
    url(r'^admins/', include('admins.urls')),
    url(r'^registro/', include('registroapp.urls')),
    url(r'^cfg/', include('configurador.urls')),
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)