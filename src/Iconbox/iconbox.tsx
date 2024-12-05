import { useState } from 'react';
import styles from './styles.module.css'

export default function Iconbox(){
    const [icons, setIcons] = useState<number[]>([]);

    const addIcon = () => {
        setIcons([...icons, icons.length]);
    };

    return(
        <>
        <div className={styles.boxWrap}>
            <p className={styles.prepare}>準備中</p>
            <div className={styles.iconBox}>
                {icons.map((icons) => (
                    <div key={icons} className={styles.icon}></div>
                ))}            
            </div>
            <div className={styles.rect}>
                <p className={styles.rest}>残り　個</p>
                <button onClick={addIcon}>
                    <img className={styles.plus} src={"/img/plus.svg"} alt="プラス" />
                </button>
            </div>
        </div>
        </>
    )
}