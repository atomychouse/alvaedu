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
import zipfile

from django.template.loader import get_template
from django.template import Context


class Inicio(View):
    template = 'configurador/inicio.html'

    def get(self, request):
        context = {}
        current_site = get_current_site(request)
        setts = Pagesettings.objects.filter(sitio=current_site).first()

        groups = [{'pk':g.pk,'name':g.name} for g in Group.objects.all()]

        usuarios = []

        for u in User.objects.all():
            try: 
                grupo = u.groups.first().pk
            except:
                grupo = None
            usar = {'pk':u.pk,
            'fname':u.first_name,
            'correo':u.email,
            'usuario':u.username,
            'grupo':grupo
                    }

            usuarios.append(usar)

        context['pagesetts'] = setts            
        response = render(request, self.template, context)
        return response

Inicio = Inicio.as_view()



''' VAMOS A SALVAR EL SET DE COLORES '''

class saveColors(View):
    template = 'configurador/inicio.html'

    def get(self, request):
        context = {}
        current_site = get_current_site(request)
        data = request.GET.copy()
        pk = data.get('pk',None)
        color = data.get('cromas',None)
        datacolor = simplejson.loads(color)
        params = {}
        params['color'] = datacolor['hex']['color']
        params['croma'] = simplejson.dumps(datacolor)
        params['orden'] = data['orden']
        params['w'] = data['w']
        params['percente'] = data['percente']
        params['roundper'] = data['roundper']
        params['sitio'] = current_site
        syscolor = data.get('syscolor',None)

        if syscolor:
            params['syscolor']=False

        if pk:
            colorobj = Colors.objects.filter(pk=pk)
            colorobj.update(**params)
            pkadded = pk
        else:
            colorobj = Colors(**params)
            colorobj.save()
            pkadded = colorobj.pk

        context['pk']=pkadded


        response = HttpResponse(simplejson.dumps(context))
        return response

saveColors = saveColors.as_view()



class saveRejects(View):
    template = 'configurador/inicio.html'

    def get(self, request):
        context = {}
        data = request.GET.copy()
        colores = request.GET.getlist('rejects')
        arrcolores = simplejson.dumps(colores)
        c = Colorreject.objects.all()
        c.delete()
        c = Colorreject(**{'color':arrcolores})
        c.save()
        context['pk']='as'
        response = HttpResponse(simplejson.dumps(context))
        return response

saveRejects = saveRejects.as_view()




class rmColor(View):

    def get(self, request):
        context = {}
        data = request.GET.copy()
        c = Colors.objects.get(pk=data['pk'])
        c.delete()
        context['pk']='as'
        response = HttpResponse(simplejson.dumps(context))
        return response

rmColor = rmColor.as_view()


class upFont(View):
    
    def post(self, request):
        context = {}
        current_site = get_current_site(request)
        data = request.POST.copy()
        fontfile = request.FILES['addfont']
        fontname = fontfile._get_name()
        fontname_pices = fontname.split('.')
        
        fname = fontname_pices[0]
        font_type = fontname_pices[1]
        arrgs = {'font_name':fname,'font_title':fname,'font_type':font_type,'sitio':current_site}
        forma = Fuente(**arrgs)
        forma.save()
        ffarrgs = {'fuentepk':forma,'fuente_file':fontfile,'mainf':True}
        fontf = Fontfile(**ffarrgs)
        fontf.save()

        cssLine = '''
        @font-face {
            font-family: "%s";
                src:url('/%s') format('truetype');
        }
        '''%(fname,fontf.fuente_file)


        filecss = '%s/static/css/fuentesdy.css'%(settings.BASE_DIR)
        fccopen = open(filecss,'a')
        fccopen.write(cssLine)
        fccopen.close()


        callbacker = data.get('frommodul','refreshfonts')

        fadded = {'pk':forma.pk,'font_name':forma.font_name,'font_type':forma.font_type}
        context = {'datos':{'agregado':fadded,'css':cssLine,'ffile':{'fontfile':'/%s'%fontf.fuente_file.name}},'saved':'ok','callback':callbacker}

        response = HttpResponse(simplejson.dumps(context))
        return response

upFont = upFont.as_view()



class FontUsage(View):

    def get(self, request):

        context = {}
        data = request.GET.copy()
        f = Fontusage.objects.all()
        f.delete()
        
        for d in data:
            dpar = simplejson.loads(data[d])
            try:
                fpk = Fuente.objects.get(pk=dpar['pk'])
            except:
                fpk = None

            if fpk:
                enuso = dpar.get('enuso',None)
                if enuso:
                    enuso = True
                else:
                    enuso = False

                farg = {'usage':dpar['usage'],'fontpk':fpk,'puntaje':dpar['puntaje']}
                
                if dpar['pk'] not in ['0']:
                    newusage,f = Fontusage.objects.get_or_create(**farg)
                    newusage.enuso = enuso
                    newusage.save()


        f = Fontusage.objects.all().values()

        response = HttpResponse(simplejson.dumps(context))
        return response

FontUsage = FontUsage.as_view()


class FontsetUsage(View):
    def get(self, request):
        context = {}
        data = request.GET.copy()
        f = Fontusage.objects.get(fontpk=data['pk'],usage=data['usage'])
        f.enuso = True
        f.save()
        response = HttpResponse(simplejson.dumps(context))
        return response
FontsetUsage = FontsetUsage.as_view()



'''  GRUPOS Y USUARIOS '''


class saveGroup(View):
    template = 'configurador/inicio.html'

    def get(self, request):
        context = {}
        data = request.GET.copy()
        gname = data.get('name',None)
        pk = data.get('pk',None)
        rm = data.get('rm',None)


        if rm and pk:
            g = Group.objects.get(pk=pk)
            g.delete()
            context['ok']=1

        if pk and not rm:
            g = Group.objects.get(pk=pk)
            g.name=gname
            g.save()
            context['ok']=g.pk
        if not pk and not rm:
            g = Group(name=gname)
            g.save()
            context['ok']=g.pk
        
        response = HttpResponse(simplejson.dumps(context))
        return response

saveGroup = saveGroup.as_view()



class saveUsuario(View):
    template = 'configurador/inicio.html'

    def post(self, request):
        context = {}
        data = request.POST.copy()
        pk = data.get('pk',None)
        grupo = data.get('grupo',None)
        cambiapass = data.get('cambiapass',None)
        if pk:
            instanced = User.objects.get(pk=pk)
        else:
            instanced = None

        f = FormCreator()
        forma = f.form_to_model(modelo=User,fields=['username','first_name','email'])
        forma = forma(data,instance=instanced)

        if forma.is_valid():


            context['saveed']='ok'
            saved = forma.save()
            if not instanced:
                saved.set_password(data.get('pass'))
                saved.save()
                context['usuario'] = {'pk':saved.pk,'usuario':saved.username,'correo':saved.email,'fname':saved.first_name}
                context['nuevo'] = '1'

            if instanced and cambiapass=='true':
                saved.set_password(data.get('pass'))
                saved.save()

            saved.is_active = True
            saved.is_staff = True
            saved.is_superuser = True
            saved.save()

            if grupo:
                saved.groups.clear()
                saved.groups.add(Group.objects.get(pk=grupo))



        else:
            context['errs'] = forma.errors
        
        response = HttpResponse(simplejson.dumps(context))
        return response

saveUsuario = saveUsuario.as_view()


class rmUsuario(View):

    def post(self, request):
        context = {}
        data = request.POST.copy()
        u = User.objects.get(pk=data['pk'])
        u.delete()
        context['pk']='as'
        response = HttpResponse(simplejson.dumps(context))
        return response

rmUsuario = rmUsuario.as_view()




class cfgPage(View):

    def get(self, request):
        context = {}
        data = request.GET.copy()
        current_site = get_current_site(request)
        cfgr,cr = Configurador.objects.get_or_create(typeconf='page',sitio=current_site)
        cfgr.slugmodule='page'
        cfgr.configurate = data['cfg']
        cfgr.save()

        context['responser']={'saved':'ok','cfgr':cfgr.pk}

        response = HttpResponse(simplejson.dumps(context))
        return response

cfgPage = cfgPage.as_view()
