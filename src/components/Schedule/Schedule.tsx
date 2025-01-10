import { useEffect, useState } from 'react';
import styles from './styles.module.css'
import useForecast from '../../hooks/useWeather';

interface ScheduleProps{
    plase:string;
    day:string;
    weatherNum: Number;
}

export default function Schedule(props:ScheduleProps) {
    const date = useForecast(props.plase);
    const [cityName, setCityName] = useState<string | undefined>('')
    const [maxTemp, setMaxTemp] = useState<number | undefined>()
    const [minTemp, setMinTemp] = useState<number | undefined>()
    const [weather, setWeather] = useState<string>('');
    
    console.log(date.forecast);
    
    useEffect(() => {
        if (!date.forecast) return;

        setCityName(date.forecast?.city.name)
        // リスト内にある全ての最高気温を取ってくる
        // setMaxTemp(date.forecast?.list.map((i) => i.main.temp_max))
        setMaxTemp(date.forecast?.list[0].main.temp_max)
        setMinTemp(date.forecast.list[0].main.temp_min)
        weatherChoice();
    },[date.forecast])

        const weatherChoice = () => {
            // if (date.forecast?.list[3].weather[0].main === 'Clear') {
            //     setWeather("/img/sunny.svg");
            // }
            // if (date.forecast?.list[14].weather[0].main === 'Clouds') {
            //     setWeather("/img/cloudy.svg");
            // }
            // if (date.forecast?.list[0].weather[0].main === 'Rain') {
            //     setWeather("/img/rain.svg");
            // }
            if (date.forecast?.list[3].weather[0].main === 'Snow') {
                setWeather('/img/snow.png')
            }
            if (props.weatherNum === 4) {
                setWeather("/img/cloudythansunny.svg");
            }
            if (props.weatherNum=== 5) {
                setWeather("/img/cloudythenrain.svg");
            }
        }

    return(
        <> 
        <div className={styles.rect}>
            <div className={styles.rect2}>
                <div className={styles.rainImg}>
                    <img src={weather} alt="雨" />
                </div>
                <div className={styles.temperatureWrap}>
                    <p className={styles.temperature1}>{minTemp}°</p>
                    <p className={styles.temperature2}>{maxTemp}°</p>
                </div>
                <div className={styles.container}>
                    <p className={styles.prefecture}>{cityName}</p>
                    <p className={styles.date}>{props.day}</p>
                </div>
            </div>
        </div>
        </>
    )
}