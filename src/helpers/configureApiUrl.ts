import { API_URL } from '../constants';

/**
 * Get configured api url
 * @returns string
 */
export const configureApiUrl = (lat: string, lon: string) => {
  return `${API_URL}?appid=${process.env.API_KEY}&lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts`;
};
