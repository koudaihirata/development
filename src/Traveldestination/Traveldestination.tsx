import styles from './styles.module.css'

export default function Traveldestination(){
    return(
        <>
        <div className={styles.travelWrap}>
            <h1 className={styles.title}>旅行先</h1>

            <div className={styles.departureWrap}>
                <p className={styles.departure}>出発</p>
                <img src="../img/position.svg" alt="位置" className={styles.prefecturesPhoto} />
                <input type="text" placeholder='都道府県' className={styles.prefectures} />
            </div>

            <div className={styles.arrivalWrap}>
                <p className={styles.arrival}>到着</p>
                <img src="../img/position.svg" alt="位置" className={styles.spotPhoto} />
                <input type="text" placeholder='都市・観光地' className={styles.spot} />
            </div>

            <div className={styles.traveldayWrap}>
                <p className={styles.travelday}>旅行日</p>
                <img src="../img/calendar.svg" alt="カレンダー" className={styles.arrowPhoto} />
                <input type="text" placeholder='出発日→帰着日' className={styles.arrow} />
            </div>

            <div className={styles.peopleWrap}>
                <p className={styles.people}>人数</p>
                <img src="../img/people.svg" alt="人々" className={styles.peoplecolumnPhoto} />
                <input type="number" placeholder='人数' className={styles.peoplecolumn} />
            </div>

            <div className={styles.memoWrap}>
                <p className={styles.memo}>メモ</p>
                <img src="../img/note.svg" alt="ノート" className={styles.memocolumnPhoto} />
                <input type="text" placeholder='メモ' className={styles.memocolumn} />
            </div>

            <p className={styles.decision}>決定</p>
        </div>
        </>
    )
}