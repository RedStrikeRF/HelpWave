from rest_framework import serializers, viewsets, permissions
from django.contrib.auth import get_user_model
from .models import Volunteer, Organizer, Meeting, VolunteerApplication, Review, PDFDocument, Notification

User = get_user_model()


# Serializers
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {
            'password': {'write_only': True},
            'username': {'validators': []}  # Disable uniqueness validator for updates
        }

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        if password:
            instance.set_password(password)
        return super().update(instance, validated_data)

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)  # Хеширование пароля
        user.save()
        return user


class VolunteerSerializer(serializers.ModelSerializer):
    user = UserSerializer()  # Вложенный сериализатор для User

    class Meta:
        model = Volunteer
        fields = ('id', 'user', 'bio', 'skills', 'availability')

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user_serializer = UserSerializer(data=user_data)
        if user_serializer.is_valid():
            user = user_serializer.save()
            volunteer = Volunteer.objects.create(user=user, **validated_data)
            return volunteer
        raise serializers.ValidationError(user_serializer.errors)

    def update(self, instance, validated_data):
        # Обрабатываем вложенные данные пользователя
        user_data = validated_data.pop('user', None)
        if user_data:
            user_serializer = UserSerializer(
                instance.user,
                data=user_data,
                partial=self.partial
            )
            user_serializer.is_valid(raise_exception=True)
            user_serializer.save()

        # Обновляем данные волонтера
        return super().update(instance, validated_data)


class OrganizerSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Organizer
        fields = ('id', 'user', 'description', 'contact_information')

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user_serializer = UserSerializer(data=user_data)
        if user_serializer.is_valid():
            user = user_serializer.save()
            organizer = Organizer.objects.create(user=user, **validated_data)
            return organizer
        raise serializers.ValidationError(user_serializer.errors)

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', {})

        # Get the current user instance
        user_instance = instance.user

        # Handle password separately if provided
        password = user_data.pop('password', None)

        # Update user fields
        user_serializer = UserSerializer(
            instance=user_instance,
            data=user_data,
            partial=True  # Crucial for partial updates
        )

        if user_serializer.is_valid():
            if password:
                user_instance.set_password(password)
            user_serializer.save()
        else:
            raise serializers.ValidationError({
                'user': user_serializer.errors
            })

        # Update organizer fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        return instance


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['id', 'text', 'created_at']
        read_only_fields = fields


class SimpleUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name')


class MeetingSerializer(serializers.ModelSerializer):
    volunteers = SimpleUserSerializer(many=True, read_only=True)
    organizer = OrganizerSerializer(read_only=True)  # Сериализует данные органайзера

    class Meta:
        model = Meeting
        fields = '__all__'
        read_only_fields = ('organizer',)


class VolunteerApplicationSerializer(serializers.ModelSerializer):
    volunteer_username = serializers.CharField(source='volunteer.username', read_only=True)
    meeting_title = serializers.CharField(source='meeting.title', read_only=True)
    organizer_name = serializers.CharField(source='meeting.organizer.user.username', read_only=True)

    class Meta:
        model = VolunteerApplication
        fields = [
            'id', 'volunteer', 'volunteer_username', 'meeting', 'meeting_title',
            'organizer_name', 'status', 'applied_at', 'processed_at', 'organizer_comment'
        ]
        read_only_fields = [
            'volunteer', 'volunteer_username', 'meeting', 'meeting_title',
            'organizer_name', 'applied_at', 'processed_at'
        ]


class VolunteerApplicationCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = VolunteerApplication
        fields = ['meeting', 'organizer_comment']
        extra_kwargs = {'organizer_comment': {'required': False}}


class VolunteerApplicationUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = VolunteerApplication
        fields = ['status', 'organizer_comment']
        extra_kwargs = {'organizer_comment': {'required': False}}


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id', 'volunteer', 'meeting', 'rating', 'comment', 'created_at', 'updated_at']
        read_only_fields = ['organizer', 'created_at', 'updated_at']


class PDFDocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = PDFDocument
        fields = ['id', 'title', 'pdf_file', 'created_at', 'updated_at']
        read_only_fields = ['organizer', 'created_at', 'updated_at']


class MeetingSearchSerializer(serializers.ModelSerializer):
    startDate = serializers.DateField(source='start_time.date', read_only=True)
    endDate = serializers.DateField(source='end_time.date', read_only=True)
    startTime = serializers.TimeField(source='start_time.time', read_only=True)
    endTime = serializers.TimeField(source='end_time.time', read_only=True)
    address = serializers.CharField(source='location', read_only=True)
    categories = serializers.SerializerMethodField()  # Заглушка для категорий

    class Meta:
        model = Meeting
        fields = [
            'id',
            'title',
            'startDate',
            'endDate',
            'startTime',
            'endTime',
            'address',
            'categories'
        ]

    def get_categories(self, obj):
        # Заглушка - в текущей модели нет категорий
        return []