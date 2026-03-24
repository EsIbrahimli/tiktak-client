import styles from "./Loading.module.css";

interface LoadingProps {
	fullScreen?: boolean;
}

export default function Loading({
	fullScreen = false,
}: LoadingProps) {
	return (
		<div className={`${styles.wrapper} ${fullScreen ? styles.fullScreen : ""}`}>
			<div className={styles.loader} aria-hidden="true" />
		</div>
	);
}
