import apiClient from '../http';

export const getUsers = async () => {
  const response = await apiClient.get('/cliente/all');

  return response.data;
};
