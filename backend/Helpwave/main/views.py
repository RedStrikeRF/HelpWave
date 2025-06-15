from datetime import timezone

from django.db.models import Q
from django.http import HttpResponse, FileResponse
from django.shortcuts import render, get_object_or_404
from rest_framework import serializers, viewsets, permissions, generics, status
from django.contrib.auth import get_user_model
from rest_framework.decorators import action
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from datetime import datetime
from .models import Volunteer, Organizer, Meeting, VolunteerApplication, Review, PDFDocument, Notification
from .serializers import UserSerializer, VolunteerSerializer, OrganizerSerializer, MeetingSerializer, \
    VolunteerApplicationSerializer, VolunteerApplicationUpdateSerializer, VolunteerApplicationCreateSerializer, \
    ReviewSerializer, PDFDocumentSerializer, NotificationSerializer, MeetingSearchSerializer

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

    @action(detail=False, methods=['get', 'put', 'patch'])
    def me(self, request):
        # Получаем волонтера по текущему пользователю
        volunteer = get_object_or_404(Volunteer, user=request.user)

        if request.method in ['PUT', 'PATCH']:
            # Для обновления данных
            serializer = self.get_serializer(
                volunteer,
                data=request.data,
                partial=request.method == 'PATCH'  # partial=True для PATCH
            )
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)

        # Для GET запроса
        serializer = self.get_serializer(volunteer)
        return Response(serializer.data)


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

    @action(detail=False, methods=['get', 'put', 'patch'])
    def me(self, request):
        organizer = get_object_or_404(Organizer, user=request.user)

        if request.method in ['PUT', 'PATCH']:
            serializer = self.get_serializer(
                organizer,
                data=request.data,
                partial=request.method == 'PATCH'
            )
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)

        serializer = self.get_serializer(organizer)
        return Response(serializer.data)


class NotificationViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = NotificationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user_id = self.kwargs.get('user_pk')
        return Notification.objects.filter(
            user_id=user_id
        ).order_by('-created_at')


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


class PDFDocumentViewSet(viewsets.ModelViewSet):
    serializer_class = PDFDocumentSerializer
    queryset = PDFDocument.objects.all()

    def get_organizer(self, user):
        try:
            return Organizer.objects.get(user=user)
        except Organizer.DoesNotExist:
            raise PermissionDenied("Вы должны быть организатором для выполнения этого действия.")

    # Main permission check method
    def check_organizer_permissions(self, request):
        if not request.user.is_authenticated:
            raise PermissionDenied("Требуется аутентификация.")

        try:
            return Organizer.objects.get(user=request.user)
        except Organizer.DoesNotExist:
            raise PermissionDenied("Вы должны быть организатором для выполнения этого действия.")

    def get_queryset(self):
        organizer = self.check_organizer_permissions(self.request.user)
        return PDFDocument.objects.filter(organizer=organizer)

    def perform_create(self, serializer):
        organizer = self.check_organizer_permissions(self.request.user)
        serializer.save(organizer=organizer)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        organizer = self.check_organizer_permissions(request.user)

        if instance.organizer != organizer:
            raise PermissionDenied("Вы можете изменять только свои собственные документы.")

        return super().update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        organizer = self.check_organizer_permissions(request.user)

        if instance.organizer != organizer:
            raise PermissionDenied("Вы можете удалять только свои собственные документы.")

        instance.pdf_file.delete()  # Delete the actual file
        return super().destroy(request, *args, **kwargs)

    @action(detail=True, methods=['get'])
    def download(self, request, pk=None):
        # Check if user is a volunteer
        try:
            volunteer = Volunteer.objects.get(user=request.user)
        except Volunteer.DoesNotExist:
            raise PermissionDenied("Только волонтеры могут скачивать документы.")

        pdf_doc = self.get_object()
        response = FileResponse(pdf_doc.pdf_file)
        response['Content-Disposition'] = f'attachment; filename="{pdf_doc.title}.pdf"'
        return response


class MeetingRegistrationViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=True, methods=['post'], url_path='register')
    def register(self, request, pk=None):
        """
        Запись волонтёра на мероприятие
        POST /api/meetings/<id>/register/
        """
        meeting = get_object_or_404(Meeting, pk=pk)
        user = request.user

        # Проверка, что пользователь - волонтер
        if not hasattr(user, 'volunteer_profile'):
            return Response(
                {"error": "Только волонтеры могут записываться на мероприятия"},
                status=status.HTTP_403_FORBIDDEN
            )

        # Проверка, не записан ли уже
        if meeting.volunteers.filter(pk=user.pk).exists():
            return Response(
                {"error": "Вы уже записаны на это мероприятие"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Проверка максимального количества участников
        if meeting.max_participants > 0 and meeting.volunteers.count() >= meeting.max_participants:
            return Response(
                {"error": "Мероприятие уже заполнено"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Создаем запись через промежуточную модель
        VolunteerApplication.objects.create(
            volunteer=user,
            meeting=meeting,
            status='approved'  # Автоматическое подтверждение
        )

        return Response(
            {"message": "Вы записаны на мероприятие"},
            status=status.HTTP_201_CREATED
        )

    @action(detail=True, methods=['delete'], url_path='unregister')
    def unregister(self, request, pk=None):
        """
        Отмена записи на мероприятие
        DELETE /api/meetings/<id>/unregister/
        """
        meeting = get_object_or_404(Meeting, pk=pk)
        user = request.user

        # Проверка, что запись существует
        application = VolunteerApplication.objects.filter(
            volunteer=user,
            meeting=meeting
        ).first()

        if not application:
            return Response(
                {"error": "Вы не записаны на это мероприятие"},
                status=status.HTTP_404_NOT_FOUND
            )

        application.delete()
        return Response(
            {"message": "Ваша запись на мероприятие отменена"},
            status=status.HTTP_204_NO_CONTENT
        )


class MeetingSearchView(APIView):
    def get(self, request):
        # Извлечение параметров запроса
        query = request.query_params.get('query', '')
        location = request.query_params.get('location', '')
        start_date = request.query_params.get('startDate')
        end_date = request.query_params.get('endDate')
        sort_by = request.query_params.get('sortBy', 'date_asc')
        limit = int(request.query_params.get('limit', 10))
        offset = int(request.query_params.get('offset', 0))

        # Базовый запрос
        meetings = Meeting.objects.all()

        # Фильтрация по текстовому запросу
        if query:
            meetings = meetings.filter(
                Q(title__icontains=query) |
                Q(description__icontains=query)
            )

        # Фильтрация по местоположению
        if location:
            meetings = meetings.filter(location__icontains=location)

        # Фильтрация по дате начала
        if start_date:
            try:
                start_date = datetime.datetime.strptime(start_date, '%Y-%m-%d').date()
                meetings = meetings.filter(start_time__date__gte=start_date)
            except ValueError:
                pass

        # Фильтрация по дате окончания
        if end_date:
            try:
                end_date = datetime.datetime.strptime(end_date, '%Y-%m-%d').date()
                meetings = meetings.filter(end_time__date__lte=end_date)
            except ValueError:
                pass

        # Сортировка
        if sort_by == 'date_asc':
            meetings = meetings.order_by('start_time')
        elif sort_by == 'date_desc':
            meetings = meetings.order_by('-start_time')
        elif sort_by == 'newest':
            meetings = meetings.order_by('-id')
        # 'popularity' пока не реализовано - нет данных о популярности

        # Пагинация
        total = meetings.count()
        meetings = meetings[offset:offset + limit]

        # Сериализация результатов
        serializer = MeetingSearchSerializer(meetings, many=True)

        return Response({
            'events': serializer.data,
            'total': total
        })