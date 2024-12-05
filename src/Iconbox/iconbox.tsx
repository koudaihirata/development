import styles from './styles.module.css'

export default function Iconbox(){
    return(
        <>
        <div className={styles.boxWrap}>
            <p className={styles.prepare}>準備中</p>
            <div className={styles.rect}>
                <p className={styles.rest}>残り　個</p>
                <a href="#">
                    <img className={styles.plus} src={"/img/plus.svg"} alt="プラス" />
                </a>
            </div>
        </div>
        </>
    )
}