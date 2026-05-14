import api from './api';

export const getEmployees = async () => {
  const response = await api.get('/employees');
  return response.data;
};

export const addEmployee = async (data: any) => {
  const response = await api.post('/employees', data);
  return response.data;
};