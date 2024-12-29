import Btn from '../Btn/Btn';
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
    const [iconName, setIconName] = useState('');
    const [iconImage, setIconImage] = useState<string>('/img/bagkun.png');

    // モーダルウィンドウを表示非表示
    const openModal = () => {
        setModalToggle(true);
    };
    const closeModal = () => {
        setModalToggle(false);
    };

    // アイコンの画像を変更する時に発火する関数
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setIconImage(imageUrl);
        }
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
    
    // アイコンを増やす関数
    const addIcon = () => {
        const iconBox = document.getElementById('IconBox');
        if (iconBox) {
            // 新しい div 要素を作成
            const newIcon = document.createElement('div');
            newIcon.className = styles.icon;
            // アイコン名が空の場合のエラーチェック
            if (iconName !== '') {
                // img 要素を作成
                const img = document.createElement('img');
                img.src = iconImage; // iconImage ステートに保存されている URL を設定
                img.alt = iconName;
                img.style.width = '100%';
                img.style.height = '80%';
                img.style.objectFit = 'contain';
                img.draggable = false;
                // img 要素を newIcon に追加
                newIcon.appendChild(img);

                // アイコン名を div にテキストとして追加
                const text = document.createElement('p');
                text.textContent = iconName;
                newIcon.appendChild(text);

                // mousedown イベントを設定
                newIcon.onmousedown = (event) => handleMouseDown(event as MouseEvent, newIcon);

                // iconBox に newIcon を追加
                iconBox.appendChild(newIcon);

                // アイコン数を更新
                setIconCount((prev) => prev + 1);

                // モーダルを閉じる
                setModalToggle(false);

                // 入力欄をリセット
                setIconName('');
                 // デフォルト画像に戻す
                setIconImage('/img/bagkun.png');
            } else {
                alert('アイコン名を入力してください');
                return;
            }
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
                                    <img src={iconImage} alt="アイコンイメージ" />
                                    <label htmlFor="IconImg" className={styles.modalImgBtn}>
                                        <img src={"/img/plus.svg"} alt="プラス" />
                                        <input
                                            type="file"
                                            id='IconImg'
                                            accept="image/*"
                                            onChange={handleImageChange}
                                        />
                                    </label>
                                </div>
                                <div className={styles.modalGenreText}>
                                    <p>ジャンル名</p>
                                    <input type="text" placeholder='入力してください' value={iconName} onChange={(e) => setIconName(e.target.value)} />
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
                        <div className={styles.IconBtnWrap}>
                            <div onClick={addIcon}>
                                <Btn label='登録' />
                            </div>
                        </div>
                        <div className={styles.line}></div>
                        <div className={styles.IconBtnWrap}>
                            <div onClick={addIcon}>
                                <Btn label='テンプレートを追加' />
                            </div>
                        </div>
                    </section>
                </div>
            )}
        </>
    );
}
