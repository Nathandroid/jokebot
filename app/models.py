from django.db import models

class joke(models.Model):
    setup = models.CharField(max_length=255)
    delivery = models.CharField(max_length=255)

    def get_setup(self):
        return self.setup

    def get_delivery(self):
        return self.delivery

    def __str__(self):
        return "Setup: " + self.setup + "\nDelivery: " + self.delivery

    class Meta:
        #set table name as jokes for clarity
        db_table = 'jokes'
