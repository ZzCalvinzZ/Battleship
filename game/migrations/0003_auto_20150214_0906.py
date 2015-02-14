# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('game', '0002_auto_20150212_1642'),
    ]

    operations = [
        migrations.AddField(
            model_name='player',
            name='lastCoordGuessed',
            field=models.CharField(default=None, max_length=3),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='coordinate',
            name='ship',
            field=models.CharField(default=b'N', max_length=1),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='player',
            name='name',
            field=models.CharField(default=b'anonymous', max_length=200),
            preserve_default=True,
        ),
    ]
