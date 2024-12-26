import styles from './styles.module.css';
import { useState, useRef, useEffect } from 'react';

export default function IconBox({ icons, setIcons }: { icons: number[], setIcons: React.Dispatch<React.SetStateAction<number[]>> }) {
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const dragItemRef = useRef<HTMLDivElement | null>(null);

    const addIcon = () => {
        setIcons([...icons, icons.length]);
    };

    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>, id: number) => {
        setIsDragging(true);
        setPosition({ x: event.clientX, y: event.clientY });
        dragItemRef.current = event.currentTarget;
    };


    useEffect(() => {
        if (isDragging) {
            const handleMouseMoveWindow = (event: MouseEvent) => {
                if (isDragging && dragItemRef.current) {
                    const dx = event.clientX - position.x;
                    const dy = event.clientY - position.y;
                    dragItemRef.current.style.transform = `translate(${dx}px, ${dy}px)`;
                }
            };
            const handleMouseUpWindow = () => {
                if (isDragging && dragItemRef.current) {
                    dragItemRef.current.style.transform = '';
                    setIsDragging(false);
                }
            };
            window.addEventListener('mousemove', handleMouseMoveWindow);
            window.addEventListener('mouseup', handleMouseUpWindow);
            return () => {
                window.removeEventListener('mousemove', handleMouseMoveWindow);
                window.removeEventListener('mouseup', handleMouseUpWindow);
            };
        }
    }, [isDragging, position]);

    return (
        <div className={styles.boxWrap}>
            <p className={styles.prepare}>準備中</p>
            <div className={styles.iconBox}>
                {icons.map((id) => (
                    <div
                        key={id}
                        className={styles.icon}
                        onMouseDown={(event) => handleMouseDown(event, id)}
                    >
                        アイコン {id}
                    </div>
                ))}
            </div>
            <div className={styles.rect}>
                <p className={styles.rest}>残り {icons.length} 個</p>
                <button className={styles.plus} onClick={addIcon}>
                    <img src={"/img/plus.svg"} alt="プラス" />
                </button>
            </div>
        </div>
    );
}
