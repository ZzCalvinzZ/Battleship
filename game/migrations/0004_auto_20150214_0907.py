# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('game', '0003_auto_20150214_0906'),
    ]

    operations = [
        migrations.AlterField(
            model_name='player',
            name='lastCoordGuessed',
            field=models.CharField(default=b'N', max_length=2),
            preserve_default=True,
        ),
    ]
