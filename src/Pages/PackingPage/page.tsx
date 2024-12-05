import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './styles.module.css'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import Schedule from '../../components/Schedule/Schedule'


export default function PackingPage() {
    return(
        <div className={styles.bg}>
            <div className={styles.navWrap}>
                <img src="/img/friend.png" alt="フレンドアイコン" />
                <FontAwesomeIcon icon={faGear} className={styles.FontA} />
            </div>
            <div>
                <Schedule plase='大阪' day='12/16' lowtemperature='18°' maxtemperature='23°'/>
            </div>
        </div>
    ) 
}