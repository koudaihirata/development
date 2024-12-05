import styles from './styles.module.css'
import rain from '../../img/rain.svg'

interface ScheduleProps{
    plase:string;
    day:string;
    lowtemperature:string;
    maxtemperature:string;
}


export default function Schedule(props:ScheduleProps) {
    return(
        <> 
        <div className={styles.rect}>
            <div className={styles.rect2}>
                <div className={styles.rainImg}>
                    <img src={rain} alt="雨" />
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