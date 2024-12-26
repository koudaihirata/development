import styles from './styles.module.css';
import { useState, useRef, useEffect } from 'react';

export default function IconBox({
    bagRefs
}: {
    bagRefs: React.RefObject<HTMLImageElement>[]
}) {
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const dragItemRef = useRef<HTMLDivElement | null>(null);
    const [iconCount, setIconCount] = useState(0);

    const handleMouseDown = (event: MouseEvent, element: HTMLDivElement) => {
        setIsDragging(true);
        setPosition({ x: event.clientX, y: event.clientY });
        dragItemRef.current = element;
    };
    
    const addIcon = () => {
        const iconBox = document.getElementById('IconBox');
        if (iconBox) {
            const newIcon = document.createElement('div');
            const iconId = iconBox.children.length;
            newIcon.className = styles.icon;
            newIcon.textContent = `アイコン ${iconId}`;
            newIcon.onmousedown = (event) => handleMouseDown(event as MouseEvent, newIcon);
            iconBox.appendChild(newIcon);
            setIconCount((prev) => prev + 1);
        }
    };
    
    useEffect(() => {
        if (isDragging) {
            const handleMouseMoveWindow = (event: MouseEvent) => {
                if (isDragging && dragItemRef.current) {
                    const dx = event.clientX - position.x;
                    const dy = event.clientY - position.y;
                    dragItemRef.current.style.transform = `translate(${dx}px, ${dy}px)`;
                    dragItemRef.current.style.zIndex = '100';
                }
                bagRefs.forEach((bagRef) => {
                    const bag = bagRef.current;
                    if (!bag || !dragItemRef.current) return;
                    const bagRect = bag.getBoundingClientRect();
                    const iconRect = dragItemRef.current.getBoundingClientRect();
                    const isOverlap =
                        iconRect.left < bagRect.right &&
                        iconRect.right > bagRect.left &&
                        iconRect.top < bagRect.bottom &&
                        iconRect.bottom > bagRect.top;
                    bag.style.transform = isOverlap ? 'scale(1.1)' : 'scale(.8)';
                });
            };
            const handleMouseUpWindow = () => {
                if (isDragging && dragItemRef.current) {
                    let isOverBag = false;
                    bagRefs.forEach((bagRef) => {
                        const bag = bagRef.current;
                        if (!bag || !dragItemRef.current) return;
                        const bagRect = bag.getBoundingClientRect();
                        const iconRect = dragItemRef.current.getBoundingClientRect();
                        const isOverlap =
                            iconRect.left < bagRect.right &&
                            iconRect.right > bagRect.left &&
                            iconRect.top < bagRect.bottom &&
                            iconRect.bottom > bagRect.top;
                        if (isOverlap) isOverBag = true;
                    });
                    if (isOverBag && dragItemRef.current) {
                        dragItemRef.current.remove();
                        setIconCount((prev) => prev - 1);
                    }
                    bagRefs.forEach((bagRef) => {
                        if (bagRef.current) {
                            bagRef.current.style.transform = 'scale(.8)';
                        }
                    });
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
    }, [isDragging, position, bagRefs]);

    return (
        <div className={styles.boxWrap}>
            <p className={styles.prepare}>準備中</p>
            <div className={styles.iconBox} id='IconBox'>
            </div>
            <div className={styles.rect}>
                <p className={styles.rest}>残り {iconCount} 個</p>
                <button className={styles.plus} onClick={addIcon}>
                    <img src={"/img/plus.svg"} alt="プラス" />
                </button>
            </div>
        </div>
    );
}
