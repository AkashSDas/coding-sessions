import { useState, useCallback } from "react";

function useCounter(): { count: number; increment: () => void } {
    const [count, setCount] = useState(0);

    const increment = useCallback(function increment(): void {
        setCount((prevCount) => prevCount + 1);
    }, []);

    return { count, increment };
}

export default function App(): JSX.Element {
    const { count, increment } = useCounter();

    return (
        <section>
            <p>Count: {count}</p>
            <button onClick={increment}>Increment</button>
        </section>
    );
}
