import { Link, useParams } from "react-router-dom";
import styles from "./styles.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useState } from "react";
import Btn from "../../components/Btn/Btn";

type IconItem = {
    bagId: number;
    icon: {
        id: number;
        iconName: string;
        iconImage: string;
        things?: {
            id: number;
            name: string;
            quantity: number;
        }[];
    };
};

export default function Bags() {
    const [dialogFlag, setDialogFlag] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<IconItem | null>(null);
    const { id } = useParams<{ id: string }>(); // /bag/:id
    const bagId = Number(id);

    const bagList = useSelector((state: RootState) => state.icons.bagList);

    // bagId に対応するアイコンだけ抽出
    const iconsInThisBag = bagList.filter((item) => item.bagId === bagId);
    console.log(iconsInThisBag);

    console.log(selectedItem);

    let URL = "";
    if (id === "1") {
        URL = "手持ちバッグ";
    } else if (id === "2") {
        URL = "キャリーバッグ";
    }

    return (
        <>
            <div className={styles.bagDetailWrap}>
                <div className={styles.bagDetailTitle}>
                    <Link to={"/"} className={styles.returnBtn}>
                        <img src="/img/ReturnArrow.svg" alt="戻る" />
                    </Link>
                    <p className={styles.Title}>{URL}</p>
                    {/* <p className={styles.edit}>編集</p> */}
                </div>
                {iconsInThisBag.length === 0 ? (
                    <div className={styles.nullWrap}>
                        <p className={styles.null}>まだ何も入っていません。</p>
                    </div>
                ) : (
                    <div className={styles.bagMain}>
                        {iconsInThisBag.map((item) => (
                            <div
                                className={styles.bagMainTitle}
                                key={item.icon.id}
                                onClick={() => {
                                    setSelectedItem(item);
                                    setDialogFlag(!dialogFlag);
                                }}
                            >
                                <div className={styles.IconImg}>
                                    <img
                                        src={item.icon.iconImage}
                                        alt={item.icon.iconName}
                                    />
                                </div>
                                <p className={styles.GenreName}>
                                    {item.icon.iconName}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {dialogFlag && selectedItem && (
                <div
                    className={styles.overlay}
                    onClick={() => {
                        setDialogFlag(false);
                    }}
                >
                    <div
                        className={styles.dialog}
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                    >
                        <div className={styles.dialogNab}>
                            <p
                                onClick={() => {
                                    setDialogFlag(false);
                                }}
                            >
                                もどる
                            </p>
                            <p
                                onClick={() => {
                                    console.log("編集完了");
                                }}
                            >
                                完了
                            </p>
                        </div>
                        <div className={styles.dialogTitle}>
                            <div className={styles.dialogImg}>
                                <img
                                    src={selectedItem.icon.iconImage}
                                    alt="アイコンイメージ"
                                />
                            </div>
                            <p>{selectedItem.icon.iconName}</p>
                        </div>
                        <div className={styles.dialogMain}>
                            {selectedItem.icon.things?.map((thing) => (
                                <div className={styles.bagThing} key={thing.id}>
                                    <div>
                                        <p className={styles.ProductName}>
                                            {thing.name}
                                        </p>
                                        <p className={styles.Quantity}>
                                            {thing.quantity} 個
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className={styles.dialogBtn}>
                            <Btn label="削除" />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
