import { useState, useMemo } from "react";

export default function App(): JSX.Element {
    const [recalculate, setRecalculate] = useState(false);
    const [count, setCount] = useState(0);

    const expensiveCalculation = useMemo(
        function () {
            console.log("[useMemo]");

            const now = performance.now();
            while (performance.now() - now < 1000) {
                // Artificially long execution time.
            }

            return Math.floor(Math.random() * (100 + 1));
        },
        [recalculate]
    );

    return (
        <section>
            <p>Count: {count}</p>
            <p>Expensive calculation: {expensiveCalculation}</p>

            <button onClick={() => setCount(count + 1)}>Increment</button>
            <button onClick={() => setRecalculate(!recalculate)}>
                Recalculate
            </button>
        </section>
    );
}
