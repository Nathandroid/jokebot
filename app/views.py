from django.shortcuts import render
import json

from .models import joke

def chat(request):

	context = {}

	#CRUD operations in Django: https://www.javatpoint.com/django-crud-application
	def newJoke(request, joke_to_add): #CREATE
		if request.method == "POST":
			joke_to_add.save()
		else:
			context['error'] = true

	#get specific joke
	def getJokeById(request, id): #READ
		if request.method == "READ":
			context['joke'] = joke.objects.get(id=id)
		else:
			context['error'] = true

	def getAllJokes(request): #READ
		if request.method == "READ":
			context['jokes'] = joke.objects.all()
		else:
			context['error'] = true

	#delete any joke the user doesn't like
	def deleteJokeById(request, id): #DELETE
		if request.method == "DELETE":
			jokeToDelete = joke.objects.get(id=id)
		else:
			context['error'] = true


    #render specified chat template with given context
    #I only have one view, so I only have one render
	return render(request, 'app/chat.html', context)
