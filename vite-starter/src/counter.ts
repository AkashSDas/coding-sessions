import styles from "./counter.module.css";
import "./heading.scss";

console.log({ styles });

export function initializeCounter(doc = globalThis.document): void {
    const countElement = doc.getElementById("count");
    const incrementButton = doc.getElementById("increment");
    const decrementButton = doc.getElementById("decrement");

    if (countElement) {
        countElement.classList.add(styles.count);
    }

    let count = 0;
    incrementButton?.addEventListener("click", increment);
    decrementButton?.addEventListener("click", decrement);

    function render(): void {
        if (countElement) {
            countElement.textContent = count.toString();
        }
    }

    function increment(): void {
        count++;
        if (count % 5 === 0) {
            import("./alert").then((module) => {
                module.addAlert(count);
            });
        }

        render();
    }

    function decrement(): void {
        count--;
        render();
    }
}
