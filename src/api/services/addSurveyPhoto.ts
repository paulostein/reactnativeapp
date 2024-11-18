import apiClient from '../http';

export const addSurveyPhoto = async (id: number, photoUri: string) => {
  const formData = new FormData();

  const photo: any = {
    uri: photoUri,
    type: 'image/jpeg',
    name: `${id}_C_${new Date().getTime()}.jpg`,
  };

  formData.append('file', photo);

  try {
    const response = await apiClient.post(`/vistoria/upload?id=${id}`, formData, {
      headers: {
        'Accept': '*/*',
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error("Erro ao enviar foto:", error);
    throw error;
  }
};
