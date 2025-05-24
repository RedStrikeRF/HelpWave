FROM python:3.11-slim

WORKDIR /app

ENV PYTHONPATH="${PYTHONPATH}:/app/Helpwave"

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

ENV DJANGO_SETTINGS_MODULE=Helpwave.Helpwave.settings

CMD ["gunicorn", "Helpwave.Helpwave.wsgi:application", "--bind", "0.0.0.0:8080"]