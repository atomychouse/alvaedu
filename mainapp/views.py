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
from django.core.mail import send_mail, EmailMessage


class dyCss(View):
    def get(self,request):
        current_site = get_current_site(request)
        fuentes = Fontusage.objects.all()
        titulos = fuentes.filter(usage='titulos').first()
        textos = fuentes.filter(usage='textos').first()
        subtitulos = fuentes.filter(usage='subtitulos').first()

        try:
            configuradore = Configurador.objects.get(typeconf='page',sitio=current_site)
            configuradore = simplejson.loads(configuradore.configurate)
        except:
            configuradore = {
                                'logo':'brandline',
                                'fondocolor':'#4d4d4d',
                                'fuentecolor':'#B3B3B3'

                            }

        template = 'mainapp/dycss.css'
        ctype = 'text/css'
        context = {}
        context['titulos'] = titulos
        context['subtitulos'] = subtitulos
        context['textos'] = textos
        context['cfgpage'] = configuradore
        response = render(request,template, context,content_type=ctype)
        return response

dyCss = dyCss.as_view()



class userFonts(View):
    def get(self,request):
        current_site = get_current_site(request)
        fuentes = Fuente.objects.all()
        pgst = Pagesettings.objects.filter(sitio=current_site).first()
        
        template = 'mainapp/user_fonts.css'
        ctype = 'text/css'
        context = {}
        context['fonts'] = fuentes
        context['setts'] = pgst
        response = render(request,template, context,content_type=ctype)
        return response

userFonts = userFonts.as_view()




class getSection(View):
    template = ''
    def get(self,request):

        current_site = get_current_site(request)
        secs = Section.objects.filter(parent__isnull=True,sitio=current_site)
        sectiones = []



        for x in secs:
            newsec = {
                'pk':x.pk,
                'slug':x.sec_slug,
                'title':x.sec_name,
                'ishome':x.ishome,
                'cols':[{'pk':c.pk,'cname':c.col_name,
                        'cslug':c.slug_col_name,
                        'subsecs':[{'pk':sb.pk,'col':c.pk,'title':sb.sec_name,'slug':sb.sec_slug} for sb in c.section_set.all()]
                        } for c in x.seccolmenu_set.all()]
            }
            sectiones.append(newsec)



        return HttpResponse(simplejson.dumps(sectiones))

getSection = getSection.as_view()


class Vlogin(View):
    template = 'mainapp/loginform.html'
    def get(self,request):

        context = {}
        response = render(request, self.template, context)
        return response
Vlogin = Vlogin.as_view()


class Recovers(View):
    template = 'mainapp/loginform.html'
    def get(self,request,pk,tmstamp):
        context = {}
        tnow = time.time()
        validat = tnow-float(tmstamp)

        if validat/60 < 20:
            self.template = 'mainapp/recupera.html'
        else:
            self.template = 'mainapp/expired.html'

        context['pkt']=pk

        response = render(request, self.template, context)
        return response
Recovers = Recovers.as_view()



class Assignpass(View):
    template = 'mainapp/loginform.html'
    def post(self,request):
        context = {}
        data = request.POST.copy()
        pax = data.get('pass',None)
        pk = data.get('mktimekey',None)        
        if pax and pk:
            u = User.objects.get(pk=pk)
            u.set_password(pax)
            u.save()
            context = {'ok':1}

        else:
            context = {'ok':0}

        return HttpResponse(simplejson.dumps(context))
Assignpass = Assignpass.as_view()




class Index(View):

    template = 'mainapp/inicio1.html'

    def get(self, request,secty=None,lugy=None,columna=None):
        current_site = get_current_site(request)
        data = request.GET.copy()
        context = {}
        # HACIENDO SIGNOUT
        goaway = request.GET.get('gone',None)
        
        template = request.GET.get('template',1)

        if goaway:
            logout(request)
            return redirect('/')
        # AUN NO ESTAS LOGUEADO
            
            #if len(insite)<1:
            #    response = render(request,'mainapp/nosite.html', context)
            #    return response   


        # DETALLE DE UNA SECCION


        context['fuentes'] = Fuente.objects.filter(sitio=current_site)
        context['settings'] = Pagesettings.objects.filter(sitio=current_site).first()
        context['base']='mainapp/basetemplate%s.html'%(template)
        

        if not secty and not lugy and not columna:
            sectionshow = Section.objects.filter(ishome=True,sitio=current_site).first()
        else:
            searchs = {'sec_slug':lugy,'sitio':current_site}
            if columna:
                searchs['parent__sec_slug']=columna
                sectionshow = Section.objects.get(sec_slug=lugy,sec_colum_menu__slug_col_name=columna,sitio=current_site)
            else:
                sectionshow = Section.objects.get(**searchs)

        context['section']=sectionshow
        

        arrcolores = Colors.objects.filter(sitio=current_site)
        
        first_color = Colors.objects.filter(syscolor=True,colortype='principales',sitio=current_site).first()
        second_color = Colors.objects.filter(syscolor=True,colortype='apoyo',sitio=current_site).first()
        colores_sys = [first_color,second_color]


        rejects = Colorreject.objects.all().first()

        if rejects:
            context['rejects'] = rejects.color
        else:
            context['rejects'] = []


        colors = [{'pk':x.pk,
                   'orden':x.orden,
                   'levelper':x.colortype,
                   'w':x.w,
                   'percente':x.percente,
                   'roundper':x.roundper,
                   'cromas':simplejson.loads(x.croma)

                } for x in arrcolores]

        syscolors = [{'pk':x.pk,
                   'orden':x.orden,
                   'levelper':x.colortype,
                   'w':x.w,
                   'percente':x.percente,
                   'roundper':x.roundper,
                   'cromas':simplejson.loads(x.croma)

                } for x in Colors.objects.filter(syscolor=True,sitio=current_site)]


        context['setcolores'] = simplejson.dumps(colors)
        context['system_colors'] = simplejson.dumps(syscolors)
        context['syscolors'] = colores_sys
        context['modulotype'] = data.get('modo','container')



        response = render(request, self.template, context)
        return response

Index = Index.as_view()




class RecoverSend(View):
    def post(self,request):
        data = request.POST.copy()
        recover = data.get('recovering',None)
        correo = data.get('correo',None)
        if recover:
            f = forms.EmailField()

            try:
                f.clean(data['correo'])
                u = User.objects.get(email=correo)
                response = {'r':u.email}
            except Exception as err:
                msgerr = 'Correo no valido'
                u = None
                response = {'err':msgerr}
            if u:
                ruta = request.META.get('HTTP_REFERER')
                subject, from_email, to = 'Recuperar Contraseña', 'claro@normatividadclaro.com',correo
                mensaje = u'''
                    <h1>Hola : %s</h1>
                    <p>Para reestablecer tu contraseña visita el siguiente link:</p>
                    <p><a href="%srecover/%s/%s">Nueva Contraseña</a></p>
                    <p>Recurda, el link expira en 5 minutos</p>
                '''%(u.first_name,ruta,u.pk,time.time())
                # create the email, and attach the HTML version as well.
                msg = EmailMultiAlternatives(subject, mensaje, from_email, [to])
                msg.attach_alternative(mensaje, "text/html")
                msg.send()
            return HttpResponse(simplejson.dumps(response))
RecoverSend = RecoverSend.as_view()



class Sin(View):

    def post(self,request):
        data = request.POST.copy()
        user = authenticate(username=data['usuarius'], password=data['passo'])
        response = {}
        
        try:
            group = user.groups.values()[0]['name']
        except:
            group = 'basic'

        if user is not None:
            login(request, user)
            response['saved'] = 'ok'
            response['datos'] = {'msg':u'guardao con éxito','liga':'/admin/'}
            response['callback'] = 'reg_success'
        else:
            response['msg'] = 'la información no es correcta, verifique por favor'
            response['errors'] = {'usuarius':'Usuario no es correcto'}

        return HttpResponse(simplejson.dumps(response))


Sin = Sin.as_view()


class Son(View):

    def post(self,request):
        data = request.POST.copy()
        data['date_joined'] = datetime.datetime.now()
        instanced = None
        response = {}
        forma = FormCreator()
        forma = forma.advanced_form_to_model(modelo=User,
                                             excludes = []
                                             )

        forma.base_fields['email'].required=True
        forma.base_fields['groups'].required=True
        grupo = data['groups']
        ges = Group.objects.get(name='%s'%data['groups'])
        data['groups'] = (ges.pk)
        data['is_active']=True
        data['is_staff']=True
        pax = data['password']
        data['password']=make_password(data['password'])
        forma = forma(data,instance=instanced)

        if forma.is_valid():
            saved = forma.save()
            if data['groups']=='patient':
                full_name = '%s %s' %(data['first_name'],data['last_name'])
                Patient(full_name='')
            if saved:
                usery = authenticate(username=data['username'], password=pax)
                login(request, usery)


            response['saved'] = 'ok'
            response['datos'] = {'msg':u'guardao con éxito','liga':'/%s/home/'%(grupo)}
            response['callback'] = 'reg_success'

        else:
            response['msg'] = 'Verifique su información'
            response['errors'] = forma.errors


        returns = HttpResponse(simplejson.dumps(response))
        
        return returns

Son = Son.as_view()




class Udetail(View):
    """Delete company."""
    template = 'mainapp/inicio1.html'

    def get(self,request,secty=None,lugy=None,columna=None):
        context = {}
        searchs = {'sec_slug':lugy}


        if columna:
            searchs['parent__sec_slug']=columna
            section = Section.objects.get(sec_slug=lugy,sec_colum_menu__slug_col_name=columna)
        else:
            section = Section.objects.get(**searchs)

        context['fuentes'] = Fuente.objects.all()
        arrcolores = Colors.objects.all()
        
        colors = [{'pk':x.pk,
                   'orden':x.orden,
                   'levelper':x.colortype,
                   'w':x.w,
                   'percente':x.percente,
                   'roundper':x.roundper,
                   'cromas':simplejson.loads(x.croma)

                } for x in arrcolores]

        context['setcolores'] = simplejson.dumps(colors)
        context['base']='mainapp/basetemplate%s.html'%(1)
        context['section'] = section
        response = render(request, self.template, context)
        return response

Udetail = Udetail.as_view()



class Crop(View):
    @csrf_exempt
    def post(self,request):
        tipo = request.POST.get('tipo',1)
        portal = request.POST.get('portal',1)
        sectionpk = request.POST.get('uid',None)
        uid =slugify(time.time())

    #   setting_dirs -----------------------------------------------------
        if not os.path.exists("%s/static/%s/"%(settings.BASE_DIR,portal)):
            os.mkdir("%s/static/%s/"%(settings.BASE_DIR,portal))
        if not os.path.exists("%s/static/%s/%s/"%(settings.BASE_DIR,portal,tipo)):
            os.mkdir("%s/static/%s/%s/"%(settings.BASE_DIR,portal,tipo))
        
    #   crop procecing---------------------------------------------------

        #calling libs ---------------------------------------------------
        from PIL import Image
        from io import BytesIO

        #image params --------------------------------------------
        filefi = '%s'%request.POST.get('imgUrl',None)

        filefi = filefi.decode('base64')    
        
        #creating a image-----------------------------------------------------
        original = Image.open(BytesIO(filefi))


        #cropping data--------------------------------------------------------
        data = request.POST.copy()
        x1 = int(float(data['imgX1'])) 
        y1 = int(float(data['imgY1']))
        x2 = int(float(data['cropW'])) + x1 
        y2 = int(float(data['cropH'])) + y1
        w = int(float(data['imgW']))
        h = int(float(data['imgH']))
        basewidth = 320        
        box = (x1,y1,x2,y2)
        resizing = original.resize((w,h),Image.ANTIALIAS)
        cropped = resizing.crop(box)
        originalW = float(cropped.size[0])
        originalH = float(cropped.size[1])
        wxpercent = basewidth  / originalW
        hsize = float(originalH) * float(wxpercent)
        hsize = int(hsize)
        mobile = cropped.resize((basewidth,hsize),Image.ANTIALIAS)

        nameImage = '%s/static/%s/%s/%s.%s'%(settings.BASE_DIR,portal,tipo,uid,original.format.lower())
        nameimagedb = '/static/%s/%s/%s.%s'%(portal,tipo,uid,original.format.lower())
        mobilName = '%s/static/%s/%s/%s_small.%s'%(settings.BASE_DIR,portal,tipo,uid,original.format.lower())
        mobilNamedb = '/static/%s/%s/%s_small.%s'%(portal,tipo,uid,original.format.lower())
        
        cropped.save(nameImage,original.format)
        mobile.save(mobilName,original.format)
        

        if sectionpk:
            s = Section.objects.get(pk=sectionpk)
            s.webimage  = nameimagedb
            s.mobileimage = mobilNamedb
            s.save()
        
        #es.indices.refresh(index='gdata34')
        response = {"status":"success",'uids':uid,
                    "url":'%s'%(nameimagedb)}
        response = simplejson.dumps(response)

        return HttpResponse(response)

Crop = Crop.as_view()


class Download(View):

    def get(self,request):
        filekey = request.GET.get('f',None)

        fpk = request.GET.get('fpk',None)
        if fpk:
            fikey = Downloadmod.objects.pk(pk=fpk)
            filey = fikey.dwfile.name.split('/')
            filekey = '%s'%filey[-1:][0]



        if 'static' not in filekey:
            filekey = 'static/downlobles/%s'%filekey #assert False,'ok'

        

        filename = '%s/%s'%(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),filekey)
        
        mm = mimetypes.guess_extension(filename)
        mtype = mimetypes.guess_type(filename)
        downloadame,extension = os.path.splitext(filename)
        datename = '%s'%datetime.datetime.now()
        nuname = '%s%s'%(slugify(datename),extension)
        f = open(filename)
        response = HttpResponse(f,content_type=mtype[0])

        dname_list = downloadame.split('/')
        dname = dname_list[len(dname_list)-1]

        response['Content-Disposition'] = 'attachment; filename="%s%s"'%(dname,extension)
        return response
Download = Download.as_view()



class Sender(View):

    def post(self,request):
        data = request.POST.copy()

        mail = EmailMessage(u'%s %s'%('Hola Elizabeth, haz recibido un mensaje de:',data['name']), u' %s'%(data['mensaje']), 'rios@atomyc.house',['alva.educacion01@gmail.com','albertorios.py@gmail.com'],)
        #mail.attach_file('%s/frontapp/envios/promo_%s.xlsx' %(settings.BASE_DIR,promo.pk))
        mail.send()
           


        return HttpResponse({'saved':'ok','callback':'hideformr'})


Sender = Sender.as_view()





