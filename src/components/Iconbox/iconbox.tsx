// IconBox.tsx
import React, { useState, useRef, useEffect } from 'react';
import Btn from '../Btn/Btn';
import styles from './styles.module.css';
import { addIcon, moveIconToBag } from '../../store/iconsSlice';
import { RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';

type Thing = {
id: number;
name: string;
quantity: number;
};

export default function IconBox({
bagRefs
}: {
bagRefs: React.RefObject<HTMLImageElement>[]
}) {
const dispatch = useDispatch();

// --- Redux Store からアイコン一覧を取得 ---
const iconList = useSelector((state: RootState) => state.icons.iconList);

// --- モーダルなどのローカル状態 ---
const [iconName, setIconName] = useState('');
const [iconImage, setIconImage] = useState<string>('/img/bagkun.png');
const [things, setThings] = useState<Thing[]>([]);
const [modalToggle, setModalToggle] = useState<boolean>(false);

// --- ドラッグ中の状態 ---
const [isDragging, setIsDragging] = useState(false);
const [draggingIconId, setDraggingIconId] = useState<number | null>(null);
const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
const dragItemRef = useRef<HTMLDivElement | null>(null);

//==============================
// 1) モーダル関連
//==============================
const openModal = () => setModalToggle(true);
const closeModal = () => setModalToggle(false);

// 画像を変更する時
const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
    const imageUrl = URL.createObjectURL(file);
    setIconImage(imageUrl);
    }
};

// 持ち物（things）を追加
const addThing = () => {
    setThings((prev) => [...prev, { id: Date.now(), name: '', quantity: 1 }]);
};
// 持ち物の名前を変更
const handleNameChange = (id: number, newName: string) => {
    setThings((prev) =>
    prev.map((thing) =>
        thing.id === id ? { ...thing, name: newName } : thing
    )
    );
};
// 個数 +1
const increaseQuantity = (id: number) => {
    setThings((prev) =>
    prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    )
    );
};
// 個数 -1
const decreaseQuantity = (id: number) => {
    setThings((prev) =>
    prev.map((item) =>
        item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    )
    );
};

//==============================
// 2) アイコンを Redux に追加
//==============================
const addIconHandler = () => {
    if (iconName === '') {
    alert('アイコン名を入力してください');
    return;
    }
    // 新しいアイコンデータ
    const newIconData = {
    id: Date.now(),
    iconName,
    iconImage,
    things,
    };

    // Redux に保存
    dispatch(addIcon(newIconData));

    // モーダル閉じ & 入力リセット
    setModalToggle(false);
    setIconName('');
    setIconImage('/img/bagkun.png');
    setThings([]);
};

//==============================
// 3) ドラッグ開始 (mousedown)
//==============================
const handleMouseDown = (event: MouseEvent, element: HTMLDivElement, iconId: number) => {
    setIsDragging(true);
    setDraggingIconId(iconId);
    setPosition({ x: event.clientX, y: event.clientY });
    dragItemRef.current = element;
};

//==============================
// 4) ドラッグ移動 & マウスアップ処理
//==============================
useEffect(() => {
    if (!isDragging) return;

    const handleMouseMoveWindow = (event: MouseEvent) => {
    if (isDragging && dragItemRef.current) {
        const dx = event.clientX - position.x;
        const dy = event.clientY - position.y;
        dragItemRef.current.style.transform = `translate(${dx}px, ${dy}px)`;
        dragItemRef.current.style.zIndex = '100';
    }

    // バッグとの重なりを見て拡大表示
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
        let bagIndex = -1; // bag/1, bag/2 などに対応させるための番号

        // バッグ上にドロップされたか判定
        bagRefs.forEach((bagRef, index) => {
        const bag = bagRef.current;
        if (!bag || !dragItemRef.current) return;
        const bagRect = bag.getBoundingClientRect();
        const iconRect = dragItemRef.current.getBoundingClientRect();
        const isOverlap =
            iconRect.left < bagRect.right &&
            iconRect.right > bagRect.left &&
            iconRect.top < bagRect.bottom &&
            iconRect.bottom > bagRect.top;

        if (isOverlap) {
            isOverBag = true;
            bagIndex = index + 1; 
        }
        });

        // バッグ上なら Redux 上でも「moveIconToBag」させる
        if (isOverBag && draggingIconId != null) {
        // ポイント
        dispatch(moveIconToBag({ iconId: draggingIconId, bagId: bagIndex }));
        // DOM 要素としても削除
        dragItemRef.current.remove();
        }

        // バッグのスケールを元に戻す
        bagRefs.forEach((bagRef) => {
        if (bagRef.current) {
            bagRef.current.style.transform = 'scale(.8)';
        }
        });

        dragItemRef.current.style.transform = '';
        setIsDragging(false);
        setDraggingIconId(null);
    }
    };

    window.addEventListener('mousemove', handleMouseMoveWindow);
    window.addEventListener('mouseup', handleMouseUpWindow);
    return () => {
    window.removeEventListener('mousemove', handleMouseMoveWindow);
    window.removeEventListener('mouseup', handleMouseUpWindow);
    };
}, [isDragging, position, bagRefs, draggingIconId, dispatch]);

//==============================
// 5) iconList (Redux) → DOM生成
//==============================
useEffect(() => {
    const iconBox = document.getElementById('IconBox');
    if (!iconBox) return;

    // アイコン表示領域を一度クリア
    iconBox.innerHTML = '';

    // Redux にある全アイコンを DOM で表示
    iconList.forEach((icon) => {
    // 新しい div 要素
    const newIcon = document.createElement('div');
    newIcon.className = styles.icon;
    newIcon.style.position = 'relative';

    // アイコン画像
    const img = document.createElement('img');
    img.src = icon.iconImage;
    img.alt = icon.iconName;
    img.style.width = '100%';
    img.style.height = '80%';
    img.style.objectFit = 'contain';
    img.draggable = false;
    newIcon.appendChild(img);

    // アイコン名
    const text = document.createElement('p');
    text.textContent = icon.iconName;
    newIcon.appendChild(text);

    // mousedown イベントを設定し、どの iconId を動かしているかを記録
    newIcon.onmousedown = (event) =>
        handleMouseDown(event as MouseEvent, newIcon, icon.id);

    // iconBox に追加
    iconBox.appendChild(newIcon);
    });
}, [iconList]);

//==============================
// 6) レンダリング
//==============================
    return (
        <>
            <div className={styles.boxWrap}>
                <p className={styles.prepare}>準備中</p>

                {/* アイコンが描画されるボックス（DOM手動追加） */}
                <div className={styles.iconBox} id="IconBox"></div>

                <div className={styles.rect}>
                <div className={styles.NullPlus}></div>
                {/* Redux の iconList.length を表示 */}
                <p className={styles.rest}>残り {iconList.length} 個</p>
                <button className={styles.plus} onClick={openModal}>
                    <img src={"/img/plus.svg"} alt="プラス" />
                </button>
                </div>
            </div>

            {/* モーダル部分 */}
            {modalToggle && (
                <div className={styles.modalOverlay}>
                <section className={styles.modal}>
                    <p>登録</p>
                    <button className={styles.modalFalse} onClick={closeModal}>
                    <img src={"/img/plus.svg"} alt="キャンセル" />
                    </button>

                    {/* ジャンル入力や持ち物登録 */}
                    <div className={styles.modalElement}>
                    <div className={styles.modalGenreWrap}>
                        <div className={styles.modalImgWrap}>
                        <img src={iconImage} alt="アイコンイメージ" />
                        <label htmlFor="IconImg" className={styles.modalImgBtn}>
                            <img src={"/img/plus.svg"} alt="プラス" />
                            <input
                            type="file"
                            id="IconImg"
                            accept="image/*"
                            onChange={handleImageChange}
                            />
                        </label>
                        </div>
                        <div className={styles.modalGenreText}>
                        <p>ジャンル名</p>
                        <input
                            type="text"
                            placeholder="入力してください"
                            value={iconName}
                            onChange={(e) => setIconName(e.target.value)}
                        />
                        </div>
                    </div>

                    <div className={styles.modalRegistrationWrap}>
                        <div className={styles.modalRegistrationTitle}>
                        <div className={styles.NullPlus}></div>
                        <p>持ち物登録</p>
                        <button
                            className={styles.modalRegistrationBtn}
                            onClick={addThing}
                        >
                            <img src={"/img/plus.svg"} alt="プラス" />
                        </button>
                        </div>
                        <div className={styles.modalRegistrationMain}>
                        {things.map((thing) => (
                            <div key={thing.id} className={styles.modalRegistrationThing}>
                            <input
                                type="text"
                                placeholder="持ち物を入力して下さい"
                                value={thing.name}
                                onChange={(e) =>
                                handleNameChange(thing.id, e.target.value)
                                }
                            />
                            <div className={styles.QuantityBox}>
                                <div className={styles.QuantityWrap}>
                                <button
                                    className={styles.plus}
                                    onClick={() => increaseQuantity(thing.id)}
                                >
                                    <img src={"/img/plus.svg"} alt="プラス" />
                                </button>
                                <div className={styles.square}>
                                    <p>{thing.quantity}</p>
                                </div>
                                <button
                                    className={styles.minus}
                                    onClick={() => decreaseQuantity(thing.id)}
                                >
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

                    {/* アイコンを登録するボタン */}
                    <div className={styles.IconBtnWrap}>
                    <div onClick={addIconHandler}>
                        <Btn label="登録" />
                    </div>
                    </div>

                    <div className={styles.line}></div>

                    {/* テンプレートを追加ボタン（実装はお好みで） */}
                    <div className={styles.IconBtnWrap}>
                    <div onClick={addIconHandler}>
                        <Btn label="テンプレートを追加" />
                    </div>
                    </div>
                </section>
                </div>
            )}
        </>
    );
}
