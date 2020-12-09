from django.contrib import admin
from django.urls import path
from app import views

urlpatterns = [
	path('admin', admin.site.urls),
	path('', views.chat),
	path('new', views.new),
	path('get', views.get),
	path('get/<int:id>', views.get),
	path('delete/<int:id>', views.destroy),
]
