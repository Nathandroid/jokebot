from django.db import models

class joke(models.Model):
    setup = models.CharField(max_length=255)
    delivery = models.CharField(max_length=255)

    class Meta:
        #name the table jokes
        db_table = 'jokes'