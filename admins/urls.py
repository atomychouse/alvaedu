# -*- coding: utf-8 -*-

from django.conf.urls import url,patterns
from . import views as MViews 
from django.contrib.auth.decorators import login_required, permission_required


urlpatterns = [
   url(r'^addmodule/$', (MViews.addModule), name='addmodule'),    
   url(r'^additem/$', (MViews.addItem), name='additem'),
   url(r'^addbanco/$', (MViews.addBanco), name='addbanco'),
   url(r'^addfile/$', (MViews.addFile), name='addfile'),
   url(r'^addsec/$', (MViews.addSection), name='addsec'),
   url(r'^savesec/$', (MViews.saveSection), name='savesec'),
   url(r'^savecol/$', (MViews.saveCol), name='savecol'),
   url(r'^rmsection/$', (MViews.rmSec), name='rmsection'),


   url(r'^rmimg/$', (MViews.rmImg), name='rmimg'),
   url(r'^saveimg/$', (MViews.saveImg), name='saveimg'),

   url(r'^savegrid/$', (MViews.saveGrid), name='savegrid'),
   url(r'^savevideo/$', (MViews.saveVideo), name='savevideo'),
   url(r'^saveaviso/$', (MViews.saveAviso), name='saveaviso'),
   url(r'^savebanco/$', (MViews.saveBanco), name='savebanco'),
   url(r'^savecat/$', (MViews.saveCat), name='savecat'),   
   url(r'^savecatbanco/$', (MViews.savecatbanco), name='savecatbanco'),
   url(r'^savetress/$', (MViews.saveMDimg), name='savetress'),
   url(r'^savehtml/$', (MViews.saveHt), name='savehtml'),
   url(r'^savenota/$', (MViews.saveNota), name='savenota'),
   url(r'^reorder/$', (MViews.reorderRw), name='reorder'),
   url(r'^publicar/$', (MViews.Publicar), name='publicar'),
   url(r'^savert/$', (MViews.saveRT), name='savert'),
   url(r'^fontusage/$', (MViews.fontUsage), name='fontusage'),
   url(r'^savecromatico/$', (MViews.saveCromatico), name='savecromatico'),
   url(r'^savenmarkas/$', (MViews.saveMarka), name='savenmarkas'),
   url(r'^updatecfg/$', (MViews.updateCfg), name='updatecfg'),

   
   url(r'^rmitem/$', (MViews.rmItem), name='rmitem'),
   url(r'^rmcat/$', (MViews.rmCat), name='rmcat'),

   url(r'^confg/$', (MViews.confgItm), name='confg'),

]

