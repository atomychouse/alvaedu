# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('admins', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='md_banco',
            name='isvideo',
            field=models.IntegerField(default=0),
        ),
    ]
