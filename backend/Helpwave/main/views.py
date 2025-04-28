from django.http import HttpResponse
from django.shortcuts import render
from rest_framework import serializers, viewsets, permissions
from django.contrib.auth import get_user_model
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import Volunteer, Organizer, Meeting
from .serializers import UserSerializer, VolunteerSerializer, OrganizerSerializer, MeetingSerializer
User = get_user_model()

# Create your views here.
# ViewSets
def home(request):
    return HttpResponse("Welcome to Helpwave API! Try /token/ for authentication.")
class UserViewSet(viewsets.ModelViewSet):  # Changed to inherit from ModelViewSet
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAdminUser]

class VolunteerViewSet(viewsets.ModelViewSet):
    queryset = Volunteer.objects.all()
    serializer_class = VolunteerSerializer

    def get_permissions(self):
        #Разрешаем создавать пользователей всем, а остальное - только аутентифицированным пользователям.
        if self.action == 'create':
            permission_classes = [permissions.AllowAny]
        else:
            permission_classes = [permissions.IsAuthenticated]
        return [permission() for permission in permission_classes]

class OrganizerViewSet(viewsets.ModelViewSet):
    queryset = Organizer.objects.all()
    serializer_class = OrganizerSerializer

    def get_permissions(self):
        #Разрешаем создавать пользователей всем, а остальное - только аутентифицированным пользователям.
        if self.action == 'create':
            permission_classes = [permissions.AllowAny]
        else:
            permission_classes = [permissions.IsAuthenticated]
        return [permission() for permission in permission_classes]



class MeetingViewSet(viewsets.ModelViewSet):
    queryset = Meeting.objects.all()
    serializer_class = MeetingSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        user = request.user
        try:
            organizer = Organizer.objects.get(user=user)
            return super().create(request, *args, **kwargs)
        except Organizer.DoesNotExist:
            raise PermissionDenied("Вы должны быть организатором для создания встреч.")

    def update(self, request, *args, **kwargs):
        """
        Переопределяем метод update, чтобы проверять, является ли пользователь организатором.
        А также, чтобы он был организатором встречи.
        """
        instance = self.get_object()
        user = request.user

        try:
            organizer = Organizer.objects.get(user=user)
        except Organizer.DoesNotExist:
            raise PermissionDenied("Вы должны быть организатором для обновления встреч.")

        if instance.organizer != organizer:
             raise PermissionDenied("Вы должны быть организатором встречи для ее обновления.")

        return super().update(request, *args, **kwargs)


    def destroy(self, request, *args, **kwargs):
        """
        Переопределяем метод destroy, чтобы проверять, является ли пользователь организатором.
        А также, чтобы он был организатором встречи.
        """
        instance = self.get_object()
        user = request.user

        try:
            organizer = Organizer.objects.get(user=user)
        except Organizer.DoesNotExist:
            raise PermissionDenied("Вы должны быть организатором для удаления встреч.")

        if instance.organizer != organizer:
             raise PermissionDenied("Вы должны быть организатором встречи для ее удаления.")

        return super().destroy(request, *args, **kwargs)


    def perform_create(self, serializer):
        user = self.request.user
        organizer = Organizer.objects.get(user=user)
        serializer.save(organizer=organizer)  # Сохраняем организатора


# JWT Authentication (Token Obtain View)
class ObtainTokenPairWithVolunteerOrOrganizerView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)

        if response.status_code == 200:
            # Get the user from the validated token data instead
            username = request.data.get('username')
            try:
                user = User.objects.get(username=username)

                # Add volunteer data if exists
                try:
                    volunteer = Volunteer.objects.get(user=user)
                    response.data['volunteer_profile'] = VolunteerSerializer(volunteer).data
                except Volunteer.DoesNotExist:
                    pass

                # Add organizer data if exists
                try:
                    organizer = Organizer.objects.get(user=user)
                    response.data['organizer_profile'] = OrganizerSerializer(organizer).data
                except Organizer.DoesNotExist:
                    pass

            except User.DoesNotExist:
                return Response({"error": "User not found"}, status=400)

        return response