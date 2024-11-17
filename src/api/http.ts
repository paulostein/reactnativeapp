import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://cors-anywhere.herokuapp.com/https://suporte.zapto.org:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
