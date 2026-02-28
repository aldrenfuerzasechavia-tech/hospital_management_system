import { useState, useEffect } from 'react';
import { createPatient, updatePatient } from './api';

interface PatientFormProps {
  onSuccess: () => void;
  editingPatient?: any;
}

export default function PatientForm({ onSuccess, editingPatient }: PatientFormProps) {
  const [formData, setFormData] = useState({
    patient_name: editingPatient?.patient_name || '',
    age: editingPatient?.age || '',
    sex: editingPatient?.sex || 'M',
    phone_number: editingPatient?.phone_number || '',
    address: editingPatient?.address || '',
  });

  useEffect(() => {
    setFormData({
      patient_name: editingPatient?.patient_name || '',
      age: editingPatient?.age || '',
      sex: editingPatient?.sex || 'M',
      phone_number: editingPatient?.phone_number || '',
      address: editingPatient?.address || '',
    });
  }, [editingPatient]);

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingPatient) {
        await updatePatient(editingPatient.patient_id, formData);
      } else {
        await createPatient(formData);
      }
      setFormData({
        patient_name: '',
        age: '',
        sex: 'M',
        phone_number: '',
        address: '',
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
      <h3 className="text-xl font-bold mb-4">{editingPatient ? 'Edit Patient' : 'Add New Patient'}</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-semibold mb-2">Patient Name</label>
          <input
            type="text"
            name="patient_name"
            value={formData.patient_name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 px-3 py-2 rounded"
            placeholder="Enter patient name"
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 px-3 py-2 rounded"
            placeholder="Enter age"
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Sex</label>
          <select
            name="sex"
            value={formData.sex}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded"
          >
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-2">Phone Number</label>
          <input
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 px-3 py-2 rounded"
            placeholder="Enter phone number"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block font-semibold mb-2">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded"
            placeholder="Enter address"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? 'Saving...' : editingPatient ? 'Update Patient' : 'Add Patient'}
      </button>
    </form>
  );
}
