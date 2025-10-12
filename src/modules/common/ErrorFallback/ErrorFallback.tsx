import { FallbackProps } from "react-error-boundary";
import styles from "./ErrorFallback.module.css";

function ErrorFallback({ error }: FallbackProps) {
	return (
		<div className={styles.errorContainer}>
			{error.message ?? "Something went wrong"}
		</div>
	);
}

export default ErrorFallback;
