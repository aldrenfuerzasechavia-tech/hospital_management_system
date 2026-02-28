import { useState, useEffect } from 'react';
import { createDoctor, updateDoctor } from './api';

interface DoctorFormProps {
  onSuccess: () => void;
  editingDoctor?: any;
}

export default function DoctorForm({ onSuccess, editingDoctor }: DoctorFormProps) {
  const [formData, setFormData] = useState({
    doctor_name: editingDoctor?.doctor_name || '',
    specialization: editingDoctor?.specialization || '',
    phone_number: editingDoctor?.phone_number || '',
  });

  useEffect(() => {
    setFormData({
      doctor_name: editingDoctor?.doctor_name || '',
      specialization: editingDoctor?.specialization || '',
      phone_number: editingDoctor?.phone_number || '',
    });
  }, [editingDoctor]);

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingDoctor) {
        await updateDoctor(editingDoctor.doctor_id, formData);
      } else {
        await createDoctor(formData);
      }
      setFormData({
        doctor_name: '',
        specialization: '',
        phone_number: '',
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
      <h3 className="text-xl font-bold mb-4">{editingDoctor ? 'Edit Doctor' : 'Add New Doctor'}</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-semibold mb-2">Doctor Name</label>
          <input
            type="text"
            name="doctor_name"
            value={formData.doctor_name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 px-3 py-2 rounded"
            placeholder="Enter doctor name"
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Specialization</label>
          <input
            type="text"
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 px-3 py-2 rounded"
            placeholder="e.g., Cardiologist"
          />
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


      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-4 bg-indigo-500 text-white px-6 py-2 rounded hover:bg-indigo-600 disabled:bg-gray-400"
      >
        {loading ? 'Saving...' : editingDoctor ? 'Update Doctor' : 'Add Doctor'}
      </button>
    </form>
  );
}
