from django.contrib import admin
from .models import Patient, Doctor, Appointment


@admin.register(Patient)
class PatientAdmin(admin.ModelAdmin):
    list_display = ['patient_id', 'patient_name', 'age', 'sex', 'phone_number']
    search_fields = ['patient_name', 'phone_number']


@admin.register(Doctor)
class DoctorAdmin(admin.ModelAdmin):
    list_display = ['doctor_id', 'doctor_name', 'specialization']
    search_fields = ['doctor_name', 'specialization']


@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ['appointment_id', 'patient', 'doctor', 'appointment_date', 'appointment_time']
    list_filter = ['appointment_date', 'doctor']
    search_fields = ['patient__patient_name', 'doctor__doctor_name']