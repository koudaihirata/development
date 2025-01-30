import styles from "./styles.module.css";

interface BtnProps {
    label: string;
    onClick?: () => void;
}

export default function Btn(props: BtnProps) {
    return (
        <>
            <button
                className={styles.button}
                onClick={() => {
                    if (props.onClick) {
                        props.onClick();
                    }
                }}
            >
                {props.label}
            </button>
        </>
    );
}
