# -*- coding: utf-8 -*-

from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User,Group
import simplejson
from django.contrib.sites.models import Site
from django.db.models import Count
import os

ITMS = {}

ITMS['color'] = {'title':'',
                 'orden':0
                }

class Pagesettings(models.Model):
    sitio = models.ForeignKey(Site)
    logo = models.ImageField(upload_to='static/logos/',blank=True,null=True)
    configuracion = models.TextField(default='[]')

    def setts(self):
        parcer = simplejson.loads(self.configuracion)
        return parcer


    def jssetts(self):
        parcer = self.configuracion
        return parcer


class Configurador(models.Model):
    sitio = models.ForeignKey(Site)
    typeconf = models.CharField(max_length=10,blank=True,null=True)
    slugmodule = models.CharField(max_length=50,blank=True,null=True)
    configurate = models.TextField(blank=True,null=True)


class Colors(models.Model):
    color = models.CharField(max_length=20)
    colortype = models.CharField(max_length=100,default='prim')
    croma = models.TextField(blank=True,null=True)
    w = models.CharField(max_length=10,default=20)
    percente = models.CharField(max_length=10,default=20)
    roundper = models.CharField(max_length=10,default=20)
    orden = models.IntegerField(default=1)
    syscolor = models.BooleanField(default=True)
    sitio = models.ForeignKey(Site,blank=True,null=True)


class Colorreject(models.Model):
    color = models.TextField(blank=True,null=True)


class Fuente(models.Model):
    font_name = models.CharField(max_length=200)
    font_type = models.CharField(max_length=100,blank=True,null=True)
    sitio = models.ForeignKey(Site,blank=True,null=True)
    font_title = models.CharField(max_length=200,default='ABCDEFGHIJKLMNOPQRST...')

    def originalf(self):
        orgf = self.fontfile_set.filter(mainf=True).first()
        return orgf


class Fontfile(models.Model):
    fuentepk = models.ForeignKey('Fuente')
    fuente_file = models.FileField(upload_to="static/dyfonts/")
    mainf = models.BooleanField(default=False)

    def delete(self, *args, **kwargs):
            if self.font_file:
                os.remove(self.font_file.path)
            super(Fontfile, self).delete(*args, **kwargs)



class Fontusage(models.Model):
    fontpk = models.ForeignKey('Fuente')
    usage = models.CharField(max_length=100)
    enuso = models.BooleanField(default=False)
    cat = models.CharField(max_length=100,default='cfg')
    puntaje = models.CharField(blank=True,null=True,max_length=20)


class Section(models.Model):

    class Meta:
        ordering = ['orden']

    sec_name = models.CharField(u'',max_length=200)
    sec_slug = models.SlugField(u'slug',max_length=255)
    parent = models.ForeignKey('self',blank=True,null=True)
    orden = models.IntegerField(default=1)
    ishome = models.BooleanField(default=False)
    sec_colum_menu = models.ForeignKey('Seccolmenu',blank=True,null=True)
    sitio = models.ForeignKey(Site,blank=True,null=True)
    fecha_alta = models.DateTimeField(auto_now_add=True)
    publicado = models.BooleanField(default=False)
    
    def __unicode__(self):
        return self.sec_name
    

class Seccolmenu(models.Model):
    parent = models.ForeignKey(Section,blank=True,null=True) 
    col_name = models.CharField(max_length=200,blank=True,null=True)
    slug_col_name = models.CharField(max_length=500,blank=True,null=True)
    orden = models.IntegerField(default=1);
    fecha_alta = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering=['orden']


class Modulo(models.Model):
    secpk = models.ForeignKey(Section)
    slugmd = models.CharField('',max_length=200,default='')
    icono = models.CharField('',max_length=200,default='')
    config = models.TextField(blank=True,null=True)
    orden = models.IntegerField(default=1)
    mdtitle = models.CharField(max_length=200,blank=True,null=True)
    fecha_alta = models.DateTimeField(auto_now_add=True)
    fijo = models.BooleanField(default=False)

    def catsarr(self):
        if self.slugmd=='banco':

            cats = self.categoria_set.all()
            if cats:
                cs = [{'name':x.catname,'pk':x.pk,'subcats':[{'name':sx.catname,'pk':sx.pk} for sx in x.categoria_set.all()]} for x in cats]
                cs = simplejson.dumps(cs)
                return cs
            else:
                return None
        else:
            return None

    def principales(self):
        if self.slugmd=='cromatico':
            try:
                prics = self.md_codigo_color_set.all()[0].principales
            except:
                prics = None
            return prics

        else:
            return ''



class Modcromatico(models.Model):

    modulopk = models.ForeignKey(Modulo)
    categoria = models.CharField(max_length=200,blank=True,null=True,default=u'categoría')
    orden = models.IntegerField(default=0)
    config = models.TextField(blank=True,null=True)
    publicado=models.BooleanField(default=False)


class Cromaticocolores(models.Model):
    item = models.ForeignKey(Modcromatico)
    color = models.ForeignKey(Colors)
    orden = models.IntegerField(default=0)
    wbar = models.CharField(max_length=80,blank=True,null=True)
    porcentaje = models.CharField(max_length=80,blank=True,null=True)
    cromas = models.TextField(blank=True,null=True)



class Modextra(models.Model):
    modulopk = models.ForeignKey(Modulo)
    typo = models.CharField(max_length=120,blank=True,null=True,default='contenido')
    contenido = models.TextField()
    orden = models.IntegerField(default=0)
    config = models.TextField(blank=True,null=True)
    publicado=models.BooleanField(default=False)

    def getcontenido(self):
        if self.contenido:
            return simplejson.dumps(self.contenido)



class MD_codigo_color(models.Model):
    modulopk = models.ForeignKey(Modulo)
    estilo = models.CharField('',max_length=200,default='rounded')
    principales = models.TextField()
    apoyo = models.TextField()
    barra = models.TextField()
    listapan = models.TextField()
    fecha_alta = models.DateTimeField(auto_now_add=True)
    publicado=models.BooleanField(default=False)


class MD_grid(models.Model):
    #used in grid link, grid downloads, text & image , rebased image
    modulopk = models.ForeignKey(Modulo)
    title = models.CharField(max_length=200,blank=True,null=True)
    descp = models.TextField(blank=True,null=True,default='')
    link = models.CharField(max_length=200,blank=True,null=True)
    webimage = models.ImageField(upload_to='static/webimages',blank=True,null=True)
    config = models.TextField(blank=True,null=True)
    orden = models.IntegerField(default=1)
    fecha_alta = models.DateTimeField(auto_now_add=True)
    mydowns = models.ManyToManyField('Dwns')
    publicado=models.BooleanField(default=False)

    def delete(self, *args, **kwargs):
            if self.webimage:
                os.remove(self.webimage.path)
            super(MD_grid, self).delete(*args, **kwargs)

    def mydownsarr(self):
        mys = self.mydowns.all()        
        if mys:
            myds = [{'pathfile':x.filex.name,
            'filename':x.filex.name.split('/')[-1:][0],'pk':x.pk} for x in mys]
        else:
            myds = []
        return simplejson.dumps(myds)


class MD_video(models.Model):
    #used in grid link, grid downloads, text & image , rebased image
    modulopk = models.ForeignKey(Modulo)
    title = models.CharField(max_length=200,blank=True,null=True)
    descp = models.TextField(blank=True,null=True)
    link = models.CharField(max_length=200,blank=True,null=True)
    config = models.TextField(blank=True,null=True)
    orden = models.IntegerField(default=1)
    fecha_alta = models.DateTimeField(auto_now_add=True)
    publicado=models.BooleanField(default=False)


class Downl(models.Model):
    mdpk = models.IntegerField()
    dwfile = models.FileField(upload_to='static/descargables')
    orden = models.IntegerField(default=1)
    modelname = models.CharField(max_length=50)
    fecha_alta = models.DateTimeField(auto_now_add=True)

    def delete(self, *args, **kwargs):
            os.remove(self.dwfile.path)
            super(Downl, self).delete(*args, **kwargs)


class Packs(models.Model):
    dwfiles = models.ManyToManyField(Downl)
    packname = models.CharField(max_length=200)
    fecha_alta = models.DateTimeField(auto_now_add=True)
    typezip = models.CharField(max_length=20,choices=(('zip','ZIP'),('tar','TAR'),),default='zip')


class Categoria(models.Model):
    catname = models.CharField(max_length=200,default='categoria')
    catslug = models.CharField(max_length=200,default='categoria')
    parentcat = models.ForeignKey('Categoria',blank=True,null=True)
    orden = models.IntegerField(default=0)
    modulopk = models.ForeignKey(Modulo,blank=True,null=True)


class MD_img(models.Model):
    modulopk = models.ForeignKey(Modulo)
    imagen = models.ImageField(upload_to="static/md_imgs/",blank=True,null=True)
    orden=models.IntegerField(default=1)
    date_create = models.DateTimeField(auto_now_add=True)
    titulo = models.CharField(max_length=200,blank=True,null=True)
    descp = models.TextField(blank=True,null=True)
    publicado=models.BooleanField(default=False)
    markas = models.TextField(blank=True,null=True)

    def delete(self, *args, **kwargs):
            if self.imagen:
                os.remove(self.imagen.path)
            super(MD_img, self).delete(*args, **kwargs)



class MD_imgtxt(models.Model):
    modulopk = models.ForeignKey(Modulo)
    imagen = models.ImageField(upload_to="static/md_imgs/",blank=True,null=True)
    orden=models.IntegerField(default=1)
    date_create = models.DateTimeField(auto_now_add=True)
    contenido = models.TextField(blank=True,null=True)
    configs = models.TextField(blank=True,null=True)
    publicado=models.BooleanField(default=False)



    def delete(self, *args, **kwargs):
            if self.imagen:
                os.remove(self.imagen.path)
            super(MD_imgtxt, self).delete(*args, **kwargs)


    def contenidoarr(self):
        if self.contenido:
            conte = simplejson.dumps(self.contenido)
        else:
            conte = []

        return simplejson.loads(conte)



class MD_banco(models.Model):
    #used in grid link, grid downloads, text & image , rebased image
    modulopk = models.ForeignKey(Modulo)
    descp = models.TextField(blank=True,null=True)
    webimage = models.ImageField(upload_to='static/banco',blank=True,null=True)
    recorte = models.ImageField(upload_to='static/banco',blank=True,null=True)
    original = models.ImageField(upload_to='static/banco',blank=True,null=True)
    orden = models.IntegerField(default=1)
    fecha_alta = models.DateTimeField(auto_now_add=True)
    mycats = models.TextField()
    mydowns = models.ManyToManyField('Dwns')
    isvideo = models.IntegerField(default=0)
    publicado=models.BooleanField(default=False)

    #class Meta:
    #    ordering = ['mycats__parentcat__catname','mycats__catname']


    def mycatsarr(self):

        mys = self.mycats
        if mys:
            mycatss = mys
        else:
            mycatss = []


        return mycatss


    def mydownsarr(self):
        
        if(self.original):
            myds = [{'pathfile':self.original.name,
                'filename':self.original.name.split('.')[-1:][0]}]
        else:
            myds = []


        return simplejson.dumps(myds)


    def onlydowns(self):
        mys = self.mydowns.all()
       
        if mys:
            myds = [{'pathfile':x.filex.name,
            'filename':x.filex.name.split('.')[-1:][0],'pk':x.pk} for x in mys]
        else:
            myds = []

        return simplejson.dumps(myds)



    def myvideo(self):
        vids = self.mydowns.filter(filex__icontains='.mp4').first()
        if vids:
            return vids.filex.name
        else:
            return ''

    def delete(self, *args, **kwargs):
            if self.webimage:
                os.remove(self.webimage.path)
            if self.original:            
                os.remove(self.original.path)
            if self.recorte:
                os.remove(self.recorte.path)
            super(MD_banco, self).delete(*args, **kwargs)


class Dwns(models.Model):
    filex = models.FileField(upload_to='static/banco_dwn',blank=True,null=True)
    date_create = models.DateTimeField(auto_now_add=True)

    def delete(self, *args, **kwargs):
            if self.filex.path:
                os.remove(self.filex.path)
            super(Dwns, self).delete(*args, **kwargs)



'''

FOR MULTISITES CAN WE DO THIS FACT

'''

class UserProfile(models.Model):
    myuser = models.ForeignKey(User)
    mysite = models.ForeignKey(Site)