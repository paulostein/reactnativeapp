import apiClient from '../http';

export const getAnomalia = async () => {
  const response = await apiClient.get('/anomalia/all');

  return response.data;
};
