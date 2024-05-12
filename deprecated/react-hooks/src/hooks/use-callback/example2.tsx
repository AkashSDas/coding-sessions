import { useState, useCallback } from "react";

export default function App(): JSX.Element {
    const [count, setCount] = useState(0);

    const increment = useCallback(function increment(): void {
        setCount((prevCount) => prevCount + 1);
    }, []);

    return (
        <section>
            <p>Count: {count}</p>
            <button onClick={increment}>Increment</button>
        </section>
    );
}
