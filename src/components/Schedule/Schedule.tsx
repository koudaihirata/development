import { useEffect, useState } from 'react';
import styles from './styles.module.css'

interface ScheduleProps{
    plase:string;
    day:string;
    lowtemperature:string;
    maxtemperature:string;
}


export default function Schedule(props:ScheduleProps) {
    const [ weatherIcon, setWeatherIcon ] = useState<Number>(1);
    const [ weather, setWeather ] = useState<string>("");

    useEffect(() => {
        const weatherChoice = () => {
            if (weatherIcon === 1) {
                setWeather("/img/sunny.svg");
            }
            if (weatherIcon === 2) {
                setWeather("/img/cloudy.svg");
            }
            if (weatherIcon === 3) {
                setWeather("/img/rain.svg");
            }
            if (weatherIcon === 4) {
                setWeather("/img/cloudythansunny.svg");
            }
            if (weatherIcon === 5) {
                setWeather("/img/cloudythenrain.svg");
            }
        }
        weatherChoice();
    }, [weatherIcon]);

    return(
        <> 
        <div className={styles.rect}>
            <div className={styles.rect2}>
                <div className={styles.rainImg}>
                    <img src={weather} alt="雨" />
                </div>
                <div className={styles.temperatureWrap}>
                    <p className={styles.temperature1}>{props.lowtemperature}</p>
                    <p className={styles.temperature2}>{props.maxtemperature}</p>
                </div>
                <div className={styles.container}>
                    <p className={styles.prefecture}>{props.plase}</p>
                    <p className={styles.date}>{props.day}</p>
                </div>
            </div>
        </div>
        </>
    )
}