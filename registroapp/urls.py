# -*- coding: utf-8 -*-

from django.conf.urls import url,patterns
from . import views as MViews 
from django.contrib.auth.decorators import login_required, permission_required

urlpatterns = [
   url(r'^$',MViews.Index),
   url(r'^saveprofile/$',MViews.Register, name='saveprofile'),
   url(r'^getsettings/$',MViews.getSettings, name='getsettings'),
   url(r'^savesettings/$',MViews.saveSettings, name='savesettings'),
   url(r'^addfont/$',MViews.addFont,name='addfont'),
]

