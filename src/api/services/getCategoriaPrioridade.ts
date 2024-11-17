import apiClient from '../http';

export const getCategoriaPrioridade = async () => {
  const response = await apiClient.get('/categoriaprioridade/all');

  return response.data;
};
