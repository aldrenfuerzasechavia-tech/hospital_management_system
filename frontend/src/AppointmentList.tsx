import { useEffect, useState } from 'react';
import { getAppointments, deleteAppointment } from './api';
import AppointmentForm from './AppointmentForm';

export default function AppointmentList() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [editingAppointment, setEditingAppointment] = useState<any>(null);

  const loadAppointments = () => {
    getAppointments()
      .then(res => {
        // Handle both direct array and paginated responses
        const data = Array.isArray(res.data) ? res.data : (res.data?.results || []);
        // always keep items sorted by primary key so updates stay in place
        data.sort((a: any, b: any) => (a.appointment_id ?? 0) - (b.appointment_id ?? 0));
        setAppointments(data);
      })
      .catch(err => console.log('Error:', err));
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure?')) {
      deleteAppointment(id).then(() => {
        setAppointments(appointments.filter(a => a.appointment_id !== id));
      });
    }
  };

  const handleEdit = (appointment: any) => {
    setEditingAppointment(appointment);
  };

  const handleSuccess = () => {
    setEditingAppointment(null);
    loadAppointments();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="text-2xl">📘</span>
          <h2 className="text-3xl font-bold">Appointment Records</h2>
        </div>

        <div>
          <button
            onClick={() => setEditingAppointment(null)}
            className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
          >
            ➕ Add New Appointment
          </button>
        </div>
      </div>

      <AppointmentForm onSuccess={handleSuccess} editingAppointment={editingAppointment} />

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3">
          <div className="grid grid-cols-7 gap-4 text-sm font-semibold">
            <div>ID</div>
            <div>Patient Name</div>
            <div>Doctor Name</div>
            <div>Specialization</div>
            <div>Date</div>
            <div>Time</div>
            <div>Actions</div>
          </div>
        </div>

        <div className="p-4">
          <table className="w-full table-auto">
            <tbody>
              {appointments.length === 0 ? (
                <tr><td colSpan={7} className="text-center p-8 text-gray-500">No appointments found.</td></tr>
              ) : (
                appointments.map(a => (
                  <tr key={a.appointment_id} className="border-b last:border-b-0">
                    <td className="py-3 px-2 text-sm">{a.appointment_id}</td>
                    <td className="py-3 px-2 text-sm font-semibold">{a.patient_name}</td>
                    <td className="py-3 px-2 text-sm">{a.doctor_name}</td>
                    <td className="py-3 px-2 text-sm">{a.specialization || '—'}</td>
                    <td className="py-3 px-2 text-sm">{a.appointment_date}</td>
                    <td className="py-3 px-2 text-sm">{a.appointment_time}</td>
                    <td className="py-3 px-2 text-sm space-x-2">
                      <button
                        onClick={() => handleEdit(a)}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      >Update</button>
                      <button
                        onClick={() => handleDelete(a.appointment_id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
