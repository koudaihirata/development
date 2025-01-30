import styles from "./styles.module.css";
import Schedule from "../../components/Schedule/Schedule";
import IconBox from "../../components/Iconbox/iconbox";
import Btn from "../../components/Btn/Btn";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState, selectBagCount } from "../../store/store";

export default function PackingPage() {
    const bag1Ref = useRef<HTMLImageElement>(null);
    const bag2Ref = useRef<HTMLImageElement>(null);
    const [message, setMessage] = useState<string>("null");

    const bag1Count = useSelector((state: RootState) =>
        selectBagCount(state, 1)
    );
    const bag2Count = useSelector((state: RootState) =>
        selectBagCount(state, 2)
    );

    const bag1ForImg = Math.min(bag1Count, 6);
    const bag2ForImg = Math.min(bag2Count, 10);

    useEffect(() => {
        if (bag1ForImg === 6 && bag2ForImg === 10) {
            setMessage("bagsFull");
        } else if (bag1ForImg === 6) {
            setMessage("bag1Full");
        } else if (bag2ForImg === 10) {
            setMessage("bag2Full");
        } else {
            setMessage("takeUmbrella");
        }
    }, [bag1ForImg, bag2ForImg]);

    return (
        <div className={styles.bg}>
            <div className={styles.elementBox}>
                <div className={styles.navWrap}>
                    <div>
                        {message === "null" && (
                            <img src="/img/house.png" alt="リスの家" />
                        )}
                        {message !== "null" && (
                            <img src="/img/houseOut.png" alt="リスの家" />
                        )}
                    </div>
                    {message === "takeUmbrella" && (
                        <div className={styles.squirrelMes}>
                            <img
                                src="/img/takeUmbrellaMes.png"
                                alt="メッセージ"
                            />
                        </div>
                    )}
                    {message === "bag1Full" && (
                        <div className={styles.squirrelMes}>
                            <img src="/img/bag1Full.png" alt="メッセージ" />
                        </div>
                    )}
                    {message === "bag2Full" && (
                        <div className={styles.squirrelMes}>
                            <img src="/img/bag2Full.png" alt="メッセージ" />
                        </div>
                    )}
                    {message === "bagsFull" && (
                        <div className={styles.squirrelMes}>
                            <img src="/img/bagsFull.png" alt="メッセージ" />
                        </div>
                    )}
                    <h2>
                        <img src="/img/friend.png" alt="フレンドアイコン" />
                    </h2>
                </div>
                <div className={styles.scheduleWrap}>
                    <Schedule plase="Osaka" />
                </div>
                <div className={styles.PackingWrap}>
                    <IconBox bagRefs={[bag1Ref, bag2Ref]} />
                    <div className={styles.bagsBox}>
                        <Link to={"/bag/1"}>
                            <img
                                ref={bag1Ref}
                                src={`/img/bag1-${bag1ForImg}.svg`}
                                alt="カバン"
                            />
                        </Link>
                        <Link to={"/bag/2"}>
                            <img
                                ref={bag2Ref}
                                src={`/img/bag2-${bag2ForImg}.svg`}
                                alt="カバン"
                            />
                        </Link>
                    </div>
                </div>
                <div className={styles.BtnWrap}>
                    <Btn label="パッキング完了" />
                </div>
            </div>
        </div>
    );
}
