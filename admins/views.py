# -*- coding: utf-8 -*-

from django.http import HttpResponse
from django.shortcuts import redirect, render, render_to_response
from django.template.context import RequestContext
from django.views.generic import View
from django.contrib.auth.models import User,Group
from brandline.modelforms import FormCreator
from django import forms
import simplejson
import datetime
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.hashers import make_password
from django.core.mail import send_mail, BadHeaderError
from brandline.settings import EMAIL_HOST
from django.core.mail import send_mail, BadHeaderError
from django.core.exceptions import ValidationError
from admins.models import * 
from django.views.decorators.csrf import csrf_exempt
from django.core.mail import send_mail
from django.template.defaultfilters import slugify
import time
import os
from django.conf import settings
import mimetypes
from django.contrib.sites.shortcuts import get_current_site
from django.core.mail import EmailMultiAlternatives

from django.core.files.base import ContentFile
from io import BytesIO
from base64 import b64decode
from PIL import Image,ImageFont,ImageDraw 
from django.utils.html import escape

class addModule(View):
    template = ''

    def get(self,request):

        data = request.GET.copy()        
        secpk = data.get('secpk',None)
        config = data.get('config',None)
        item = data.get('items',None)


        if secpk:
            secid = Section.objects.get(pk=data['secpk'])
            parms = {
                    'mdtitle':data['title'],
                    'slugmd':data['slug'],
                    'orden':data['orden'],
                    'icono':data['icono'],
                    'secpk':secid
                    }

            if config:
                parms['config']=config

            newmodule = Modulo(**parms)
            newmodule.save()

            if data['slug'] in ['richtxt']:
                exta = Modextra(modulopk=newmodule,contenido=data['contenido'])
                exta.save()

            if item:
                item
                item_build = {}
                itemsended = simplejson.loads(item)
                try:
                    del itemsended['downs']
                except:
                    pass

                try:
                    configitm = simplejson.dumps(itemsended['config'])
                    itemsended['config'] = configitm
                except:
                    pass
                itemsended['modulopk']=newmodule
                

                try:
                    del itemsended['img']
                except:
                    pass


                try:
                    del itemsended['oldimg']
                except:
                    pass

                if data['slug'] in ['imglg','gridlink','gridimages','color']:
                    itmaded = MD_grid(**itemsended)
                    itmaded.save()
                    retorno = {'ok':1,'saved':newmodule.pk,'itempk':itmaded.pk}


                if data['slug'] in ['sideimg']:

                    itmaded = MD_grid(**itemsended)
                    itmaded.save()
                    retorno = {'ok':1,'saved':newmodule.pk,'itempk':itmaded.pk}



                if data['slug'] in ['video']:
                    itmaded = MD_video(**itemsended)
                    itmaded.save()
                    retorno = {'ok':1,'saved':newmodule.pk,'itempk':itmaded.pk}

                if data['slug'] in ['aviso']:
                    itmaded = Modextra(**itemsended)
                    itmaded.save()
                    retorno = {'ok':1,'saved':newmodule.pk,'itempk':itmaded.pk}


                if data['slug'] in ['tabla']:
                    itemsended['contenido'] = item
                    itmaded = Modextra(**itemsended)
                    itmaded.save()
                    retorno = {'ok':1,'saved':newmodule.pk,'itempk':itmaded.pk}


                if data['slug'] in ['tipografia']:

                    itmsaver = {'modulopk':newmodule,'contenido':item,'orden':1,'typo':u'categoría'}
                    itmaded = Modextra(**itmsaver)
                    itmaded.save()
                    retorno = {'ok':1,'saved':newmodule.pk,'itempk':itmaded.pk}

                if data['slug'] in ['cromatico']:
                    arritm = simplejson.loads(item)
                    itemtoadd = {'modulopk':newmodule,'categoria':arritm['categoria'],'orden':arritm['orden']}
                    itmaded = Modcromatico(**itemtoadd)
                    itmaded.save()
                    retorno = {'ok':1,'saved':newmodule.pk,'itempk':itmaded.pk}


                if data['slug'] in ['tressesenta','ambientes']:
                    parms = {'modulopk':newmodule}
                    itmaded = MD_img(**parms)
                    itmaded.save()
                    retorno = {'ok':1,'saved':newmodule.pk,'itempk':itmaded.pk}

                if data['slug'] in ['banco']:
                    parms = {'modulopk':newmodule}
                    itmaded = MD_banco(**parms)
                    itmaded.save()
                    retorno = {'ok':1,'saved':newmodule.pk,'itempk':itmaded.pk}

                if data['slug'] in ['notasref']:
                    parms = {}
                    parms['modulopk'] = newmodule
                    parms['configs'] = configitm
                    itmaded = MD_imgtxt(**parms)
                    itmaded.save()
                    retorno = {'ok':1,'saved':newmodule.pk,'itempk':itmaded.pk}

            else:
                retorno = {'ok':1,'saved':newmodule.pk}

        else:
            retorno = {'ok':0,'failed':'no section get'}


        return HttpResponse(simplejson.dumps(retorno))

    def post(self,request):

        data = request.POST.copy()        
        secpk = data.get('secpk',None)
        

        if secpk:
            secid = Section.objects.get(pk=data['secpk'])
            parms = {
                    'mdtitle':data['title'],
                    'slugmd':data['slug'],
                    'orden':data['orden'],
                    'icono':data['icono'],
                    'secpk':secid
                    }

            newmodule = Modulo(**parms)
            newmodule.save()
            
            if data['slug'] in ['richtxt','aviso']:
                exta = Modextra(modulopk=newmodule,contenido=data['contenido'])
                exta.save()



            retorno = {'ok':1,'saved':newmodule.pk}

        else:
            retorno = {'ok':0,'failed':'no section get'}


        return HttpResponse(simplejson.dumps(retorno))

addModule = addModule.as_view()



class addItem(View):
    template = ''
    def get(self,request):

        data = request.GET.copy()

        principales = request.GET.getlist('principales')
        apoyo = request.GET.getlist('apoyo')
        barra = request.GET.getlist('barra')
        listapan = request.GET.getlist('listapan')

        modpk = data.get('pk',None)
        submodpk = data.get('submodpk',None)


        xx = [simplejson.loads(x) for x in principales]
        principales = simplejson.dumps(xx)

        xx = [simplejson.loads(x) for x in apoyo]
        apoyo = simplejson.dumps(xx)

        xx = [simplejson.loads(x) for x in barra]
        barra = simplejson.dumps(xx)

        listapan = simplejson.dumps(listapan)




        if submodpk:
            parms = {

            'estilo':data['estilo'],
            'principales':principales,
            'apoyo':apoyo,
            'barra':barra,
            'listapan':listapan
                    }

            newmodule = MD_codigo_color.objects.get(pk=submodpk)
            newmodule.principales=principales
            newmodule.apoyo=apoyo
            newmodule.barra=barra
            newmodule.listapan=listapan
            newmodule.estilo = data.get('estilo','rounded')

            newmodule.save()

            retorno = {'ok':1,'saved':newmodule.pk}

        if modpk and not submodpk:
            modid = Modulo.objects.get(pk=modpk)

            parms = {

            'modulopk':modid, 
            'estilo':data['estilo'],
            'principales':principales,
            'apoyo':apoyo,
            'barra':barra,
            'listapan':listapan
                    }

            newmodule = MD_codigo_color(**parms)
            newmodule.save()

            retorno = {'ok':1,'saved':newmodule.pk}

        return HttpResponse(simplejson.dumps(retorno))

addItem = addItem.as_view()


class saveGrid(View):
    def post(self,request):
        data = request.POST.copy()
        pk = data.get('pk',None)
        rowpk = data.get('rowpk',None)
        imagens = data.get('imagen',None)
        isvideo = data.get('isvideo',0)
        response = {}
        lista_fiels = ['title','link','descp','contenido','orden']
        params = {}
        webimage = ''
        if rowpk:
            modpk = Modulo.objects.get(pk=rowpk)
        else:
            return HttpResponse(simplejson.dumps({'message':'No se especifico el Modulo'}))


        if pk:
            if data['slug'] in'video':
                modulo = MD_video.objects.get(pk=pk)
            elif data['slug'] in'notasref':
                modulo = MD_imgtxt.objects.get(pk=pk)                
            elif data['slug']=='banco':
                modulo = MD_banco.objects.get(pk=pk)
                modulo.isvideo = isvideo
            else:
                modulo = MD_grid.objects.get(pk=pk)
                modulo.descp = data.get('descp',None)
        
        else:
            if data['slug']=='video':
                modulo = MD_video(modulopk=modpk)
            elif data['slug']=='notasref':
                modulo = MD_imgtxt(modulopk=modpk)
            elif data['slug']=='banco':
                modulo = MD_banco(modulopk=modpk)
            else:
                modulo = MD_grid(modulopk=modpk)

        for x in lista_fiels:
            dato = data.get(x,None)
            if dato:
                modulo.__setattr__(x,dato)

        modulo.publicado = False
        modulo.save()


        if imagens:
            if  not 'static/' in imagens:
                imagen = imagens.decode('base64') 
                original = Image.open(BytesIO(imagen))
                name_imagen = 'grids.%s'%original.format.lower()
                imagensafe = ContentFile(imagen,name_imagen)
                modulo.webimage = imagensafe
                modulo.save()
                webimage = modulo.webimage.name

        response = {'itmpk':modulo.pk,'webimage':webimage,'mensagge':u'La información se gurado con éxito'}




        return HttpResponse(simplejson.dumps(response))


    def get(self,request):

        data = request.POST.copy()
        pk = data.get('pk',None)
        imagens = request.POST.get('imagen',None)
        modpk = request.POST.get('mdpk',None)
        modulopk=Modulo.objects.get(pk=modpk)
        datos = {}
        dats = ['modulopk','title','link','orden','descp']
        for x in dats:
            datos[x]=data.get(x,None)
        datos['modulopk']=modulopk
        title=datos['title']
        orden = datos['orden']
        link = datos['link']
        descp = datos['descp']
        imagensafe = None
        if data:
            if imagens:
                if  not 'static/' in imagens:
                    imagen = imagens.decode('base64') 
                    original = Image.open(BytesIO(imagen))
                    name_imagen = 'webimage.%s'%original.format.lower()
                    datos['webimage'] = ContentFile(imagen,name_imagen)
                    imagensafe = ContentFile(imagen,name_imagen)
            
            if pk:
                saved = MD_grid.objects.get(pk=pk)
                for x in dats:
                    saved.__setattr__(x,datos[x])
                saved.save()
                if imagensafe:
                    saved.webimage = imagensafe
                    saved.save()

            else:    
                saved = MD_grid(**datos)
                saved.save()

            retorno = {'ok':1,'saved':saved.pk}


        else:
            retorno = {'ok':0,'failed':'no section get'}


        return HttpResponse(simplejson.dumps(retorno))

saveGrid = saveGrid.as_view()




class saveImg(View):
    template = ''
    def post(self,request):

        data = request.POST.copy()
        pk = data.get('pk',None)
        typo = data.get('typ_img',None)
        imagens = request.POST.get('imagen',None)
        if imagens and pk:
            imagen = imagens.decode('base64') 
            original = Image.open(BytesIO(imagen))
            name_imagen = 'webimage.%s'%original.format.lower()
            imagensafe = ContentFile(imagen,name_imagen)            
            
            if typo=='notasref':
                if pk:
                    saved = MD_imgtxt.objects.get(pk=pk)
                    saved.imagen = imagensafe
                    saved.save()
                retorno = {'ok':1,'web':saved.imagen.name}
            else:
                if pk:
                    saved = MD_grid.objects.get(pk=pk)
                    saved.webimage = imagensafe
                    saved.save()
                retorno = {'ok':1,'web':saved.webimage.name}



        else:
            retorno = {'ok':0,'failed':'no element given'}


        return HttpResponse(simplejson.dumps(retorno))

saveImg = saveImg.as_view()




class rmImg(View):
    template = ''
    def post(self,request):

        data = request.POST.copy()
        pk = data.get('pk',None)
        typo = data.get('typ_img',None)            
        if typo=='notasref':
            if pk:
                saved = MD_imgtxt.objects.get(pk=pk)
                saved.imagen = imagensafe
                saved.save()
            retorno = {'ok':1,'web':saved.imagen.name}
        else:
            if pk:
                saved = MD_grid.objects.get(pk=pk)
                os.remove(saved.webimage.path)                    
                saved.webimage = None
                saved.save()
            retorno = {'ok':1}

        return HttpResponse(simplejson.dumps(retorno))

rmImg = rmImg.as_view()



class saveVideo(View):
    template = ''
    def post(self,request):

        data = request.POST.copy()
        pk = data.get('pk',None)
        modpk = request.POST.get('mdpk',None)
        modulopk=Modulo.objects.get(pk=modpk)
        datos = {}
        dats = ['modulopk','title','link','orden','descp']
        for x in dats:
            datos[x]=data.get(x,None)
        datos['modulopk']=modulopk
        title=datos['title']
        orden = datos['orden']
        link = datos['link']
        descp = datos['descp']

        if data:
            if pk:
                saved = MD_video.objects.get(pk=pk)
                for x in dats:
                    saved.__setattr__(x,datos[x])
                saved.save()

            else:    
                saved = MD_video(**datos)
                saved.save()

            retorno = {'ok':1,'saved':saved.pk}


        else:
            retorno = {'ok':0,'failed':'no section get'}


        return HttpResponse(simplejson.dumps(retorno))

saveVideo = saveVideo.as_view()


class saveAviso(View):
    template = ''
    def post(self,request):

        data = request.POST.copy()
        pk = data.get('pk',None)
        modpk = request.POST.get('mdpk',None)
        modulopk=Modulo.objects.get(pk=modpk)
        datos = {}
        dats = ['modulopk','typo','orden','contenido']
        for x in dats:
            datos[x]=data.get(x,None)
        datos['modulopk']=modulopk
        orden = datos['orden']
        contenido = datos['contenido']
        typo = datos['typo']

        if data:
            if pk:
                saved = Modextra.objects.get(pk=pk)
                for x in dats:
                    saved.__setattr__(x,datos[x])
                saved.save()

            else:    
                saved = Modextra(**datos)
                saved.save()

            retorno = {'ok':1,'saved':saved.pk}


        else:
            retorno = {'ok':0,'failed':'no section get'}


        return HttpResponse(simplejson.dumps(retorno))

saveAviso = saveAviso.as_view()


class rmItem(View):
    template = ''
    def post(self,request):
        data = request.POST.copy()
        pk = request.POST.get('pk',None)
        mdpk = request.POST.get('mdpk',None)

        if pk:
            if data['module'] in ['imglg','gridlink','gridimages']:
                d = MD_grid.objects.get(pk=data['pk'])
                d.delete()
            if data['module'] in ['video']:
                d = MD_video.objects.get(pk=data['pk'])
                d.delete()
            if data['module'] in ['banco']:
                d = MD_banco.objects.get(pk=data['pk'])
                d.delete()
            if data['module'] in ['dwbanco','dwgrid']:
                d = Dwns.objects.get(pk=data['pk'])
                d.delete()
            if data['module'] in ['aviso']:
                d = Modextra.objects.get(pk=data['pk'])
                d.delete()
            if data['module'] in ['notasref']:
                d = MD_imgtxt.objects.get(pk=data['pk'])
                d.delete()
            if data['module'] in ['cromatico']:
                d = Modcromatico.objects.get(pk=data['pk'])
                d.delete()
            if data['module'] in ['tipografia']:
                d = Modextra.objects.get(pk=data['pk'])
                d.delete()

        else:
            d = Modulo.objects.get(pk=mdpk)
            d.delete()
                
        retorno = {'ok':0,'deleted':u'eliminado con éxito'}
        return HttpResponse(simplejson.dumps(retorno))

rmItem = rmItem.as_view()


class confgItm(View):
    def get(self,request):
        data = request.GET.copy()

        if data['module'] in ['imglg','sideimg','color']:
            d = MD_grid.objects.get(pk=data['pk'])
            d.config = data['config']
            d.save()

        if data['module'] in ['aviso']:
            d = Modextra.objects.get(pk=data['pk'])
            d.config = data['config']
            d.save()

        if data['module'] in ['banco','gridlink','gridimages','spaceblank','richtxt','video','tressesenta','ambientes']:
            d = Modulo.objects.get(pk=data['pk'])
            d.config = data['config']
            d.save()



        retorno = {'ok':1,'updated':d.pk}
        return HttpResponse(simplejson.dumps(retorno))

confgItm = confgItm.as_view()


class saveHt(View):

    def get(self,request):
        data = request.GET.copy()
        pk = data.get('pk',None)
        contenido = simplejson.loads(data['contenido'])
        configu = simplejson.loads(data['config'])
        params = simplejson.dumps({"contenido":contenido,"config":configu})
        if pk:
            d = Modextra.objects.get(pk=data['pk'])
            d.contenido=params
            d.publicado=False
            d.save()
            retorno = {'ok':1,'updated':d.pk}
        else:
            d = Modextra(contenido=params,modulopk=Modulo.objects.get(pk=data['modpk']))
            d.save()
            retorno = {'ok':1,'failed':d.pk}

        return HttpResponse(simplejson.dumps(retorno))



    def post(self,request):
        # PARA HTML

        data = request.POST.copy()
        pk = data.get('pk',None)
        if pk:
            d = Modulo.objects.get(pk=data['pk'])
            extr = d.modextra_set.all()
            extr.update(contenido=data['contenido'])
            retorno = {'ok':1,'updated':d.pk}
        else:
            retorno = {'ok':1,'failed':'fx'}

        return HttpResponse(simplejson.dumps(retorno))

saveHt = saveHt.as_view()


class addBanco(View):
    def post(self,request):
        data = request.POST.copy()
        imagens = data.get('imagen',None)
        originalpic = data.get('originalpic',None)
        rowpk = data.get('rowpk',None)
        if rowpk:
            modpk = Modulo.objects.get(pk=rowpk)
        
        pk = data.get('pk',None)        

        if imagens and 'static/' not in imagens:
            imagen = imagens.decode('base64') 
            originals = Image.open(BytesIO(imagen))
            name_imagen = 'banco_recorte_.%s'%originals.format.lower()
            recorte = ContentFile(imagen,name_imagen)


        if originalpic and 'static/' not in originalpic:
            imagen = originalpic.decode('base64') 
            original = Image.open(BytesIO(imagen))
            name_imagen = 'banco.%s'%original.format.lower()
            originalimage = ContentFile(imagen,name_imagen)

        wi = original.width
        hi = original.height


        if wi > hi:
            tw = 400.0
            recortew = 800.0
            th = (tw/wi) * hi
            recorteh = (recortew/wi) * hi
        else:                
            th = 400.0
            tw = (th/hi) * wi
            recorteh = 800.0
            recortew = (recorteh/hi) * wi

        recortesize = (int(recortew),int(recorteh)) 
        webimages = original.resize(recortesize)

        if pk:
            mdsaved = MD_banco.objects.get(pk=pk)
        else:            
            mdsaved = MD_banco(modulopk=modpk)

        mdsaved.save()
        mdsaved.original = originalimage
        mdsaved.webimage = originalimage
        mdsaved.recorte = recorte
        mdsaved.save()
        webimages.save(mdsaved.webimage.path)
        #recorte.save(mdsaved.recorte.path)
        origdwn = mdsaved.original.name.split('.')[-1:][0]
        downsfirst = simplejson.dumps({'pathfile':mdsaved.original.name,'filename':origdwn})  
        retorno = {'ok':rowpk,
                       'failed':mdsaved.pk,
                       'saved':mdsaved.pk,
                       'itempk':mdsaved.pk,
                       'url':'/%s'%(mdsaved.recorte.name),
                       'webimage':'/%s'%(mdsaved.webimage.name),
                       'downs':downsfirst
                       }

        return HttpResponse(simplejson.dumps(retorno))

addBanco = addBanco.as_view()


class saveBanco(View):
    def post(self,request):
        data = request.POST.copy()
        imagens = request.POST.get('imagen',None)
        imgoriginal = request.POST.get('originalpic',None)
        pk = data.get('pk',None)
        mdpk = data.get('mdpk',None)
        rowpk = data.get('rowpk',mdpk)


        if pk:
            mdsaved = MD_banco.objects.get(pk=data['pk'])
            mdsaved.publicado=False
        else:
            m = Modulo.objects.get(pk=data['mdpk'])
            mdsaved = MD_banco(modulopk=m)

        if imagens and 'static/' not in imagens:
            imagen = imagens.decode('base64') 
            original = Image.open(BytesIO(imagen))
            name_imagen = 'brouch.%s'%original.format.lower()
            data['recorte'] = ContentFile(imagen,name_imagen)
            
            wr = original.width
            hr = original.height

        
        if imgoriginal and 'static/' not in imgoriginal:
            imagen = imgoriginal.decode('base64') 
            original = Image.open(BytesIO(imagen))
            name_imagen = 'brouch.%s'%original.format.lower()
            data['original'] = ContentFile(imagen,name_imagen)

            wi = original.width
            hi = original.height

            if wi > hi:
                tw = 400.0
                recortew = 800.0
                th = (tw/wi) * hi
                recorteh = (recortew/wi) * hi
            else:                
                th = 400.0
                tw = (th/hi) * wi
                recorteh = 800.0
                recortew = (recorteh/hi) * wi
            recortesize = (int(recortew),int(recorteh)) 
            #thumsize = (int(tw),int(th))
            #thumb = original.resize(thumsize)
            recorte = original.resize(recortesize)

        mdsaved.descp = data.get('descp','')
        mdsaved.orden = data.get('orden',1)
        mdsaved.save()
        
        if imagens and 'static/' not in imagens:
            mdsaved.recorte = data['recorte']
            mdsaved.save()

        if imgoriginal and 'static/' not in imgoriginal:

            mdsaved.original = data['original']
            mdsaved.save()            
            mdsaved.webimage = data['original']
            mdsaved.save()
            recorte.save(mdsaved.webimage.path)

        if mdsaved.original:
            origdwn = mdsaved.original.name.split('.')[-1:][0]
        else:
            origdwn = {}
        
        if mdsaved.original:
            downsfirst = simplejson.dumps({'pathfile':mdsaved.original.name,'filename':origdwn})
        else:
            downsfirst = None
            
        retorno = {'ok':rowpk,
                   'failed':mdsaved.pk,
                   'saved':mdsaved.pk,
                   'itempk':mdsaved.pk,
                   'url':'/%s'%(mdsaved.recorte.name),
                   'webimage':'/%s'%(mdsaved.webimage.name),
                   'downs':downsfirst
                   }

        return HttpResponse(simplejson.dumps(retorno))

saveBanco = saveBanco.as_view()


class saveCat(View):
    def get(self,request):
        data = request.GET.copy()
        pk = data.get('pk',None)
        rowpk = data.get('rowpk',None)
        subpk = data.get('subpk',None)
        slugname = slugify(data['name'])
        paren = data.get('paren',None)
        if rowpk:
            rowpk = Modulo.objects.get(pk=rowpk)        
        if paren:
            paren = Categoria.objects.get(pk=paren)
        if pk and not paren:
            cat = Categoria.objects.get(pk=pk)
            cat.catname = data['name']
            cat.catslug = slugname
            cat.save()
        
        if subpk and paren:
            cat = Categoria.objects.get(pk=pk)
            cat.catname = data['name']
            cat.catslug = slugname
            cat.parentcat = paren
            cat.save()
            
        else:
            cat = Categoria(catname=data['name'],catslug=slugname,modulopk=rowpk,parentcat=paren)            
            cat.save()

        retorno = {'ok':1,'failed':cat.pk}

        return HttpResponse(simplejson.dumps(retorno))

saveCat = saveCat.as_view()


class rmCat(View):
    def get(self,request):
        data = request.GET.copy()
        pk = data.get('pk',None)
        cat = Categoria.objects.get(pk=pk)
        cat.delete()
        retorno = {'ok':1,'failed':0}
        return HttpResponse(simplejson.dumps(retorno))
rmCat = rmCat.as_view()


class savecatbanco(View):
    def get(self,request):
        data = request.GET.copy()
        mycats = request.GET.getlist('mycats',None)
        pk = data.get('pk',None)
        if pk:
            banco = MD_banco.objects.get(pk=data['pk'])
            if mycats:
                catsadds = [simplejson.loads(x) for x in mycats]
                banco.mycats = simplejson.dumps(catsadds)

                banco.save()

        retorno = {'ok':1,'failed':0}
        return HttpResponse(simplejson.dumps(retorno))
savecatbanco = savecatbanco.as_view()


class addFile(View):
    def post(self,request):
        data = request.POST.copy()
        sluge = data.get('slug',None)
        filex = data.get('filex',None)
        if filex:
            formats, imgstr = filex.split(';base64,')
            ext = formats.split('/')[-1]
            namefile = data['filename']
            descarga = ContentFile(b64decode(imgstr),name=namefile)


            if sluge in ['gridimages','sideimg']:
                b = MD_grid.objects.get(pk=data['pk'])

            else:
                b = MD_banco.objects.get(pk=data['pk'])


            bdwn = Dwns(filex=descarga)
            bdwn.save()
            bdwn.filex = descarga
            bdwn.save()
            nyd = b.mydowns.add(bdwn.pk)
            filenamed = bdwn.filex.name

        retorno = {'ok':1,'failed':bdwn.pk,'filename':filenamed}
        return HttpResponse(simplejson.dumps(retorno))
addFile = addFile.as_view()


class saveMDimg(View):
    def post(self,request):
        data = request.POST.copy()
        pk = data.get('pk',None)
        mdpk = data.get('mdpk',None)
        imagens = request.POST.get('imagen',None)

        if pk:
            mdsaved = MD_img.objects.get(pk=pk)
            mdsaved.titulo = data.get('title','')
            mdsaved.descp = data.get('descp','')
            mdsaved.orden = data.get('orden','')
            mdsaved.save()
        else:
            mdsaved = MD_img(modulopk=mdpk,orden=data['orden'])
            mdsaved.titulo = data.get('title','')
            mdsaved.descp = data.get('descp','')
            mdsaved.orden = data.get('orden','')
            mdsaved.save()

        
        if imagens and 'static/' not in imagens:
            imagen = imagens.decode('base64') 
            original = Image.open(BytesIO(imagen))
            name_imagen = 'imagen.%s'%original.format.lower()
            imagensaver = ContentFile(imagen,name_imagen)  
            mdsaved.imagen = imagensaver
            mdsaved.save()
            

        retorno = {'ok':mdpk,'itmpk':mdsaved.pk,'url':'/%s'%(mdsaved.imagen.name)}

        return HttpResponse(simplejson.dumps(retorno))

saveMDimg = saveMDimg.as_view()


class saveNota(View):

    def get(self,request):
        data = request.GET.copy()
        pk = data.get('pk',None)
        setts = data.get('config',None)
        if pk:
            mdsaved = MD_imgtxt.objects.get(pk=data['pk'])
            mdsaved.contenido = data['notas']
            if setts:
                mdsaved.configs = setts
            mdsaved.save()


        retorno = {'itmpk':mdsaved.pk,'url':'/%s'%(mdsaved.imagen.name)}
        return HttpResponse(simplejson.dumps(retorno))

    def post(self,request):
        data = request.POST.copy()
        pk = data.get('pk',None)
        imagens = request.POST.get('imagen',None)            
        if pk:
            mdsaved = MD_imgtxt.objects.get(pk=data['pk'])
            
            mdsaved.save()
        else:
            mdsaved = MD_imgtxt(modulopk=Modulo.objects.get(pk=data['mdpk']),orden=data['orden'])
            mdsaved.save()

        if imagens and 'static/' not in imagens:
            imagen = imagens.decode('base64') 
            original = Image.open(BytesIO(imagen))
            name_imagen = 'nota.%s'%original.format.lower()
            mdsaved.imagen = ContentFile(imagen,name_imagen)
            mdsaved.save()

        retorno = {'ok':data['mdpk'],'saved':mdsaved.pk,'itmpk':mdsaved.pk,'url':'/%s'%(mdsaved.imagen.name)}

        return HttpResponse(simplejson.dumps(retorno))

saveNota = saveNota.as_view()




class reorderRw(View):

    def get(self,request):
        data = request.GET.copy()


        for x in data:
            proc = simplejson.loads(data.get(x))
            m = Modulo.objects.get(pk=proc['pk'])
            m.orden = proc['orden']
            m.save()

        retorno = {'ok':1}

        return HttpResponse(simplejson.dumps(retorno))

reorderRw = reorderRw.as_view()



class Publicar(View):

    def get(self,request):
        data = request.GET.copy()
        m = Modulo.objects.get(pk=data['rowpk'])
        m.md_imgtxt_set.all().update(publicado=True)
        m.md_img_set.all().update(publicado=True)
        m.md_grid_set.all().update(publicado=True)
        m.modextra_set.all().update(publicado=True)
        m.md_codigo_color_set.all().update(publicado=True)
        m.md_video_set.all().update(publicado=True)
        m.md_banco_set.all().update(publicado=True)
        m.modcromatico_set.all().update(publicado=True)


        retorno = {'ok':1}

        return HttpResponse(simplejson.dumps(retorno))

Publicar = Publicar.as_view()



class saveRT(View):

    def get(self,request):
        data = request.GET.copy()
        m = Modulo.objects.get(pk=data['pk'])
        m.mdtitle = data['t']
        m.save()

        retorno = {'ok':1}

        return HttpResponse(simplejson.dumps(retorno))

saveRT = saveRT.as_view()




class saveMarka(View):
    def get(self,request):
        data = request.GET.copy()
        m = MD_img.objects.get(pk=data['pk'])
        m.markas = data['markas']
        m.save()
        retorno = {'ok':1}
        return HttpResponse(simplejson.dumps(retorno))
saveMarka = saveMarka.as_view()



class fontUsage(View):

    def get(self,request):
        data = request.GET.copy()
        mdpk = data.get('mdpk',None)
        try: 
            m = Modulo.objects.get(pk=mdpk)
        except:
            m = None

        if m:
            pk = data.get('pk',None)
            if pk:
                mx = Modextra.objects.get(pk=pk)
            else:
                mx = Modextra(modulopk=m)

            fuentes = request.GET.getlist('fuentes')
            arrfuentes = [simplejson.loads(f) for f in fuentes]

            mx.orden = data['orden']
            mx.typo = data['categoria']
            mx.publicado = False
            mx.contenido = simplejson.dumps(arrfuentes)
            mx.save()
            retorno = {'ok':mx.pk}
        else:
            retorno = {'ok':0}

        return HttpResponse(simplejson.dumps(retorno))

fontUsage = fontUsage.as_view()




class saveCromatico(View):

    def get(self,request):
        data = request.GET.copy()
        mdpk = data.get('mdpk',None)
        fullcolores = []
        colores = request.GET.getlist('colores')
        pk = data.get('pk',None)

        try: 
            m = Modulo.objects.get(pk=mdpk)
        except:
            m = None

        if m:
            if pk:
                mx = Modcromatico.objects.get(pk=pk)
            else:
                mx = Modcromatico(modulopk=m)



            mx.cromaticocolores_set.all().delete()
            mx.publicado = False
            mx.categoria = data['categoria']
            mx.save()

            for color in colores:
                color = simplejson.loads(color)
                coloradd = {
                            'item':mx,
                            'color':Colors.objects.get(pk=color['pk']),
                            'orden':color['orden'],
                            'wbar':color['w'],
                            'porcentaje':color['percente'],
                            'cromas':simplejson.dumps(color['cromas'])}
                crcolor = Cromaticocolores(**coloradd)
                crcolor.save()

            retorno = {'ok':mx.pk}
        else:
            retorno = {'ok':0}

        return HttpResponse(simplejson.dumps(retorno))

saveCromatico = saveCromatico.as_view()



'''
    Section area

'''


class addSection(View):

    def get(self,request):
        data = request.GET.copy()
        pk = data.get('pk',None)
        parentpk = data.get('parentpk',None)
        title = data.get('title','Section')
        orden = data.get('orden',1)
        slug = slugify(title)
        sitio = get_current_site(request)

        params = {'sec_name':title,'orden':orden,'sec_slug':slug,'sitio':sitio}
        s = Section(**params)
        s.save()

        # AGREGANDO MODULOS DEFAULT





        modulos = [{'secpk':s,'slugmd':'color',
                    'icono':'icon-iconos-brandline_portada',
                    'config':"{}",
                    'orden':0,
                    'mdtitle':slug,
                    'fijo':True
                  }]


        for m in modulos:
            md = Modulo(**m)
            md.save()

            subitm = ITMS['color']
            subitm['modulopk']=md
            subitm['title'] = title
            subitm['publicado']=True
            subitm['config'] = simplejson.dumps({'backcolor':'#4c4c4c',
                           'type_a':'color',
                           'altura':'25',
                           'fonttype':'Arial',
                           'fontcolor':'#fff',
                           'fontsize':'20',
                           'textalg':'center'
                         })
            subm = MD_grid(**subitm)
            subm.save()

        retorno = {'ok':s.pk,'md':md.pk,'sub':subm.pk}
        return HttpResponse(simplejson.dumps(retorno))

addSection = addSection.as_view()


class saveSection(View):

    def get(self,request):
        data = request.GET.copy()
        title = data.get('title','Section')
        orden = data.get('orden',1)
        slug = slugify(title)
        pk = data.get('pk',None)
        parentpk = data.get('parentpk',None)
        col = data.get('col',None)

        if pk:
            s = Section.objects.get(pk=pk)
            s.sec_name = title
            s.sec_slug = slug
            s.save()
            m = s.modulo_set.filter(slugmd='color').first()
            try:            
                colormd = m.md_grid_set.all()
                colormd.update(title=title)
            except:
                pass
        else:
            sitio = get_current_site(request)
            params = {'sec_name':title,'sec_slug':slug,'orden':orden,'sitio':sitio}
            if parentpk:
                params['parent']=Section.objects.get(pk=parentpk)
                params['sec_colum_menu'] = Seccolmenu.objects.get(pk=col)
            s = Section(**params)
            s.save()
            modulos = [{'secpk':s,'slugmd':'color',
                        'icono':'icon-iconos-brandline_portada',
                        'config':"{}",
                        'orden':0,
                        'mdtitle':slug,
                        'fijo':True
                      }]


            for m in modulos:
                md = Modulo(**m)
                md.save()

                subitm = ITMS['color']
                subitm['modulopk']=md
                subitm['title'] = title
                subitm['publicado']=True
                subitm['config'] = simplejson.dumps({'backcolor':'#4c4c4c',
                               'type_a':'color',
                               'altura':'25',
                               'fonttype':'Arial',
                               'fontcolor':'#fff',
                               'fontsize':'20',
                               'textalg':'center'
                             })
                subm = MD_grid(**subitm)
                subm.save()





        retorno = {'ok':s.pk,'slug':s.sec_slug}
        return HttpResponse(simplejson.dumps(retorno))

saveSection = saveSection.as_view()



class saveCol(View):

    def get(self,request):
        data = request.GET.copy()
        col_name = data.get('col_name',1)        
        parentpk = data.get('parentpk',None)
        orden = data.get('orden',1)
        slug = slugify(col_name)
        pk = data.get('pk',None)
        
        if pk:
            sc = Seccolmenu.objects.get(pk=pk)
            sc.col_name = col_name
            sc.slug_col_name = slug
            sc.save()

        else:
            parmas = {'col_name':col_name,'slug_col_name':slug,'orden':orden,'parent':Section.objects.get(pk=parentpk)}
            sc = Seccolmenu(**parmas)
            sc.save()

        
        retorno = {'ok':sc.pk,'slug':slug}
        
        return HttpResponse(simplejson.dumps(retorno))

saveCol = saveCol.as_view()




class rmSec(View):

    def get(self,request):
        data = request.GET.copy()
        pk = data.get('pk',None)
        modelo = [Section,Seccolmenu]

        if pk:
            inx = int(data.get('trg',0))
            md = modelo[inx]
            victim = md.objects.get(pk=pk)
            victim.delete()

            retorno = {'ok':1}
        else:
            retorno = {'ok':0}


        return HttpResponse(simplejson.dumps(retorno))

rmSec = rmSec.as_view()



class updateCfg(View):

    def get(self,request):
        data = request.GET.copy()
        pk = data.get('pk',None)


        if pk:
            m = Modulo.objects.get(pk=pk)
            m.config = data.get('cfg','[]')
            m.save()
            retorno = {'ok':1}
        else:
            retorno = {'ok':0}


        return HttpResponse(simplejson.dumps(retorno))

updateCfg = updateCfg.as_view()