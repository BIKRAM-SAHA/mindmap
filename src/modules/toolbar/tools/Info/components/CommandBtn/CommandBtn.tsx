import styles from "./CommandBtn.module.css";

type Props = {
    text: string;
};

function CommandBtn({ text }: Props) {
    return <button className={styles.commandBtn}>{text}</button>;
}

export default CommandBtn;
