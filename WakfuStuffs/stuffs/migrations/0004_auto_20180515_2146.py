# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2018-05-15 19:46
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stuffs', '0003_auto_20180515_2138'),
    ]

    operations = [
        migrations.AlterField(
            model_name='stuff',
            name='bonus',
            field=models.CharField(max_length=2500),
        ),
    ]