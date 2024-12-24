import { useState } from 'react';
import styles from './styles.module.css'

export default function IconBox({ icons, setIcons }: { icons: number[], setIcons: React.Dispatch<React.SetStateAction<number[]>> }){
    const addIcon = () => {
        setIcons([...icons, icons.length]);
    };

    const handleDragStart = (event: React.DragEvent<HTMLDivElement>, id: number) => {
        event.dataTransfer.setData('text/plain', id.toString());
    };

    return(
        <>
        <div className={styles.boxWrap}>
            <p className={styles.prepare}>準備中</p>
            <div className={styles.iconBox}>
                {icons.map((id) => (
                    <div
                        key={id}
                        className={styles.icon}
                        draggable
                        onDragStart={(event) => handleDragStart(event, id)}
                    ></div>
                ))}            
            </div>
            <div className={styles.rect}>
                <p className={styles.rest}>残り　個</p>
                <button className={styles.plus} onClick={addIcon}>
                    <img src={"/img/plus.svg"} alt="プラス" />
                </button>
            </div>
        </div>
        </>
    )
}