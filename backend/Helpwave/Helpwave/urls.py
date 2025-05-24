
from django.contrib import admin
from django.http import HttpResponse
from django.urls import path, include

urlpatterns = [
    path('', lambda request: HttpResponse("Welcome to Helpwave API", content_type="text/plain")),
    path('api/', include('Helpwave.main.urls')),
    path('admin/', admin.site.urls),
]
