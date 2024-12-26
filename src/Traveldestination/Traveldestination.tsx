import styles from './styles.module.css'

export default function Traveldestination(){
    return(
        <>
        <div className={styles.travelWrap}>
            <h1 className={styles.title}>旅行先</h1>

            <div className={styles.departureWrap}>
                <p className={styles.departure}>出発</p>
                <p className={styles.prefectures}>都道府県</p>
            </div>

            <div className={styles.arrivalWrap}>
                <p className={styles.arrival}>到着</p>
                <p className={styles.spot}>都市・観光地</p>
            </div>

            <div className={styles.traveldayWrap}>
                <p className={styles.travelday}>旅行日</p>
                <p className={styles.arrow}>出発日→帰着日</p>
            </div>

            <div className={styles.peopleWrap}>
                <p className={styles.people}>人数</p>
                <p className={styles.peoplecolumn}>人数</p>
            </div>

            <div className={styles.memoWrap}>
                <p className={styles.memo}>メモ</p>
                <p className={styles.memocolumn}>メモ</p>
            </div>

            <p className={styles.decision}>決定</p>
        </div>
        </>
    )
}