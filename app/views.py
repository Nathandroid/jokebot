from django.shortcuts import render, redirect
from django.core import serializers
import json

from .models import joke
from .forms import JokeForm

context = {}

def chat(request):
	jokes = joke.objects.all().values()
	context['jokes'] = jokes
	return render(request, 'app/chat.html', context)

#CRUD operations example in Django: https://www.javatpoint.com/django-crud-application
def new(request): #CREATE
	if request.method == 'POST':
		form = JokeForm(request.POST)
	if form.is_valid():
		try:
			form.save()
			return redirect('/')
		except:
			pass

	return render(request, 'app/chat.html', context) #passing an empty context for consistency

#get specific joke or all jokes
def get(request, id = 0): #READ
	if (id > 0): #ID specified
		requested = joke.objects.get(id = id) #get specific joke
		context['requested'] = requested
	
	#no id specified
	context['jokes'] = joke.objects.all().values()

	#uncomment to see joke list being sent in console
	#parsed = json.loads(context['jokes'])
	#print(json.dumps(parsed, indent=4, sort_keys=True))

	return render(request, 'app/chat.html', context)

#delete any joke the user doesn't like
def destroy(request, id): #DELETE
	toDelete = joke.objects.get(id = id)
	toDelete.delete()

	context['jokes'] = joke.objects.all().values()

	return render(request, 'app/chat.html', context)
