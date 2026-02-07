from django.db import models


class Patient(models.Model):
    """Patient model - stores patient information"""
    patient_id = models.AutoField(primary_key=True)
    patient_name = models.CharField(max_length=200)
    age = models.IntegerField()
    sex = models.CharField(max_length=10)
    address = models.CharField(max_length=300)
    phone_number = models.CharField(max_length=20)

    def __str__(self):
        return f"{self.patient_name} (ID: {self.patient_id})"

    class Meta:
        db_table = 'patient'


class Doctor(models.Model):
    """Doctor model - stores doctor information"""
    doctor_id = models.AutoField(primary_key=True)
    doctor_name = models.CharField(max_length=200)
    specialization = models.CharField(max_length=200)

    def __str__(self):
        return f"Dr. {self.doctor_name} - {self.specialization}"

    class Meta:
        db_table = 'doctor'


class Appointment(models.Model):
    """Appointment model - stores appointment bookings"""
    appointment_id = models.AutoField(primary_key=True)
    appointment_date = models.DateField()
    appointment_time = models.TimeField()
    patient = models.ForeignKey(
        Patient, 
        on_delete=models.CASCADE,
        db_column='patient_id'
    )
    doctor = models.ForeignKey(
        Doctor, 
        on_delete=models.CASCADE,
        db_column='doctor_id'
    )

    def __str__(self):
        return f"Appointment {self.appointment_id}: {self.patient.patient_name} with Dr. {self.doctor.doctor_name}"

    class Meta:
        db_table = 'appointment'