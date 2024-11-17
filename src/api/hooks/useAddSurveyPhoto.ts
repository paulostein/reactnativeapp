import { useState } from 'react';
import { addSurveyPhoto } from '../services/addSurveyPhoto';

const useAddSurveyPhoto = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const addPhoto = async (id: number, photoUri: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await addSurveyPhoto(id, photoUri);

      setSuccess(true);
      return response;
    } catch (err: any) {
      setError(err.message || 'Erro ao enviar a foto.');
      return err.message;
    } finally {
      setLoading(false);
    }
  };

  return { addPhoto, loading, error, success };
};

export default useAddSurveyPhoto;
