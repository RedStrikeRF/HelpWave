from django.db import models
from django.contrib.auth import get_user_model

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
    max_participants = models.PositiveIntegerField(default=0, help_text="Максимальное количество участников. 0 - неограничено.")

    # Поля для поиска и фильтрации (пункт 2.3)

    def __str__(self):
        return f"Встреча: {self.title} (Организатор: {self.organizer.user.username})"

    class Meta:
        verbose_name = "Встреча"