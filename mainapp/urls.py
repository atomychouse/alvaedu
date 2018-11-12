# -*- coding: utf-8 -*-

from django.conf.urls import url,patterns
from . import views as MViews 
from django.contrib.auth.decorators import login_required, permission_required


urlpatterns = [
   url(r'^$',MViews.Index),
   url(r'^sections/$', (MViews.getSection), name='sections'),    
   url(r'^login/$', (MViews.Vlogin), name='login'),
   url(r'^dw/$', (MViews.Download), name='dw'),    
   url(r'^singin/$', MViews.Sin,name='singin'),
   url(r'^reccorreo/$', MViews.RecoverSend,name='reccorreo'),
   url(r'^singon/$', (MViews.Son),name='singon'),
   url(r'^assigpass/$',MViews.Assignpass,name='assigpass'),
   url(r'^section/(?P<lugy>[\w-]+)/$',(MViews.Index), name='section'),   
   url(r'^section/(?P<secty>[\w-]+)/(?P<columna>[\w-]+)/(?P<lugy>[\w-]+)$',(MViews.Index), name='section'),   
   url(r'^recover/(?P<pk>[\w-]+)/(?P<tmstamp>\d+\.\d+)/$',MViews.Recovers,name="recover"),   
   url(r'^contacto$', (MViews.Sender),name='contacto'),
   url(r'^dycss/dynamic.css$',MViews.dyCss,name='dycss'),
   url(r'^dycss/user-fonts.css$',MViews.userFonts,name='dycss'),




]

