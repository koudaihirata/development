import styles from './styles.module.css';

interface BtnProps {
    label: string;
}

export default function Btn(props: BtnProps) {
    return(
        <>
            <button className={styles.button}>{props.label}</button>
        </>
    )
}