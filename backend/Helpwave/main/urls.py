# main/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)
from .views import (
    NotificationViewSet,
    UserViewSet,
    VolunteerViewSet,
    OrganizerViewSet,
    MeetingViewSet,
    ObtainTokenPairWithVolunteerOrOrganizerView,
    VolunteerApplicationViewSet, ReviewViewSet, PDFDocumentViewSet, MeetingRegistrationViewSet, MeetingSearchView,
)

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'volunteers', VolunteerViewSet)
router.register(r'organizers', OrganizerViewSet)
router.register(r'notifications', NotificationViewSet, basename='user-notifications')
router.register(r'meetings', MeetingViewSet)
router.register(r'applications', VolunteerApplicationViewSet, basename='applications')
router.register(r'reviews', ReviewViewSet, basename='review')
router.register(r'pdf-documents', PDFDocumentViewSet, basename='pdfdocument')
router.register(r'meetings', MeetingRegistrationViewSet, basename='meetings-registration')
urlpatterns = [
    path('events/search/', MeetingSearchView.as_view(), name='events-search'),
    # Маршрут для получения токена (JWT)
    path('auth/', ObtainTokenPairWithVolunteerOrOrganizerView.as_view(), name='token_obtain_pair'),

    # Маршрут для обновления токена (JWT)
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Маршрут для верификации токена (JWT)
    path('auth/verify/', TokenVerifyView.as_view(), name='token_verify'),



    path('', include(router.urls)),
]
