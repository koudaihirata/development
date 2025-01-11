import axios from 'axios';
import { WeatherForecast } from '../types/weather';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/';

/**
 * 天気予報データを取得する関数（5日間/3時間ごと）
 * @param city - 都市名
 * @returns 天気予報データ
 */
export const getForecastByCity = async (city: string): Promise<WeatherForecast> => {
  try {
    const response = await axios.get<WeatherForecast>(`${BASE_URL}forecast`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric', // 摂氏表示
        lang: 'ja',      // 日本語の応答
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching forecast data:', error);
    throw error;
  }
};
