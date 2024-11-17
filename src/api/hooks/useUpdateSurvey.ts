import { useState } from 'react';
import { updateSurvey } from '../services/updateSurvey';
import { surveyToUpdate } from '../../types';

const useUpdateSurvey = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const updateData = async (id: number, data: surveyToUpdate) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await updateSurvey(id, data);
      setSuccess(true);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Erro ao atualizar o levantamento.');
    } finally {
      setLoading(false);
    }
  };

  return { updateData, loading, error, success };
};

export default useUpdateSurvey;
