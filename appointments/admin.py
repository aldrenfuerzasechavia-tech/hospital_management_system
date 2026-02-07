from django.contrib import admin
from django.contrib.auth.models import Group
from .models import Patient, Doctor, Appointment


# Unregister Groups from admin
admin.site.unregister(Group)


@admin.register(Patient)
class PatientAdmin(admin.ModelAdmin):
    list_display = ['patient_id', 'patient_name', 'age', 'sex', 'phone_number']
    search_fields = ['patient_name', 'phone_number']
    list_filter = ['sex', 'age']
    ordering = ['patient_id']


@admin.register(Doctor)
class DoctorAdmin(admin.ModelAdmin):
    list_display = ['doctor_id', 'doctor_name', 'specialization']
    search_fields = ['doctor_name', 'specialization']
    list_filter = ['specialization']
    ordering = ['doctor_id']


@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ['appointment_id', 'patient', 'doctor', 'appointment_date', 'appointment_time']
    list_filter = ['appointment_date', 'doctor']
    search_fields = ['patient__patient_name', 'doctor__doctor_name']
    ordering = ['-appointment_date', '-appointment_time']
    
    def get_queryset(self, request):
        qs = super().get_queryset(request)
        return qs.select_related('patient', 'doctor')


# Customize admin site headers
admin.site.site_header = "Hospital Management System Administration"
admin.site.site_title = "Hospital Admin"
admin.site.index_title = "Welcome to Hospital Management System Admin Panel"