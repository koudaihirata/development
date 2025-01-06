import { Link, useParams } from "react-router-dom";
import styles from './styles.module.css';
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export default function Bags() {
    const { id } = useParams<{ id: string }>(); // /bag/:id
    const bagId = Number(id);
    
    const bagList = useSelector((state: RootState) => state.icons.bagList);

    // bagId に対応するアイコンだけ抽出
    const iconsInThisBag = bagList.filter((item) => item.bagId === bagId);

    let URL = "";
    if (id === "1") {
        URL = "手持ちバッグ"; 
    } else if(id === "2") {
        URL = "キャリーバッグ";
    }

    return(
        <>
            <div className={styles.bagDetailWrap}>
                <div className={styles.bagDetailTitle}>
                    <Link to={'/'}>
                        <img src="/img/ReturnArrow.svg" alt="戻る" />
                    </Link>
                    <p className={styles.Title}>{URL}</p>
                    <p className={styles.edit}>編集</p>
                </div>
                {iconsInThisBag.length === 0 ? (
                    <div className={styles.nullWrap}>
                        <p className={styles.null}>まだ何も入っていません。</p>
                    </div>
                ) : (
                    iconsInThisBag.map((item) => (
                        <div className={styles.bagMain} key={item.icon.id}>
                            <div className={styles.bagMainTitle}>
                                <div className={styles.IconImg}>
                                    <img src={item.icon.iconImage} alt={item.icon.iconName} />
                                </div>
                                <p>{item.icon.iconName}</p>
                            </div>
                            {item.icon.things.map((thing) => (
                                <div className={styles.bagThing} key={thing.id}>
                                    <div>
                                        <p className={styles.ProductName}>{thing.name}</p>
                                        <p className={styles.Quantity}>{thing.quantity} 個</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))
                )}
            </div>
        </>
    )
}