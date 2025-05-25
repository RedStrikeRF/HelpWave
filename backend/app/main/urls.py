# main/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)
from .views import (
    UserViewSet,
    VolunteerViewSet,
    OrganizerViewSet,
    MeetingViewSet,
    ObtainTokenPairWithVolunteerOrOrganizerView,
    VolunteerApplicationViewSet, ReviewViewSet, PDFDocumentViewSet,
    db_check_view
)

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'volunteers', VolunteerViewSet)
router.register(r'organizers', OrganizerViewSet)
router.register(r'meetings', MeetingViewSet)
router.register(r'applications', VolunteerApplicationViewSet, basename='applications')
router.register(r'reviews', ReviewViewSet, basename='review')
router.register(r'pdf-documents', PDFDocumentViewSet, basename='pdfdocument')

urlpatterns = [
    # Маршрут для получения токена (JWT)
    path('token/', ObtainTokenPairWithVolunteerOrOrganizerView.as_view(), name='token_obtain_pair'),

    # Маршрут для обновления токена (JWT)
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Маршрут для верификации токена (JWT)
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),

    path("db-check/", db_check_view),


    path('', include(router.urls)),
]
