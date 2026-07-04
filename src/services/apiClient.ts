import axios from 'axios';
import { APP_CONFIG } from '@constants/config';

export const apiClient = axios.create({
  baseURL: APP_CONFIG.API_BASE_URL,
  timeout: APP_CONFIG.API_TIMEOUT,
  headers: { 'Content-Type': 'application/json' },
});
