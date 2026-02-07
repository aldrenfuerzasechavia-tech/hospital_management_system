from django import forms
from .models import Patient, Doctor, Appointment


class PatientForm(forms.ModelForm):
    class Meta:
        model = Patient
        fields = ['patient_name', 'age', 'sex', 'address', 'phone_number']
        widgets = {
            'patient_name': forms.TextInput(attrs={'placeholder': 'Enter patient name'}),
            'age': forms.NumberInput(attrs={'placeholder': 'Enter age', 'min': '0', 'max': '150'}),
            'sex': forms.Select(choices=[('', 'Select sex'), ('Male', 'Male'), ('Female', 'Female')]),
            'address': forms.Textarea(attrs={'placeholder': 'Enter address', 'rows': 3}),
            'phone_number': forms.TextInput(attrs={'placeholder': 'Enter phone number'}),
        }


class DoctorForm(forms.ModelForm):
    class Meta:
        model = Doctor
        fields = ['doctor_name', 'specialization']
        widgets = {
            'doctor_name': forms.TextInput(attrs={'placeholder': 'Enter doctor name'}),
            'specialization': forms.TextInput(attrs={'placeholder': 'Enter specialization'}),
        }


class AppointmentForm(forms.ModelForm):
    class Meta:
        model = Appointment
        fields = ['patient', 'doctor', 'appointment_date', 'appointment_time']
        widgets = {
            'appointment_date': forms.DateInput(attrs={'type': 'date'}),
            'appointment_time': forms.TimeInput(attrs={'type': 'time'}),
        }