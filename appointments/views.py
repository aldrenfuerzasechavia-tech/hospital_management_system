from django.shortcuts import render, redirect, get_object_or_404
from django.views.generic import ListView, CreateView, UpdateView, DeleteView
from django.urls import reverse_lazy
from rest_framework import viewsets
from .models import Patient, Doctor, Appointment
from .serializers import (
    PatientSerializer, 
    DoctorSerializer, 
    AppointmentSerializer,
    AppointmentCreateSerializer
)
from .forms import PatientForm, DoctorForm, AppointmentForm


# ========== WEB VIEWS (HTML Pages) ==========

# Patient Web Views
class PatientListView(ListView):
    model = Patient
    template_name = 'appointments/patient_list.html'
    context_object_name = 'patients'
    ordering = ['patient_id']


class PatientCreateView(CreateView):
    model = Patient
    form_class = PatientForm
    template_name = 'appointments/patient_form.html'
    success_url = reverse_lazy('patient_list')


class PatientUpdateView(UpdateView):
    model = Patient
    form_class = PatientForm
    template_name = 'appointments/patient_form.html'
    success_url = reverse_lazy('patient_list')
    pk_url_kwarg = 'pk'


class PatientDeleteView(DeleteView):
    model = Patient
    success_url = reverse_lazy('patient_list')
    
    def post(self, request, *args, **kwargs):
        return self.delete(request, *args, **kwargs)


# Doctor Web Views
class DoctorListView(ListView):
    model = Doctor
    template_name = 'appointments/doctor_list.html'
    context_object_name = 'doctors'
    ordering = ['doctor_id']


class DoctorCreateView(CreateView):
    model = Doctor
    form_class = DoctorForm
    template_name = 'appointments/doctor_form.html'
    success_url = reverse_lazy('doctor_list')


class DoctorUpdateView(UpdateView):
    model = Doctor
    form_class = DoctorForm
    template_name = 'appointments/doctor_form.html'
    success_url = reverse_lazy('doctor_list')
    pk_url_kwarg = 'pk'


class DoctorDeleteView(DeleteView):
    model = Doctor
    success_url = reverse_lazy('doctor_list')
    
    def post(self, request, *args, **kwargs):
        return self.delete(request, *args, **kwargs)


# Appointment Web Views
class AppointmentListView(ListView):
    model = Appointment
    template_name = 'appointments/appointment_list.html'
    context_object_name = 'appointments'
    ordering = ['appointment_date', 'appointment_time']


class AppointmentCreateView(CreateView):
    model = Appointment
    form_class = AppointmentForm
    template_name = 'appointments/appointment_form.html'
    success_url = reverse_lazy('appointment_list')


class AppointmentUpdateView(UpdateView):
    model = Appointment
    form_class = AppointmentForm
    template_name = 'appointments/appointment_form.html'
    success_url = reverse_lazy('appointment_list')
    pk_url_kwarg = 'pk'


class AppointmentDeleteView(DeleteView):
    model = Appointment
    success_url = reverse_lazy('appointment_list')
    
    def post(self, request, *args, **kwargs):
        return self.delete(request, *args, **kwargs)


# ========== API VIEWS (REST Framework) ==========

class PatientViewSet(viewsets.ModelViewSet):
    """API endpoint for Patient CRUD operations"""
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer


class DoctorViewSet(viewsets.ModelViewSet):
    """API endpoint for Doctor CRUD operations"""
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer


class AppointmentViewSet(viewsets.ModelViewSet):
    """API endpoint for Appointment CRUD operations"""
    queryset = Appointment.objects.all()
    
    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return AppointmentCreateSerializer
        return AppointmentSerializer