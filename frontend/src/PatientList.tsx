import { useEffect, useState } from 'react';
import { getPatients, deletePatient } from './api';
import PatientForm from './PatientForm';

export default function PatientList() {
  const [patients, setPatients] = useState<any[]>([]);
  const [editingPatient, setEditingPatient] = useState<any>(null);
  const [showForm, setShowForm] = useState<boolean>(false);

  const loadPatients = () => {
    getPatients()
      .then(res => {
        // Handle both direct array and paginated responses
        const data = Array.isArray(res.data) ? res.data : (res.data?.results || []);
        data.sort((a: any, b: any) => (a.patient_id ?? 0) - (b.patient_id ?? 0));
        setPatients(data);
      })
      .catch(err => console.log('Error:', err));
  };

  useEffect(() => {
    loadPatients();
  }, []);

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure?')) {
      deletePatient(id).then(() => {
        setPatients(patients.filter(p => p.patient_id !== id));
      });
    }
  };

  const handleEdit = (patient: any) => {
    setEditingPatient(patient);
    setShowForm(true);
  };

  const handleSuccess = () => {
    setEditingPatient(null);
    setShowForm(false);
    loadPatients();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🧾</span>
          <h2 className="text-3xl font-bold">Patient Records</h2>
        </div>

        <div>
          <button
            onClick={() => { setEditingPatient(null); setShowForm(true); }}
            className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
          >
            ➕ Add New Patient
          </button>
        </div>
      </div>

      {showForm && (
        <PatientForm onSuccess={handleSuccess} editingPatient={editingPatient} />
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3">
          <div className="grid grid-cols-6 gap-4 text-sm font-semibold">
            <div>ID</div>
            <div>Name</div>
            <div>Age</div>
            <div>Sex</div>
            <div>Phone</div>
            <div>Actions</div>
          </div>
        </div>

        <div className="p-4">
          <table className="w-full table-auto">
            <tbody>
              {patients.length === 0 ? (
                <tr><td colSpan={6} className="text-center p-8 text-gray-500">No patients found.</td></tr>
              ) : (
                patients.map(p => (
                  <tr key={p.patient_id} className="border-b last:border-b-0">
                    <td className="py-3 px-2 text-sm">{p.patient_id}</td>
                    <td className="py-3 px-2 text-sm font-semibold">{p.patient_name}</td>
                    <td className="py-3 px-2 text-sm">{p.age}</td>
                    <td className="py-3 px-2 text-sm">{p.sex}</td>
                    <td className="py-3 px-2 text-sm">{p.phone_number}</td>
                    <td className="py-3 px-2 text-sm space-x-2">
                      <button
                        onClick={() => handleEdit(p)}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      >Update</button>
                      <button
                        onClick={() => handleDelete(p.patient_id)}
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