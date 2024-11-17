import { useState, useEffect } from 'react';
import { getTipoAnomalia } from '../services/getTipoAnomalia';

const useFetchType = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getTipoAnomalia();
        setData(result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return data;
};

export default useFetchType;
