# Generated by Django 5.0.4 on 2024-04-15 05:12

import django.core.validators
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Author',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=100, unique=True)),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('birth_date', models.DateField()),
            ],
        ),
        migrations.CreateModel(
            name='Book',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('publication_date', models.DateField()),
                ('page_count', models.PositiveIntegerField()),
                ('price', models.DecimalField(decimal_places=2, max_digits=5, validators=[django.core.validators.MinValueValidator(1.0)])),
                ('is_banned', models.BooleanField(default=False)),
                ('summary', models.TextField()),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='model_examples.author')),
            ],
            options={
                'ordering': ['-publication_date'],
                'unique_together': {('title', 'author')},
            },
        ),
    ]
