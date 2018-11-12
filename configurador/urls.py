# -*- coding: utf-8 -*-

from django.conf.urls import url,patterns
from . import views as MViews 
from django.contrib.auth.decorators import login_required, permission_required


urlpatterns = [

   url(r'^$', login_required(MViews.Inicio), name='inicio'),    
   url(r'^upfont/$', login_required(MViews.upFont), name='upfont'),
   url(r'^savecolors/$', login_required(MViews.saveColors), name='savecolors'),
   url(r'^saverejects/$', login_required(MViews.saveRejects), name='saverejects'),
   url(r'^rmcolor/$', login_required(MViews.rmColor), name='rmcolor'),
   url(r'^fontusage/$', login_required(MViews.FontUsage), name='fontusage'),
   url(r'^fontdefaultusage/$', login_required(MViews.FontsetUsage), name='fontdefaultusage'),
   url(r'^savegroup/$', login_required(MViews.saveGroup), name='savegroup'),
   url(r'^saveusuario/$', login_required(MViews.saveUsuario), name='saveusuario'),
   url(r'^rmusuario/$', login_required(MViews.rmUsuario), name='rmusuario'),
   url(r'^cfgpage/$', login_required(MViews.cfgPage), name='cfgpage'),



]

