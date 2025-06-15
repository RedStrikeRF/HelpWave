from django.conf import settings
from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models
from django.contrib.auth import get_user_model
from model_utils import FieldTracker

User = get_user_model()


class Volunteer(models.Model):
    """
    Модель для волонтера.
    """
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='volunteer_profile')
    bio = models.TextField(blank=True, help_text="Краткая информация о себе.")
    skills = models.TextField(blank=True, help_text="Перечислите ваши навыки, которые могут быть полезны.")
    availability = models.TextField(blank=True, help_text="Когда вы доступны для помощи (дни недели, время и т.д.)")

    def __str__(self):
        return f"Волонтер: {self.user.username}"

    class Meta:
        verbose_name = "Волонтер"
        verbose_name_plural = "Волонтеры"


class Organizer(models.Model):
    """
    Модель для организатора.
    """
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='organizer_profile')
    description = models.TextField(blank=True, help_text="Описание")
    contact_information = models.TextField(blank=True, help_text="Контактная информация.")

    def __str__(self):
        return f"Организатор: {self.user.username}"

    class Meta:
        verbose_name = "Организатор"
        verbose_name_plural = "Организаторы"


class Notification(models.Model):
    """
    Модель для уведомлений пользователей.
    """
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='notifications'
    )
    text = models.TextField(verbose_name="Текст уведомления")
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name="Дата создания"
    )
    is_read = models.BooleanField(
        default=False,
        verbose_name="Прочитано"
    )

    class Meta:
        verbose_name = "Уведомление"
        verbose_name_plural = "Уведомления"
        ordering = ['-created_at']

    def __str__(self):
        return f"Уведомление для {self.user.username}"


class Meeting(models.Model):
    """
    Модель для встречи (мероприятия).
    """
    organizer = models.ForeignKey(Organizer, on_delete=models.CASCADE, related_name='meetings')
    title = models.CharField(max_length=255, help_text="Название встречи.")
    description = models.TextField(help_text="Описание встречи.")
    location = models.CharField(max_length=255, help_text="Место проведения встречи.")
    start_time = models.DateTimeField(help_text="Дата и время начала встречи.")
    end_time = models.DateTimeField(help_text="Дата и время окончания встречи.")
    max_participants = models.PositiveIntegerField(default=0,
                                                   help_text="Максимальное количество участников. 0 - неограничено.")
    volunteers = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        through='VolunteerApplication',
        related_name='registered_meetings'
    )

    def __str__(self):
        return f"Встреча: {self.title} (Организатор: {self.organizer.user.username})"

    class Meta:
        verbose_name = "Встреча"


class VolunteerApplication(models.Model):
    APPLICATION_STATUS = [
        ('pending', 'На рассмотрении'),
        ('approved', 'Подтверждена'),
        ('rejected', 'Отклонена'),
    ]

    volunteer = models.ForeignKey(settings.AUTH_USER_MODEL,
                                  on_delete=models.CASCADE,
                                  related_name='applications')
    meeting = models.ForeignKey('Meeting',
                                on_delete=models.CASCADE,
                                related_name='applications')
    status = models.CharField(max_length=10,
                              choices=APPLICATION_STATUS,
                              default='pending')
    applied_at = models.DateTimeField(auto_now_add=True)
    processed_at = models.DateTimeField(null=True, blank=True)
    organizer_comment = models.TextField(blank=True, verbose_name="Комментарий организатора")

    class Meta:
        verbose_name = "Заявка волонтера"
        verbose_name_plural = "Заявки волонтеров"
        unique_together = ('volunteer', 'meeting')  # Один пользователь - одна заявка на мероприятие

    tracker = FieldTracker(fields=['status'])  # Добавить это

    def save(self, *args, **kwargs):
        old_status = self.tracker.previous('status')
        super().save(*args, **kwargs)
        #if old_status != self.status:
         #   from .tasks import send_status_email  # Импорт здесь чтобы избежать circular import
          #  send_status_email.delay(self.id)

    def __str__(self):
        return f"{self.volunteer.username} -> {self.meeting.title} ({self.get_status_display()})"


class Review(models.Model):
    organizer = models.ForeignKey(Organizer, on_delete=models.CASCADE)
    volunteer = models.ForeignKey(Volunteer, on_delete=models.CASCADE)
    meeting = models.ForeignKey(Meeting, on_delete=models.CASCADE)
    rating = models.PositiveIntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class PDFDocument(models.Model):
    organizer = models.ForeignKey(Organizer, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    pdf_file = models.FileField(upload_to='pdf_documents/')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title



