import { useState } from 'react';
import { createSurvey } from '../services/createSurvey';
import { surveyToUpdate } from '../../types';

const useCreateSurvey = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const createData = async (data: surveyToUpdate) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await createSurvey(data);
      return 'Vistoria criada'
    } catch (err: any) {
      setError(err.message || 'Erro ao atualizar o levantamento.');
      return err.message;
    } finally {
      setLoading(false);
    }
  };

  return { createData, loading, error, success };
};

export default useCreateSurvey;
