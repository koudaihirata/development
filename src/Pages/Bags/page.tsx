import { Link, useParams } from "react-router-dom";
import styles from './styles.module.css';

interface Props {
    id: string;
}  

export default function Bags() {
    const params = useParams<{id: string}>();
    const id = params.id;

    let URL = "";
    if (id === "1") {
        URL = "手持ちバッグ"; 
    } else if(id === "2") {
        URL = "キャリーバッグ";
    }

    return(
        <>
            <Bag id={URL} />
        </>
    )
}

function Bag(props: Props) {
    return(
        <>
            <div className={styles.bagDetailWrap}>
                <div className={styles.bagDetailTitle}>
                    <Link to={'/'}>
                        <img src="/img/ReturnArrow.svg" alt="戻る" />
                    </Link>
                    <p className={styles.Title}>{props.id}</p>
                    <p className={styles.edit}>編集</p>
                </div>
                <div className={styles.bagMain}>
                    <div className={styles.bagMainTitle}>
                        <div className={styles.IconImg}>
                            <img src="/img/bagkun.png" alt="アイコンイメージ" />
                        </div>
                        <p>お風呂セット</p>
                    </div>
                    <div className={styles.bagThing}>
                        <div>
                            <p className={styles.ProductName}>シャンプー</p>
                            <p className={styles.Quantity}>1 個</p>
                        </div>
                    </div>
                    <div className={styles.bagThing}>
                        <div>
                            <p className={styles.ProductName}>リンス</p>
                            <p className={styles.Quantity}>1 個</p>
                        </div>
                    </div>
                    <div className={styles.bagThing}>
                        <div>
                            <p className={styles.ProductName}>ボディーソープ</p>
                            <p className={styles.Quantity}>1 個</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}