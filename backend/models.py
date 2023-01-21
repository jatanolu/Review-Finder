from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class YelpUser(AbstractUser):

    email = models.EmailField(max_length=255, unique=True,)
    username = models.CharField(max_length=255, unique=True,)
    is_active= models.BooleanField(default=True,)

    REQUIRED_FIELD = []


    def __str__(self):
        return self.username


class List(models.Model):
    name = models.CharField(max_length=255,)
    user = models.ForeignKey(YelpUser, on_delete = models.CASCADE) 

    def __str__(self):
        return self.name

class Place(models.Model):
    list_cat = models.ForeignKey(List, on_delete = models.CASCADE)
    biz_name = models.CharField(max_length=255,)
    note = models.TextField()

    def __str__(self):
        return self.biz_name + ' '+ self.note


