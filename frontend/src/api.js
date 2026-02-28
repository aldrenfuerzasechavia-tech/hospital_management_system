import axios from 'axios';

const API = axios.create({ baseURL: 'http://127.0.0.1:8000/api/' });

// Helper to extract results from paginated response
const extractData = (response) => {
  // If response has 'results' (paginated), return that array
  if (response.data && response.data.results) {
    return { ...response, data: response.data.results };
  }
  // Otherwise return the response as-is
  return response;
};

// Patients
export const getPatients = () => API.get('patients/').then(extractData);
export const createPatient = (data) => API.post('patients/', data);
export const updatePatient = (id, data) => API.put(`patients/${id}/`, data);
export const deletePatient = (id) => API.delete(`patients/${id}/`);

// Doctors
export const getDoctors = () => API.get('doctors/').then(extractData);
export const createDoctor = (data) => API.post('doctors/', data);
export const updateDoctor = (id, data) => API.put(`doctors/${id}/`, data);
export const deleteDoctor = (id) => API.delete(`doctors/${id}/`);

// Appointments
export const getAppointments = () => API.get('appointments/').then(extractData);
export const createAppointment = (data) => API.post('appointments/', data);
export const updateAppointment = (id, data) => API.put(`appointments/${id}/`, data);
export const deleteAppointment = (id) => API.delete(`appointments/${id}/`);