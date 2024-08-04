import styles from "./style.module.css";

export default function AboutPage() {
    return (
        <main className={styles.main}>
            <h1 className="mb-2">About Page</h1>

            <button className={styles.btn}>Go to Dashboard</button>
        </main>
    );
}
