import axios from 'axios';
import Constants from 'expo-constants';

const API_URL =
  Constants.expoConfig?.extra?.apiUrl ?? 'https://jsonplaceholder.typicode.com';

export const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});
