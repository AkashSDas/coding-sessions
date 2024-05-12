import { useState } from "react";

export function useCounter() {
    const [count, setCount] = useState(0);

    function increment(): void {
        setCount((prevCount) => prevCount + 1);
    }

    return { count, increment };
}

export default function App(): JSX.Element {
    const { count: count1, increment: increment1 } = useCounter();
    const { count: count2, increment: increment2 } = useCounter();

    return (
        <section>
            <div>
                <h1>Counter 1: {count1}</h1>
                <button onClick={increment1}>Increment</button>
            </div>

            <div>
                <h1>Counter 2: {count2}</h1>
                <button onClick={increment2}>Increment</button>
            </div>
        </section>
    );
}
