from django.shortcuts import render

from .models import joke

def chat(request):

	context = {}

    #render specified chat template with given context
	return render(request, 'app/chat.html', context)
