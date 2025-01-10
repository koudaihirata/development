import { useEffect } from 'react';
import styles from './styles.module.css';
import axios from 'axios';

interface Forecast {
  dt_txt: string;
  main: {
    temp: number;
  };
  weather: {
    description: string;
  }[];
  city: {
    name: string;
  }
}

type Props = {
  city: string
}

export default function Weather(props: Props) {
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    const city = `${props.city},jp`;
    console.log(city);
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&lang=ja&units=metric&appid=${apiKey}`;

      const fetchItems = async () => {
        try {
          const response = await axios.get(url);
          console.log("5日間の天気予報:", response.data);

          const cityName = response.data.city.name;
          
          response.data.list.forEach((forecast: Forecast) => {
            console.log(`
              都市名: ${cityName}, 
              日時: ${forecast.dt_txt},
              温度: ${forecast.main.temp}°C,
              天気: ${forecast.weather[0].description},
            `);
          });
        } catch (err) {
          console.error(err);
        }
      }

      fetchItems()

    return (
        <>
            <p className={styles.aaa}>天気コンポーネント</p>
            <img src="" alt="" />
        </>
    );
}
