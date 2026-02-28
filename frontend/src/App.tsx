import { useState } from 'react';
import PatientList from './PatientList';
import DoctorList from './DoctorList';
import AppointmentList from './AppointmentList';

function App() {
  const [activeTab, setActiveTab] = useState('patients');

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-400 to-purple-600 py-12">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
        <header className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-800">CDO Medical Center</h1>
          <p className="text-sm text-gray-500 mt-2">Patient Appointment Management</p>
          <div className="mt-4 bg-gray-100 text-gray-600 inline-block px-6 py-2 rounded-md">
            Aldren Fuerzas Echavia | BSIT - IT3R9 | ERD #4
          </div>
        </header>

        <div className="mt-6 border-t border-gray-200"></div>

        <nav className="mt-6 bg-gray-100 rounded-md p-4">
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setActiveTab('patients')}
              className={`px-4 py-2 rounded-lg font-semibold shadow-sm ${
                activeTab === 'patients' ? 'bg-indigo-500 text-white' : 'bg-white text-gray-700'
              }`}
            >
              👥 Patients
            </button>
            <button
              onClick={() => setActiveTab('doctors')}
              className={`px-4 py-2 rounded-lg font-semibold shadow-sm ${
                activeTab === 'doctors' ? 'bg-indigo-500 text-white' : 'bg-white text-gray-700'
              }`}
            >
              👨‍⚕️ Doctors
            </button>
            <button
              onClick={() => setActiveTab('appointments')}
              className={`px-4 py-2 rounded-lg font-semibold shadow-sm ${
                activeTab === 'appointments' ? 'bg-indigo-500 text-white' : 'bg-white text-gray-700'
              }`}
            >
              📅 Appointments
            </button>
            <button className="px-4 py-2 rounded-lg font-semibold bg-white text-gray-700 shadow-sm">⚙️ Admin Panel</button>
            <button className="px-4 py-2 rounded-lg font-semibold bg-white text-gray-700 shadow-sm">🧭 API Root</button>
          </div>
        </nav>

        <main className="mt-8">
          {activeTab === 'patients' && <PatientList />}
          {activeTab === 'doctors' && <DoctorList />}
          {activeTab === 'appointments' && <AppointmentList />}
        </main>
      </div>
    </div>
  );
}

export default App;