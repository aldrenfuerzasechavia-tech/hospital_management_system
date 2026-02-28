import { useState, useEffect } from 'react';
import { createAppointment, updateAppointment, getPatients, getDoctors } from './api';

interface AppointmentFormProps {
  onSuccess: () => void;
  editingAppointment?: any;
}

export default function AppointmentForm({ onSuccess, editingAppointment }: AppointmentFormProps) {
  const [formData, setFormData] = useState({
    patient: editingAppointment?.patient || '',
    doctor: editingAppointment?.doctor || '',
    appointment_date: editingAppointment?.appointment_date || '',
    appointment_time: editingAppointment?.appointment_time || '',
    reason_for_appointment: editingAppointment?.reason_for_appointment || '',
  });

  const [patients, setPatients] = useState<any[]>([]);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getPatients().then(res => {
      const data = Array.isArray(res.data) ? res.data : (res.data?.results || []);
      setPatients(data);
    });
    getDoctors().then(res => {
      const data = Array.isArray(res.data) ? res.data : (res.data?.results || []);
      setDoctors(data);
    });
  }, []);

  useEffect(() => {
    setFormData({
      patient: editingAppointment?.patient || '',
      doctor: editingAppointment?.doctor || '',
      appointment_date: editingAppointment?.appointment_date || '',
      appointment_time: editingAppointment?.appointment_time || '',
      reason_for_appointment: editingAppointment?.reason_for_appointment || '',
    });
  }, [editingAppointment]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingAppointment) {
        await updateAppointment(editingAppointment.appointment_id, formData);
      } else {
        await createAppointment(formData);
      }
      setFormData({
        patient: '',
        doctor: '',
        appointment_date: '',
        appointment_time: '',
        reason_for_appointment: '',
      });
      onSuccess();
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md mb-6">
      <h3 className="text-xl font-bold mb-4">{editingAppointment ? 'Edit Appointment' : 'Schedule New Appointment'}</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-semibold mb-2">Patient</label>
          <select
            name="patient"
            value={formData.patient}
            onChange={handleChange}
            required
            className={`w-full border border-gray-300 px-3 py-2 rounded ${
              formData.patient ? 'text-black' : 'text-gray-500'
            }`}
          >
            <option value="" className="text-gray-500">Select a patient</option>
            {patients.map(p => (
              <option key={p.patient_id} value={p.patient_id} className="text-black">
                {p.patient_name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-2">Doctor</label>
          <select
            name="doctor"
            value={formData.doctor}
            onChange={handleChange}
            required
            className={`w-full border border-gray-300 px-3 py-2 rounded ${
              formData.doctor ? 'text-black' : 'text-gray-500'
            }`}
          >
            <option value="" className="text-gray-500">Select a doctor</option>
            {doctors.map(d => (
              <option key={d.doctor_id} value={d.doctor_id} className="text-black">
                {d.doctor_name} - {d.specialization}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-2">Appointment Date</label>
          <input
            type="date"
            name="appointment_date"
            value={formData.appointment_date}
            onChange={handleChange}
            required
            className={`w-full border border-gray-300 px-3 py-2 rounded ${
              formData.appointment_date ? 'text-black' : 'text-gray-500'
            }`}
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Appointment Time</label>
          <input
            type="time"
            name="appointment_time"
            value={formData.appointment_time}
            onChange={handleChange}
            required
            className={`w-full border border-gray-300 px-3 py-2 rounded ${
              formData.appointment_time ? 'text-black' : 'text-gray-500'
            }`}
          />
        </div>

        <div className="md:col-span-2">
          <label className="block font-semibold mb-2">Reason for Appointment</label>
          <textarea
            name="reason_for_appointment"
            value={formData.reason_for_appointment}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 px-3 py-2 rounded"
            placeholder="Enter reason for appointment"
            rows={3}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-4 bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 disabled:bg-gray-400"
      >
        {loading ? 'Saving...' : editingAppointment ? 'Update Appointment' : 'Schedule Appointment'}
      </button>
    </form>
  );
}
