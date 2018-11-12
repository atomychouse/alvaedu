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
from brandline.settings import *
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
from django.db.models import Q
from PIL import Image,ImageFont,ImageDraw 
from django.contrib.sites.models import * 
from django.http import JsonResponse

from django.core.files.base import ContentFile
from io import BytesIO
from base64 import b64decode
from PIL import Image,ImageFont,ImageDraw 


class ImageProcess:


    def djangoImg(self):

        if self.imagencode and 'static/' not in self.imagencode:
            imagen = self.imagencode.decode('base64') 
            originals = Image.open(BytesIO(imagen))
            name_imagen = 'logo.%s'%originals.format.lower()
            imagenobj = ContentFile(imagen,name_imagen)
        else:
            imagenobj = None

        return imagenobj


class Index(View):

    template = 'registroapp/inicio.html'

    def get(self, request,secty=None,lugy=None,columna=None):
        context = {}
        f = FormCreator()
        current_site = get_current_site(request)
        setts = Pagesettings.objects.filter(sitio=current_site).first()
        context['pagesetts'] = setts            
        data = request.GET.copy()
        response = render(request, self.template, context)
        return response

Index = Index.as_view()

class addFont(View):

    def post(self,request):
        current_site = get_current_site(request)
        data = request.POST.copy()
        archivex = data.get('fuente_file')
        fname = data.get('fuente_name')
        fusage = data.get('funete_usage')
        ffname = data.get('fuente_fname')
        formats, filestr = archivex.split(';base64,')
        ffile = ContentFile(b64decode(filestr),name=ffname)
        f = Fuente.objects.filter(font_type=fusage)
        f.delete()
        f = Fuente(**{'font_name':fname,'font_type':fusage,'sitio':current_site})
        f.save()
        ff = Fontfile(**{'fuente_file':ffile,'fuentepk':f})
        ff.save()
        context = {'furi':ff.fuente_file.name}
        return JsonResponse(context)

addFont = addFont.as_view()



class getSettings(View):

    def get(self,request):
        current_site = get_current_site(request)
        pgst = Pagesettings.objects.filter(sitio=current_site).first()
        #assert False,pgst.confiuracion
        context = {}
        context['setts'] = simplejson.loads(pgst.configuracion)
        return JsonResponse(context)


getSettings = getSettings.as_view()



class saveSettings(View):

    def get(self,request):

        data = request.GET.copy()
        configuracion = {}
        colores = [] #request.GET.getlist('colores')
        fuentes = [] #
        colorsite = data.get('colorsite','{}')
        combinaciones = [] #request.GET.getlist('combinaciones')
        


        for f in request.GET.getlist('fuentes'):
            fuentes.append(simplejson.loads(f))
        
        for cr in request.GET.getlist('colores'):
            colores.append(simplejson.loads(cr))
        
        for cb in request.GET.getlist('combinaciones'):
            combinaciones.append(simplejson.loads(cb))

        domainname = data.get('domain',get_current_site(request))
        reloadornot = data.get('domain')

        configuracion['fuentes'] = fuentes
        configuracion['colores'] = colores
        configuracion['colorsite'] = simplejson.loads(colorsite)
        configuracion['combinaciones'] = combinaciones
        configuracion['template'] = data.get('template')
        configuracion = simplejson.dumps(configuracion)


        sitio = Site.objects.get(domain=domainname)
        if sitio:
            
            pg,fails = Pagesettings.objects.get_or_create(sitio=sitio)
            pg.configuracion = configuracion
            pg.save()

        context = {'saved':pg.pk,'datos':pg.configuracion}
        return JsonResponse(data)

saveSettings = saveSettings.as_view()

class Register(View):
    """Delete company."""
    template = 'mainapp/register.html'
    f = FormCreator()
    forma = f.form_to_model(modelo=User,fields=['first_name','last_name','username','password'])



    def post(self,request):
        context = {}
        data = request.POST.copy()
        dominio = data.get('dominio',None)
        fname = data.get('first_name',None)
        lname = data.get('last_name',None)
        imagen = data.get('imagen',None)
        pk = data.get('pk',None)
        #profile Sitio
        img = ImageProcess()
        img.imagencode = imagen
        logo = img.djangoImg()

        if pk:
            instanced = User.objects.get(pk=pk)
        else:
            instanced = None

        valides = ['dominio','last_name','first_name']

        forma = self.forma(data,instance=instanced)

        for x in valides:
            valida = data.get(x,None)
            if not valida:
                forma.errors[x]='Este campo es obligatorio'

        if forma.is_valid():
            # sAVING SITE
            originalD = request.META['HTTP_HOST']
            sdomain= '%s.%s'%(dominio,originalD)
            sitio,fails = Site.objects.get_or_create(domain=sdomain)
            pgsttngs,pgfail = Pagesettings.objects.get_or_create(sitio=sitio)
            if logo:
                pgsttngs.logo = logo
                pgsttngs.save()
            # SAVING USER
            savex = forma.save()
            savex.is_active=True
            savex.is_staff = True
            savex.set_password(data.get('password'))
            savex.save()

            if instanced:
                return JsonResponse({'saved':savex.pk,'domain':sdomain})


            # RELATING SITE AND USER
            up = UserProfile(myuser=savex,mysite=sitio)
            up.save()
            #CREATING SITE
            patron = NGINX_PATRON%(dominio,request.META['HTTP_HOST'],BASE_DIR)
            filename = '%s/%s.conf'%(BASE_DIR,dominio)
            F = open(filename,'w')
            F.write(patron)
            F.close()
            paz = 'saruman'
            escribe =  'mv %s /etc/nginx/conf.d/'%(filename)
            renueva = '/etc/init.d/nginx reload '
            os.system('echo %s|sudo -S %s' % (paz, escribe))



            cs = CreateSite(data.get('dominio'),sitio)
            cs.create_section()
            cs.create_modulo()
            redirector = 'http://%s.%s/'%(dominio,originalD)            
            os.system('echo %s|sudo -S %s' % (paz, renueva))
            context['saved']=savex.pk
            context['callback']='golink'
            context['domain'] = sdomain
            context['datos'] = {'ruta':redirector}



        else:
            context['errors']=forma.errors

        context = simplejson.dumps(context)
        return HttpResponse(context)


    def get(self,request):
        context = {}


        for x,y in self.forma.base_fields.iteritems():
            #y.widget_attrs={'class':'monolito'}
            (y.widget.attrs.update({'class':'form-control'}))

        context['forma']=self.forma
        response = render(request, self.template, context)
        return response

Register = Register.as_view()



class CreateSite:


    def __init__(self,domain=None,sitio=None):
        self.domain=domain
        self.sitio = sitio
        self.section = None



    def create_section(self):
        title = self.domain
        orden = 1
        slug = slugify(title)
        sitio = self.sitio
        params = {'sec_name':title,'orden':orden,'sec_slug':slug,'sitio':sitio,'ishome':True}
        s = Section(**params)
        s.save()
        self.section = s
        return s

    def create_modulo(self):
        modulos = [{'secpk':self.section,'slugmd':'color',
                    'icono':'icon-iconos-brandline_portada',
                    'config':"{}",
                    'orden':0,
                    'mdtitle':self.section.sec_slug,
                    'fijo':True
                  }]


        for m in modulos:
            md = Modulo(**m)
            md.save()

            subitm = ITMS['color']
            subitm['modulopk']=md
            subitm['title'] = self.section.sec_name
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

        return m


