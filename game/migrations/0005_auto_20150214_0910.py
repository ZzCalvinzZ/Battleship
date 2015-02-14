# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('game', '0004_auto_20150214_0907'),
    ]

    operations = [
        migrations.RenameField(
            model_name='player',
            old_name='lastCoordGuessed',
            new_name='last_coord_guessed',
        ),
    ]
