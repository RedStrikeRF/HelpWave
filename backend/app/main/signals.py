from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import VolunteerApplication


@receiver(post_save, sender=VolunteerApplication)
def application_status_changed(sender, instance, created, **kwargs):
    if not created and instance.tracker.has_changed('status'):
        instance.send_status_email()
