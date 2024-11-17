import { useState, useEffect } from 'react';
import { getAnomalia } from '../services/getAnomalia';

const useFetchAnomaly = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAnomalia();
        setData(result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return data;
};

export default useFetchAnomaly;
