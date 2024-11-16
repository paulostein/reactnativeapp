import { useState, useEffect } from 'react';
import { getSurveys } from '../services/getSurveys';

const useFetchSurvey = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getSurveys();
        setData(result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { data, loading };
};

export default useFetchSurvey;
