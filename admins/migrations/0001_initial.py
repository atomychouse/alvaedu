# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('sites', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Categoria',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('catname', models.CharField(default='categoria', max_length=200)),
                ('catslug', models.CharField(default='categoria', max_length=200)),
                ('orden', models.IntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='Colorreject',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('color', models.TextField(null=True, blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='Colors',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('color', models.CharField(max_length=20)),
                ('colortype', models.CharField(default='prim', max_length=100)),
                ('croma', models.TextField(null=True, blank=True)),
                ('w', models.CharField(default=20, max_length=10)),
                ('percente', models.CharField(default=20, max_length=10)),
                ('roundper', models.CharField(default=20, max_length=10)),
                ('orden', models.IntegerField(default=1)),
                ('syscolor', models.BooleanField(default=True)),
                ('sitio', models.ForeignKey(blank=True, to='sites.Site', null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Configurador',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('typeconf', models.CharField(max_length=10, null=True, blank=True)),
                ('slugmodule', models.CharField(max_length=50, null=True, blank=True)),
                ('configurate', models.TextField(null=True, blank=True)),
                ('sitio', models.ForeignKey(to='sites.Site')),
            ],
        ),
        migrations.CreateModel(
            name='Cromaticocolores',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('orden', models.IntegerField(default=0)),
                ('wbar', models.CharField(max_length=80, null=True, blank=True)),
                ('porcentaje', models.CharField(max_length=80, null=True, blank=True)),
                ('cromas', models.TextField(null=True, blank=True)),
                ('color', models.ForeignKey(to='admins.Colors')),
            ],
        ),
        migrations.CreateModel(
            name='Downl',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('mdpk', models.IntegerField()),
                ('dwfile', models.FileField(upload_to='static/descargables')),
                ('orden', models.IntegerField(default=1)),
                ('modelname', models.CharField(max_length=50)),
                ('fecha_alta', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Dwns',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('filex', models.FileField(null=True, upload_to='static/banco_dwn', blank=True)),
                ('date_create', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Fontfile',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('fuente_file', models.FileField(upload_to='static/dyfonts/')),
                ('mainf', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='Fontusage',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('usage', models.CharField(max_length=100)),
                ('enuso', models.BooleanField(default=False)),
                ('cat', models.CharField(default='cfg', max_length=100)),
                ('puntaje', models.CharField(max_length=20, null=True, blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='Fuente',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('font_name', models.CharField(max_length=200)),
                ('font_type', models.CharField(max_length=100, null=True, blank=True)),
                ('font_title', models.CharField(default='ABCDEFGHIJKLMNOPQRST...', max_length=200)),
                ('sitio', models.ForeignKey(blank=True, to='sites.Site', null=True)),
            ],
        ),
        migrations.CreateModel(
            name='MD_banco',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('descp', models.TextField(null=True, blank=True)),
                ('webimage', models.ImageField(null=True, upload_to='static/banco', blank=True)),
                ('recorte', models.ImageField(null=True, upload_to='static/banco', blank=True)),
                ('original', models.ImageField(null=True, upload_to='static/banco', blank=True)),
                ('orden', models.IntegerField(default=1)),
                ('fecha_alta', models.DateTimeField(auto_now_add=True)),
                ('mycats', models.TextField()),
                ('isvideo', models.BooleanField(default=False)),
                ('publicado', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='MD_codigo_color',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('estilo', models.CharField(default='rounded', max_length=200, verbose_name='')),
                ('principales', models.TextField()),
                ('apoyo', models.TextField()),
                ('barra', models.TextField()),
                ('listapan', models.TextField()),
                ('fecha_alta', models.DateTimeField(auto_now_add=True)),
                ('publicado', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='MD_grid',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('title', models.CharField(max_length=200, null=True, blank=True)),
                ('descp', models.TextField(default='', null=True, blank=True)),
                ('link', models.CharField(max_length=200, null=True, blank=True)),
                ('webimage', models.ImageField(null=True, upload_to='static/webimages', blank=True)),
                ('config', models.TextField(null=True, blank=True)),
                ('orden', models.IntegerField(default=1)),
                ('fecha_alta', models.DateTimeField(auto_now_add=True)),
                ('publicado', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='MD_img',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('imagen', models.ImageField(null=True, upload_to='static/md_imgs/', blank=True)),
                ('orden', models.IntegerField(default=1)),
                ('date_create', models.DateTimeField(auto_now_add=True)),
                ('titulo', models.CharField(max_length=200, null=True, blank=True)),
                ('descp', models.TextField(null=True, blank=True)),
                ('publicado', models.BooleanField(default=False)),
                ('markas', models.TextField(null=True, blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='MD_imgtxt',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('imagen', models.ImageField(null=True, upload_to='static/md_imgs/', blank=True)),
                ('orden', models.IntegerField(default=1)),
                ('date_create', models.DateTimeField(auto_now_add=True)),
                ('contenido', models.TextField(null=True, blank=True)),
                ('configs', models.TextField(null=True, blank=True)),
                ('publicado', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='MD_video',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('title', models.CharField(max_length=200, null=True, blank=True)),
                ('descp', models.TextField(null=True, blank=True)),
                ('link', models.CharField(max_length=200, null=True, blank=True)),
                ('config', models.TextField(null=True, blank=True)),
                ('orden', models.IntegerField(default=1)),
                ('fecha_alta', models.DateTimeField(auto_now_add=True)),
                ('publicado', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='Modcromatico',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('categoria', models.CharField(default='categor\xeda', max_length=200, null=True, blank=True)),
                ('orden', models.IntegerField(default=0)),
                ('config', models.TextField(null=True, blank=True)),
                ('publicado', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='Modextra',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('typo', models.CharField(default='contenido', max_length=120, null=True, blank=True)),
                ('contenido', models.TextField()),
                ('orden', models.IntegerField(default=0)),
                ('config', models.TextField(null=True, blank=True)),
                ('publicado', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='Modulo',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('slugmd', models.CharField(default='', max_length=200, verbose_name='')),
                ('icono', models.CharField(default='', max_length=200, verbose_name='')),
                ('config', models.TextField(null=True, blank=True)),
                ('orden', models.IntegerField(default=1)),
                ('mdtitle', models.CharField(max_length=200, null=True, blank=True)),
                ('fecha_alta', models.DateTimeField(auto_now_add=True)),
                ('fijo', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='Packs',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('packname', models.CharField(max_length=200)),
                ('fecha_alta', models.DateTimeField(auto_now_add=True)),
                ('typezip', models.CharField(default='zip', max_length=20, choices=[('zip', 'ZIP'), ('tar', 'TAR')])),
                ('dwfiles', models.ManyToManyField(to='admins.Downl')),
            ],
        ),
        migrations.CreateModel(
            name='Pagesettings',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('logo', models.ImageField(null=True, upload_to='static/logos/', blank=True)),
                ('configuracion', models.TextField(default='[]')),
                ('sitio', models.ForeignKey(to='sites.Site')),
            ],
        ),
        migrations.CreateModel(
            name='Seccolmenu',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('col_name', models.CharField(max_length=200, null=True, blank=True)),
                ('slug_col_name', models.CharField(max_length=500, null=True, blank=True)),
                ('orden', models.IntegerField(default=1)),
                ('fecha_alta', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'ordering': ['orden'],
            },
        ),
        migrations.CreateModel(
            name='Section',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('sec_name', models.CharField(max_length=200, verbose_name='')),
                ('sec_slug', models.SlugField(max_length=255, verbose_name='slug')),
                ('orden', models.IntegerField(default=1)),
                ('ishome', models.BooleanField(default=False)),
                ('fecha_alta', models.DateTimeField(auto_now_add=True)),
                ('publicado', models.BooleanField(default=False)),
                ('parent', models.ForeignKey(blank=True, to='admins.Section', null=True)),
                ('sec_colum_menu', models.ForeignKey(blank=True, to='admins.Seccolmenu', null=True)),
                ('sitio', models.ForeignKey(blank=True, to='sites.Site', null=True)),
            ],
            options={
                'ordering': ['orden'],
            },
        ),
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('mysite', models.ForeignKey(to='sites.Site')),
                ('myuser', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='seccolmenu',
            name='parent',
            field=models.ForeignKey(blank=True, to='admins.Section', null=True),
        ),
        migrations.AddField(
            model_name='modulo',
            name='secpk',
            field=models.ForeignKey(to='admins.Section'),
        ),
        migrations.AddField(
            model_name='modextra',
            name='modulopk',
            field=models.ForeignKey(to='admins.Modulo'),
        ),
        migrations.AddField(
            model_name='modcromatico',
            name='modulopk',
            field=models.ForeignKey(to='admins.Modulo'),
        ),
        migrations.AddField(
            model_name='md_video',
            name='modulopk',
            field=models.ForeignKey(to='admins.Modulo'),
        ),
        migrations.AddField(
            model_name='md_imgtxt',
            name='modulopk',
            field=models.ForeignKey(to='admins.Modulo'),
        ),
        migrations.AddField(
            model_name='md_img',
            name='modulopk',
            field=models.ForeignKey(to='admins.Modulo'),
        ),
        migrations.AddField(
            model_name='md_grid',
            name='modulopk',
            field=models.ForeignKey(to='admins.Modulo'),
        ),
        migrations.AddField(
            model_name='md_grid',
            name='mydowns',
            field=models.ManyToManyField(to='admins.Dwns'),
        ),
        migrations.AddField(
            model_name='md_codigo_color',
            name='modulopk',
            field=models.ForeignKey(to='admins.Modulo'),
        ),
        migrations.AddField(
            model_name='md_banco',
            name='modulopk',
            field=models.ForeignKey(to='admins.Modulo'),
        ),
        migrations.AddField(
            model_name='md_banco',
            name='mydowns',
            field=models.ManyToManyField(to='admins.Dwns'),
        ),
        migrations.AddField(
            model_name='fontusage',
            name='fontpk',
            field=models.ForeignKey(to='admins.Fuente'),
        ),
        migrations.AddField(
            model_name='fontfile',
            name='fuentepk',
            field=models.ForeignKey(to='admins.Fuente'),
        ),
        migrations.AddField(
            model_name='cromaticocolores',
            name='item',
            field=models.ForeignKey(to='admins.Modcromatico'),
        ),
        migrations.AddField(
            model_name='categoria',
            name='modulopk',
            field=models.ForeignKey(blank=True, to='admins.Modulo', null=True),
        ),
        migrations.AddField(
            model_name='categoria',
            name='parentcat',
            field=models.ForeignKey(blank=True, to='admins.Categoria', null=True),
        ),
    ]
