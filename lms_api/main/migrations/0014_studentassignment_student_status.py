# Generated by Django 5.0.6 on 2024-06-09 12:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0013_alter_courserating_options_studentassignment'),
    ]

    operations = [
        migrations.AddField(
            model_name='studentassignment',
            name='student_status',
            field=models.BooleanField(default=False, null=True),
        ),
    ]
