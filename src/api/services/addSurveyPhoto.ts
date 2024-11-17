import apiClient from '../http';

export const addSurveyPhoto = async (id: number, photoUri: string) => {
  const formData = new FormData();

  const blob = await convertToBlob(photoUri);

  const file = new Blob([blob], { type: 'image/jpeg' });

  formData.append('file', file, `${id}_C_${new Date().getTime()}.jpg`);

  const response = await apiClient.post(`/vistoria/upload?id=${id}`, formData, {
    headers: {
      'Accept': '*/*',
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

const convertToBlob = async (uri: string) => {
  const response = await fetch(uri);
  const blob = await response.blob();
  return blob;
};