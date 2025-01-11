import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import useForecast from "../../hooks/useWeather";
import { shapeDailyForecast } from "../../utils/shapeDailyForecast";

interface DailyWeather {
    originalDate: string; // "2025-01-10" (ソート用)
    date: string; // "1月10日"  (表示用)
    minTemp: number;
    maxTemp: number;
    weather: string; // "Clear" | "Clouds" | "Rain" | "Snow" など
}

export default function Schedule(props: { plase: string }) {
    // const date = useForecast(props.plase);
    // const [cityName, setCityName] = useState<string | undefined>("");
    // const [fiveDays, setFiveDays] = useState<
    //     { date: string;}[]
    // >([]);
    const [fiveDaysWithIcon, setFiveDaysWithIcon] = useState<
        Array<DailyWeather>
    >([]);
    const { forecast } = useForecast(props.plase);
    const [weatherAddress, setWeatherAddress] = useState<string[]>([]);

    useEffect(() => {
        if (!forecast) return;
        // まず 3時間刻みデータを「日付ごと」に整形
        const shapedArray = shapeDailyForecast(forecast);
        // 各日の "weather"(例: "Clear", "Clouds" など) を取り出す配列
        const withWeather = shapedArray.map((day) => day.weather);
        // 天気の情報を元に画像のリンクを返す関数を使用
        const iconPaths = getWeatherPath(withWeather);

        // Stateに保存(5日分全部のデータが扱える)
        setFiveDaysWithIcon(shapedArray);
        setWeatherAddress(iconPaths);
    }, [forecast]);

    function getWeatherPath(mainWeather: string[]): string[] {
        // map で各要素に応じたパスを返す
        return mainWeather.map((weather) => {
            switch (weather) {
                case "Clear":
                    return "/img/clear.png";
                case "Clouds":
                    return "/img/cloudy.png";
                case "Rain":
                    return "/img/rain.png";
                case "Snow":
                    return "/img/snow.png";
                default:
                    return "/img/other.png";
            }
        });
    }

    return (
        <>
            {fiveDaysWithIcon.map((dayInfo, i) => (
                <div key={dayInfo.date} className={styles.rect}>
                    <div className={styles.rect2}>
                        <div className={styles.rainImg}>
                            <img src={weatherAddress[i]} alt="雨" />
                        </div>
                        <div className={styles.temperatureWrap}>
                            <p className={styles.temperature1}>
                                {dayInfo.minTemp}°
                            </p>
                            <p className={styles.temperature2}>
                                {dayInfo.maxTemp}°
                            </p>
                        </div>
                        <div className={styles.container}>
                            <p className={styles.prefecture}>
                                {forecast?.city.name}
                            </p>
                            <p className={styles.date}>{dayInfo.date}</p>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}
