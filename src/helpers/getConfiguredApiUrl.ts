import { API_URL } from '../constants';

export const configureApiUrl = (lat: string, lon: string) => {
  return `${API_URL}?appid=${process.env.API_KEY}&lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts`;
};
