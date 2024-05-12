import { useState, useMemo } from "react";

export default function App(): JSX.Element {
    const [count, setCount] = useState(0);

    const increment = useMemo(function () {
        return function increment(): void {
            setCount((prevCount) => prevCount + 1);
        };
    }, []);

    return (
        <section>
            <p>Count: {count}</p>
            <button onClick={increment}>Increment</button>
        </section>
    );
}
