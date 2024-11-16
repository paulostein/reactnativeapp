import apiClient from '../http';

export const getSurveys = async () => {
  const response = await apiClient.get('/vistoria/all');

  return response.data;
};
