from django.shortcuts import render, redirect
from django.core import serializers
import json

from .models import joke

#serializers: https://stackoverflow.com/questions/10358803/is-it-possible-to-use-javascript-to-get-data-from-django-models-db/10360147
serializer = serializers.get_serializer("json")()
jokes = serializer.serialize(joke.objects.all())

context = {
	'jokes': jokes
}

def chat(request):
	return render(request, 'app/chat.html', context)

#CRUD operations in Django: https://www.javatpoint.com/django-crud-application
def new(request): #CREATE
	if request.method === 'POST':
		form = JokeForm(request.POST)
	if form.is_valid():
		try:
			form.save()
			return redirect('/chat')
		except:
			pass

	else:
		form = JokeForm()

	return render(request, 'app/chat.html', {'form':form}) #I don't think I want to pass the form as context here. Maybe a new joke list?

#get specific joke
def get(request, id): #READ
	if request.method == "READ":
		context['joke'] = joke.objects.get(id=id)
	else:
		context['error'] = true

#delete any joke the user doesn't like
def destroy(request, id): #DELETE
	if request.method == "DELETE":
		jokeToDelete = joke.objects.get(id=id)
	else:
		context['error'] = true
