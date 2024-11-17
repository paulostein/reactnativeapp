import apiClient from '../http';

export const getTipoAnomalia = async () => {
  const response = await apiClient.get('/tipoanomalia/all');

  return response.data;
};
