import axios from 'axios';

const WEATHER_API_BASE_URL = 'https://apihub.kma.go.kr/api/typ01/url';

export const weatherClient = axios.create({
  baseURL: WEATHER_API_BASE_URL,
  timeout: 30000,
});

// Interceptor to handle CSV-like text responses from KMA
weatherClient.interceptors.response.use((response) => {
  if (typeof response.data === 'string') {
    // If it's a string, we might need to parse it later
    return response;
  }
  return response;
});
