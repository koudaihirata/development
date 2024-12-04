import styles from './styles.module.css'
import plus from '../img/plus.svg'

export default function Iconbox(){
    return(
        <>
        <div className={styles.boxWrap}>
            <p className={styles.prepare}>準備中</p>
            <div className={styles.rect}>
                <p className={styles.rest}>残り　個</p>
                <img src={plus} alt="プラス" />
            </div>
        </div>
        </>
    )
}