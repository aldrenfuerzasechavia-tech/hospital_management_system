import { useEffect, useState } from 'react';
import { getDoctors, deleteDoctor } from './api';
import DoctorForm from './DoctorForm';

export default function DoctorList() {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [editingDoctor, setEditingDoctor] = useState<any>(null);

  const loadDoctors = () => {
    getDoctors()
      .then(res => {
        // Handle both direct array and paginated responses
        const data = Array.isArray(res.data) ? res.data : (res.data?.results || []);
        data.sort((a: any, b: any) => (a.doctor_id ?? 0) - (b.doctor_id ?? 0));
        setDoctors(data);
      })
      .catch(err => console.log('Error:', err));
  };

  useEffect(() => {
    loadDoctors();
  }, []);

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure?')) {
      deleteDoctor(id).then(() => {
        setDoctors(doctors.filter(d => d.doctor_id !== id));
      });
    }
  };

  const handleEdit = (doctor: any) => {
    setEditingDoctor(doctor);
  };

  const handleSuccess = () => {
    setEditingDoctor(null);
    loadDoctors();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🩺</span>
          <h2 className="text-3xl font-bold">Doctor Records</h2>
        </div>

        <div>
          <button
            onClick={() => setEditingDoctor(null)}
            className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
          >
            ➕ Add New Doctor
          </button>
        </div>
      </div>

      <DoctorForm onSuccess={handleSuccess} editingDoctor={editingDoctor} />

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="bg-gradient-to-r from-green-600 to-emerald-500 text-white px-6 py-3">
          <div className="grid grid-cols-5 gap-4 text-sm font-semibold">
            <div>ID</div>
            <div>Name</div>
            <div>Specialization</div>
            <div>Phone</div>
            <div>Actions</div>
          </div>
        </div>

        <div className="p-4">
          <table className="w-full table-auto">
            <tbody>
              {doctors.length === 0 ? (
                <tr><td colSpan={5} className="text-center p-8 text-gray-500">No doctors found.</td></tr>
              ) : (
                doctors.map(d => (
                  <tr key={d.doctor_id} className="border-b last:border-b-0">
                    <td className="py-3 px-2 text-sm">{d.doctor_id}</td>
                    <td className="py-3 px-2 text-sm font-semibold">{d.doctor_name}</td>
                    <td className="py-3 px-2 text-sm">{d.specialization}</td>
                    <td className="py-3 px-2 text-sm">{d.phone_number}</td>
                    <td className="py-3 px-2 text-sm space-x-2">
                      <button
                        onClick={() => handleEdit(d)}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      >Update</button>
                      <button
                        onClick={() => handleDelete(d.doctor_id)}
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
