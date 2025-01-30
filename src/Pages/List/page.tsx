import { useEffect, useState } from "react";
import styles from "./style.module.css";
import { Link, useLocation } from "react-router-dom";

export default function List() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const packing = queryParams.get("packing");
    const [array, setArray] = useState<string>("");

    useEffect(() => {
        if (packing) {
            setArray(packing);
        }
    }, [packing]);
    return (
        <section className={styles.main}>
            <h1>スケジュール一覧</h1>
            <Link to={"/registration"}>
                <div className={styles.new}>
                    <p>+</p>
                </div>
            </Link>
            <Link to={"/"}>
                <div className={styles.scheduleItem}>
                    {array === "" ? (
                        <img src="/img/p.png" alt="" />
                    ) : (
                        <img src="/img/p2.png" alt="" />
                    )}
                </div>
            </Link>
        </section>
    );
}
