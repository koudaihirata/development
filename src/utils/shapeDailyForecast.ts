export function shapeDailyForecast(forecastObj: any) {
    if (!forecastObj || !forecastObj.list) return [];

    // 3時間おきデータ(list)を日付ごとに集計するためのMap(連想配列)
    const dailyMap: Record<
    string,
    { originalDate: string; date: string; minTemp: number; maxTemp: number; weather: string }
    > = {};

    forecastObj.list.forEach((item: any) => {
    // 例: "2025-01-10 12:00:00" → ["2025-01-10", "12:00:00"] → "2025-01-10"
    const dateStr = item.dt_txt.split(' ')[0]; // YYYY-MM-DD

    // ソート用に元の日付を保持しつつ、表示用は「M月D日」に変換
    const japaneseDate = convertToJapaneseDate(dateStr);
    
    // dailyMapにその日がまだなければ初期化
    if (!dailyMap[dateStr]) {
        dailyMap[dateStr] = {
        originalDate: dateStr,
        date: japaneseDate,
        minTemp: item.main.temp_min,
        maxTemp: item.main.temp_max,
        weather: item.weather[0]?.main || '',
        };
    } else {
        // 既にある場合は、最高/最低気温を更新
        if (item.main.temp_min < dailyMap[dateStr].minTemp) {
        dailyMap[dateStr].minTemp = item.main.temp_min;
        }
        if (item.main.temp_max > dailyMap[dateStr].maxTemp) {
        dailyMap[dateStr].maxTemp = item.main.temp_max;
        }
        // 12:00があれば優先して天気を上書きするロジック 
        if (item.dt_txt.includes('12:00:00')) {
            dailyMap[dateStr].weather = item.weather[0]?.main || '';
        }
    }
    });

    // dailyMap を配列に変換して、originalDate(YYYY-MM-DD)が古い順にソートし、先頭5日分だけ取り出す
    const dailyArray = Object.values(dailyMap).sort((a, b) => {
    if (a.originalDate < b.originalDate) return -1;
    if (a.originalDate > b.originalDate) return 1;
    return 0;
    });

    return dailyArray.slice(0, 5);
}

function convertToJapaneseDate(dateStr: string): string {
    const [year, month, day] = dateStr.split('-');
    const m = parseInt(month, 10); // "01" → 1
    const d = parseInt(day, 10);   // "10" → 10
    return `${m}月${d}日`;
}
