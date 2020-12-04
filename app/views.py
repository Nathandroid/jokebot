from django.shortcuts import render

from .models import joke

def chat(request):

	context = {}
    #render given the chat template
	return render(request, 'app/chat.html', context)
