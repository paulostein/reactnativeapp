import { surveyToUpdate } from '../../types';
import apiClient from '../http';

export const createSurvey = async (data: surveyToUpdate) => {
  const response = await apiClient.post(`/vistoria`, data);

  return response.data;
};
