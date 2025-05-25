
from django.core.mail import send_mail
from django.template.loader import render_to_string
from .models import VolunteerApplication



def send_status_email(application_id):
    application = VolunteerApplication.objects.get(id=application_id)
    context = {
        'username': application.volunteer.username,
        'meeting_title': application.meeting.title,
        'status': application.get_status_display(),
    }

   ## html_message = render_to_string('emails/status_change.html', context)
    send_mail(
        f"Статус заявки изменен: {context['status']}",
        '',
        None,  # Использует DEFAULT_FROM_EMAIL из settings.py
        [application.volunteer.email],
        ##html_message=html_message,
        fail_silently=False,
    )