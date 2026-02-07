from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

# API Router
router = DefaultRouter()
router.register(r'patients', views.PatientViewSet, basename='patient-api')
router.register(r'doctors', views.DoctorViewSet, basename='doctor-api')
router.register(r'appointments', views.AppointmentViewSet, basename='appointment-api')

urlpatterns = [
    # Web URLs (HTML Pages)
    path('', views.PatientListView.as_view(), name='patient_list'),
    
    # Patient URLs
    path('patients/', views.PatientListView.as_view(), name='patient_list'),
    path('patients/add/', views.PatientCreateView.as_view(), name='patient_create'),
    path('patients/<int:pk>/edit/', views.PatientUpdateView.as_view(), name='patient_update'),
    path('patients/<int:pk>/delete/', views.PatientDeleteView.as_view(), name='patient_delete'),
    
    # Doctor URLs
    path('doctors/', views.DoctorListView.as_view(), name='doctor_list'),
    path('doctors/add/', views.DoctorCreateView.as_view(), name='doctor_create'),
    path('doctors/<int:pk>/edit/', views.DoctorUpdateView.as_view(), name='doctor_update'),
    path('doctors/<int:pk>/delete/', views.DoctorDeleteView.as_view(), name='doctor_delete'),
    
    # Appointment URLs
    path('appointments/', views.AppointmentListView.as_view(), name='appointment_list'),
    path('appointments/add/', views.AppointmentCreateView.as_view(), name='appointment_create'),
    path('appointments/<int:pk>/edit/', views.AppointmentUpdateView.as_view(), name='appointment_update'),
    path('appointments/<int:pk>/delete/', views.AppointmentDeleteView.as_view(), name='appointment_delete'),
    
    # API URLs
    path('api/', include(router.urls)),
]