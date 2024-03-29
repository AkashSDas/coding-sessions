import { useState } from "react";

// Basic usage of useState
export default function App(): JSX.Element {
    const [count, setCount] = useState(0);

    function increment() {
        setCount(count + 1);
    }

    return (
        <section>
            <p>Count: {count}</p>
            <button onClick={increment}>Increment</button>
        </section>
    );
}
