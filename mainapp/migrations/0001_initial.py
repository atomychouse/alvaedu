# -*- coding: utf-8 -*-
# Generated by Django 1.9.8 on 2016-09-03 05:23
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Section',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sec_name', models.CharField(max_length=200, verbose_name='Nombre Secci\xf3n')),
                ('sec_slug', models.SlugField(max_length=255, unique=True, verbose_name='slug')),
                ('page_type', models.CharField(choices=[('Pediatrico', 'Pediatrico'), ('Adulto', 'Adulto'), ('Geriatrico', 'Geriatrico'), ('Discapacidad', 'Discapacidad'), ('Cronico', 'Cronico')], max_length=5, verbose_name='Tipo')),
                ('template_ly', models.CharField(max_length=100, verbose_name='Template')),
                ('orden', models.IntegerField(default=1)),
                ('parent', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='mainapp.Section')),
            ],
        ),
    ]
