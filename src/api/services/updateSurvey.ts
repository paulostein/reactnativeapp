import { surveyToUpdate } from '../../types';
import apiClient from '../http';

export const updateSurvey = async (id: number, updatedData: surveyToUpdate) => {
  const response = await apiClient.put(`/vistoria/${id}`, updatedData);

  return response.data;
};
