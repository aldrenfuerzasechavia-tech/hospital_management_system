from rest_framework import serializers
from .models import Patient, Doctor, Appointment


class PatientSerializer(serializers.ModelSerializer):
    """Serializer for Patient model"""
    
    class Meta:
        model = Patient
        fields = ['patient_id', 'patient_name', 'age', 'sex', 'address', 'phone_number']
        read_only_fields = ['patient_id']


class DoctorSerializer(serializers.ModelSerializer):
    """Serializer for Doctor model"""
    
    class Meta:
        model = Doctor
        fields = ['doctor_id', 'doctor_name', 'specialization']
        read_only_fields = ['doctor_id']


class AppointmentSerializer(serializers.ModelSerializer):
    """Serializer for Appointment model with details"""
    patient_details = PatientSerializer(source='patient', read_only=True)
    doctor_details = DoctorSerializer(source='doctor', read_only=True)
    
    class Meta:
        model = Appointment
        fields = [
            'appointment_id', 
            'appointment_date', 
            'appointment_time', 
            'patient', 
            'doctor',
            'patient_details',
            'doctor_details'
        ]
        read_only_fields = ['appointment_id']


class AppointmentCreateSerializer(serializers.ModelSerializer):
    """Simplified serializer for creating appointments"""
    
    class Meta:
        model = Appointment
        fields = ['appointment_id', 'appointment_date', 'appointment_time', 'patient', 'doctor']
        read_only_fields = ['appointment_id']