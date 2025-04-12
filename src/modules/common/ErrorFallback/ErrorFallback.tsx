import styles from "./ErrorFallback.module.css";

type Props = {};

function ErrorFallback({}: Props) {
    return <div className={styles.errorContainer}>Something went wrong</div>;
}

export default ErrorFallback;
