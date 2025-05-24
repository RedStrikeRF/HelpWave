FROM python:3.11-slim

WORKDIR /app

COPY . .

RUN pip install --no-cache-dir -r requirements.txt

# Используем переменные окружения для Django
ENV DJANGO_SETTINGS_MODULE=Helpwave.settings

# Главное: запускаем Gunicorn из вложенной директории
CMD ["gunicorn", "--chdir", "Helpwave", "Helpwave.wsgi:application", "--bind", "0.0.0.0:8000"]
