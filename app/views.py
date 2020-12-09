from django.shortcuts import render, redirect
from django.core import serializers
import json

from .models import joke

context = {}

def chat(request):
	jokes = joke.objects.all().values()
	context['jokes'] = jokes
	return render(request, 'app/chat.html', context)

#CRUD operations in Django: https://www.javatpoint.com/django-crud-application
def new(request): #CREATE
	if request.method == 'POST':
		form = JokeForm(request.POST)
	if form.is_valid():
		try:
			form.save()
			return redirect('/chat')
		except:
			pass

	return render(request, 'app/chat.html', context) #passing an empty context for consistency

#get specific joke or all jokes
def get(request, id = 0): #READ
	if (id > 0): #ID specified
		requested = joke.objects.get(id = id) #get specific joke
		context['requested'] = requested
	
	#no id specified
	#requested = serializer.serialize(joke.objects.all())
	context['jokes'] = joke.objects.all().values()

	#uncomment to see joke list being sent in console
	#parsed = json.loads(context['jokes'])
	#print(json.dumps(parsed, indent=4, sort_keys=True))

	return render(request, 'app/chat.html', context)

#delete any joke the user doesn't like
def destroy(request, id): #DELETE
	toDelete = joke.objects.get(id = id)
	toDelete.delete()

	#get the new list of jokes (I'm not sure if this is necessary)
	jokes = serializer.serialize(joke.objects.all())
	context['jokes'] = jokes

	return render(request, 'app/chat.html', context)
