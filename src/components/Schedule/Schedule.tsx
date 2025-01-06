import { useEffect, useState } from 'react';
import styles from './styles.module.css'
import Weather from '../Weathr/Weather';

interface ScheduleProps{
    plase:string;
    day:string;
    lowtemperature:string;
    maxtemperature:string;
    weatherNum: Number;
}


export default function Schedule(props:ScheduleProps) {
    const [ weather, setWeather ] = useState<string>("");

    useEffect(() => {
        const weatherChoice = () => {
            if (props.weatherNum === 1) {
                setWeather("/img/sunny.svg");
            }
            if (props.weatherNum === 2) {
                setWeather("/img/cloudy.svg");
            }
            if (props.weatherNum === 3) {
                setWeather("/img/rain.svg");
            }
            if (props.weatherNum === 4) {
                setWeather("/img/cloudythansunny.svg");
            }
            if (props.weatherNum=== 5) {
                setWeather("/img/cloudythenrain.svg");
            }
        }
        weatherChoice();
    }, []);

    return(
        <> 
        <Weather />
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