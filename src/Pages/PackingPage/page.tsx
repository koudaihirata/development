import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './styles.module.css'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import Schedule from '../../components/Schedule/Schedule'
import IconBox from '../../components/Iconbox/iconbox'
import Btn from '../../components/Btn/Btn'
import { useRef } from 'react';

export default function PackingPage() {
    const bag1Ref = useRef<HTMLImageElement>(null);
    const bag2Ref = useRef<HTMLImageElement>(null);

    return(
        <div className={styles.bg}>
            <div className={styles.elementBox}>
                <div className={styles.navWrap}>
                    <img src="/img/friend.png" alt="フレンドアイコン" />
                    <FontAwesomeIcon icon={faGear} className={styles.FontA} />
                </div>
                <div className={styles.scheduleWrap}>
                    <Schedule plase='札幌市' day='12/31' lowtemperature='-1°' maxtemperature='8°' weatherNum={1}/>
                    <Schedule plase='長万部' day='1/1' lowtemperature='-10°' maxtemperature='1°' weatherNum={2}/>
                    <Schedule plase='北海道' day='1/2' lowtemperature='18°' maxtemperature='23°' weatherNum={3}/>
                </div>
                <div className={styles.PackingWrap}>
                    <IconBox bagRefs={[bag1Ref, bag2Ref]} />
                    <div className={styles.bagsBox}>
                        <img 
                            ref={bag1Ref}
                            src="/img/bag1.svg" 
                            alt="カバン" 
                        />
                        <img 
                            ref={bag2Ref}
                            src="/img/bag2.svg" 
                            alt="カバン" 
                        />
                    </div>
                </div>
                <div className={styles.BtnWrap}>
                    <Btn label="パッング完了" />
                </div>
            </div>
        </div>
    ) 
}