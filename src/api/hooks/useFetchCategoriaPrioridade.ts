import { useState, useEffect } from 'react';
import { getCategoriaPrioridade } from '../services/getCategoriaPrioridade';

const useFetchCategory = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getCategoriaPrioridade();
        setData(result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return data;
};

export default useFetchCategory;
