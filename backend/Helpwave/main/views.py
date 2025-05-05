from datetime import timezone

from django.http import HttpResponse
from django.shortcuts import render, get_object_or_404
from rest_framework import serializers, viewsets, permissions, generics, status
from django.contrib.auth import get_user_model
from rest_framework.decorators import action
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from datetime import datetime
from .models import Volunteer, Organizer, Meeting, VolunteerApplication, Review
from .serializers import UserSerializer, VolunteerSerializer, OrganizerSerializer, MeetingSerializer, \
    VolunteerApplicationSerializer, VolunteerApplicationUpdateSerializer, VolunteerApplicationCreateSerializer, \
    ReviewSerializer

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
        # Разрешаем создавать пользователей всем, а остальное - только аутентифицированным пользователям.
        if self.action == 'create':
            permission_classes = [permissions.AllowAny]
        else:
            permission_classes = [permissions.IsAuthenticated]
        return [permission() for permission in permission_classes]


class OrganizerViewSet(viewsets.ModelViewSet):
    queryset = Organizer.objects.all()
    serializer_class = OrganizerSerializer

    def get_permissions(self):
        # Разрешаем создавать пользователей всем, а остальное - только аутентифицированным пользователям.
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


class VolunteerApplicationViewSet(viewsets.ModelViewSet):
    queryset = VolunteerApplication.objects.all()
    serializer_class = VolunteerApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if self.action == 'by_meeting':
            meeting_id = self.kwargs.get('meeting_id')
            return VolunteerApplication.objects.filter(
                meeting_id=meeting_id,
                meeting__organizer__user=user
            )
        return VolunteerApplication.objects.filter(volunteer=user)

    def get_serializer_class(self):
        if self.action == 'create':
            return VolunteerApplicationCreateSerializer
        elif self.action in ['update', 'partial_update']:
            return VolunteerApplicationUpdateSerializer
        return VolunteerApplicationSerializer

    def perform_create(self, serializer):
        meeting_id = self.request.data.get('meeting')
        meeting = get_object_or_404(Meeting, pk=meeting_id)

        if VolunteerApplication.objects.filter(volunteer=self.request.user, meeting=meeting).exists():
            raise serializers.ValidationError("Вы уже подавали заявку на это мероприятие")

        serializer.save(volunteer=self.request.user, meeting=meeting)

    def perform_update(self, serializer):
        if 'status' in serializer.validated_data:
            serializer.save(processed_at=datetime.now())
        else:
            serializer.save()

    @action(detail=False, methods=['get'], url_path='by-meeting/(?P<meeting_id>[^/.]+)')
    def by_meeting(self, request, meeting_id=None):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def apply(self, request, pk=None):
        meeting = self.get_object()
        data = {'meeting': meeting.id, **request.data}

        serializer = VolunteerApplicationCreateSerializer(
            data=data,
            context={'request': request}
        )

        if serializer.is_valid():
            if VolunteerApplication.objects.filter(volunteer=request.user, meeting=meeting).exists():
                return Response(
                    {"detail": "Вы уже подавали заявку на это мероприятие"},
                    status=status.HTTP_400_BAD_REQUEST
                )

            serializer.save(volunteer=request.user, meeting=meeting)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ReviewViewSet(viewsets.ModelViewSet):
    serializer_class = ReviewSerializer
    queryset = Review.objects.all()

    def get_organizer(self, user):
        try:
            return Organizer.objects.get(user=user)
        except Organizer.DoesNotExist:
            raise PermissionDenied("You must be an organizer to perform this action.")

    def get_queryset(self):
        organizer = self.get_organizer(self.request.user)
        return Review.objects.filter(organizer=organizer)

    def create(self, request, *args, **kwargs):
        organizer = self.get_organizer(request.user)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(organizer=organizer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        organizer = self.get_organizer(request.user)

        if instance.organizer != organizer:
            raise PermissionDenied("You can only update your own reviews.")

        return super().update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        organizer = self.get_organizer(request.user)

        if instance.organizer != organizer:
            raise PermissionDenied("You can only delete your own reviews.")

        return super().destroy(request, *args, **kwargs)