export interface WeatherForecast {
    cod: string;
    message: number;
    cnt: number;
    list: Array<ForecastItem>;
    city: {
    id: number;
    name: string;
    coord: {
        lat: number;
        lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
    };
}

export interface ForecastItem {
    dt: number; // タイムスタンプ
    main: {
    temp: number;      // 気温
    feels_like: number; // 体感温度
    temp_min: number;  // 最低気温
    temp_max: number;  // 最高気温
    pressure: number;  // 気圧
    humidity: number;  // 湿度
    };
    weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
    }>;
    clouds: {
    all: number; // 雲量
    };
    wind: {
    speed: number; // 風速
    deg: number;   // 風向
    };
    dt_txt: string; // 日時 (文字列形式)
}
