#learned about forms from: https://www.javatpoint.com/django-crud-application
from django import forms
from .models import joke

class JokeForm(forms.ModelForm):
	class Meta:
		model = joke
		fields = "__all__"