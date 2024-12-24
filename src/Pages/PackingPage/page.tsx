import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './styles.module.css'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import Schedule from '../../components/Schedule/Schedule'
import IconBox from '../../Iconbox/iconbox'
import Btn from '../../components/Btn/Btn'
import { useState } from 'react';

export default function PackingPage() {
    const [icons, setIcons] = useState<number[]>([]);

    const removeIcon = (id: number) => {
        setIcons(icons.filter((iconId) => iconId !== id));
    };

    const handleDrop = (event: React.DragEvent<HTMLImageElement>) => {
        event.preventDefault();
        const id = parseInt(event.dataTransfer.getData('text/plain'));
        removeIcon(id);
    };

    const handleDragOver = (event: React.DragEvent<HTMLImageElement>) => {
        event.preventDefault();
    };

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
                    <IconBox icons={icons} setIcons={setIcons} />
                    <div className={styles.bagsBox}>
                        <img
                            src="/img/bag1.svg"
                            alt="カバン"
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                        />
                        <img
                            src="/img/bag2.svg"
                            alt="カバン"
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
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