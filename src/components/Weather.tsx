import { env } from 'process';
import { useEffect } from 'react';

interface Forecast {
  dt_txt: string;
  main: {
    temp: number;
  };
  weather: {
    description: string;
    // icon: string;
  }[];
  city: {
    name: string;
  }
}

export default function Weather() {
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    const city = 'Osaka,jp';
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

    useEffect(() => {
        fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("5日間の天気予報:", data);

            const cityName = data.city.name;

            data.list.forEach((forecast: Forecast) => {
                console.log(`
                    都市名: ${cityName}, 
                    日時: ${forecast.dt_txt},
                    温度: ${forecast.main.temp}°C,
                    天気: ${forecast.weather[0].description},
                    `);
            });
        })
        .catch(error => console.error('Error:', error));
    }, [url]);

    return (
        <>

        </>
    );
}
