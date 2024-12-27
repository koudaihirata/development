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
    const [modalToggle, setModalToggle] = useState<boolean>(false);
    const [things, setThings] = useState<{id: number; name: string; quantity: number}[]>([]);

    // モーダルウィンドウを表示非表示
    const openModal = () => {
        setModalToggle(true);
    };
    const closeModal = () => {
        setModalToggle(false);
    };

    // 新しいアイテムを追加する関数
    const addThing = () => {
        setThings((prev) => [
        ...prev,
        { id: Date.now(), name: '', quantity: 1 }
        ]);
    };
    // アイテムの名前を変更するたびに発火する関数
    const handleNameChange = (id: number, newName: string) => {
        setThings((prev) =>
        prev.map((thing) =>
            thing.id === id
            ? { ...thing, name: newName }
            : thing
        )
        );
    };
    // 個数を増減させる関数
    const increaseQuantity = (id: number) => {
        setThings((prev) =>
        prev.map((item) =>
            item.id === id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
        );
    };
    const decreaseQuantity = (id: number) => {
        setThings((prev) =>
        prev.map((item) =>
            item.id === id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        );
    };

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
            setModalToggle(false);
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
        <>
            <div className={styles.boxWrap}>
                <p className={styles.prepare}>準備中</p>
                <div className={styles.iconBox} id='IconBox'></div>
                <div className={styles.rect}>
                    <div className={styles.NullPlus}></div>
                    <p className={styles.rest}>残り {iconCount} 個</p>
                    <button className={styles.plus} onClick={openModal}>
                        <img src={"/img/plus.svg"} alt="プラス" />
                    </button>
                </div>
            </div>
            {modalToggle && (
                <div className={styles.modalOverlay}>
                    <section className={styles.modal}>
                        <p>登録</p>
                        <button className={styles.modalFalse} onClick={closeModal}>
                            <img src={"/img/plus.svg"} alt="キャンセル" />
                        </button>
                        <div className={styles.modalElement}>
                            <div className={styles.modalGenreWrap}>
                                <div className={styles.modalImgWrap}>
                                    <img src="/img/bagkun.png" alt="アイコンイメージ" />
                                    <button className={styles.modalImgBtn}>
                                        <img src={"/img/plus.svg"} alt="プラス" />
                                    </button>
                                </div>
                                <div className={styles.modalGenreText}>
                                    <p>ジャンル名</p>
                                    <input type="text" placeholder='入力してください' />
                                </div>
                            </div>
                            <div className={styles.modalRegistrationWrap}>
                                <div className={styles.modalRegistrationTitle}>
                                    <div className={styles.NullPlus}></div>
                                    <p>持ち物登録</p>
                                    <button className={styles.modalRegistrationBtn} onClick={addThing}>
                                        <img src={"/img/plus.svg"} alt="プラス" />
                                    </button>
                                </div>
                                <div className={styles.modalRegistrationMain}>
                                {things.map((thing) => (
                                    <div key={thing.id} className={styles.modalRegistrationThing}>
                                        <input type="text" value={thing.name} placeholder='持ち物を入力して下さい' onChange={(e) => handleNameChange(thing.id, e.target.value)} />
                                        <div className={styles.QuantityBox}>
                                            <div className={styles.QuantityWrap}>
                                                <button className={styles.plus} onClick={() => increaseQuantity(thing.id)}>
                                                    <img src={"/img/plus.svg"} alt="プラス" />
                                                </button>
                                                <div className={styles.square}>
                                                    <p>{thing.quantity}</p>
                                                </div>
                                                <button className={styles.minus} onClick={() => decreaseQuantity(thing.id)}>
                                                    <img src={"/img/minus.svg"} alt="マイナス" />
                                                </button>
                                            </div>
                                            <p>コ</p>
                                        </div>
                                    </div>
                                ))}
                                </div>
                            </div>
                        </div>
                        <button onClick={addIcon}>登録</button>
                        <div className={styles.line}></div>
                        <button>テンプレートを追加</button>
                    </section>
                </div>
            )}
        </>
    );
}
