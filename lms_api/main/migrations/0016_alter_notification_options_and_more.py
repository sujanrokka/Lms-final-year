# Generated by Django 5.0.6 on 2024-06-10 14:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0015_notification'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='notification',
            options={'verbose_name_plural': '10. Notification'},
        ),
        migrations.RemoveField(
            model_name='notification',
            name='notif_text',
        ),
        migrations.AlterField(
            model_name='notification',
            name='notif_for',
            field=models.CharField(max_length=200, verbose_name='Notification For'),
        ),
        migrations.AlterField(
            model_name='notification',
            name='notif_read_status',
            field=models.BooleanField(default=False, verbose_name='Notification status'),
        ),
    ]
