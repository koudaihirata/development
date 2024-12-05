import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './styles.module.css'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import Schedule from '../../components/Schedule/Schedule'
import Iconbox from '../../Iconbox/iconbox'
import Btn from '../../components/Btn/Btn'


export default function PackingPage() {
    return(
        <div className={styles.bg}>
            <div className={styles.elementBox}>
                <div className={styles.navWrap}>
                    <img src="/img/friend.png" alt="フレンドアイコン" />
                    <FontAwesomeIcon icon={faGear} className={styles.FontA} />
                </div>
                <div className={styles.scheduleWrap}>
                    <Schedule plase='札幌市' day='12/31' lowtemperature='-1°' maxtemperature='8°'/>
                    <Schedule plase='長万部' day='1/1' lowtemperature='-10°' maxtemperature='1°'/>
                    <Schedule plase='北海道' day='1/2' lowtemperature='18°' maxtemperature='23°'/>
                </div>
                <div className={styles.PackingWrap}>
                    <Iconbox />
                    <div className={styles.bagsBox}>
                        <img src="/img/bag1.svg" alt="カバン" />
                        <img src="/img/bag2.svg" alt="カバン" />
                    </div>
                </div>
                <div className={styles.BtnWrap}>
                    <Btn label="パッング完了" />
                </div>
            </div>
        </div>
    ) 
}