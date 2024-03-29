import { useState } from "react";

// Multiple useState calls but count value is same in same execution
export default function App(): JSX.Element {
    const [count, setCount] = useState(0);

    function increment() {
        setCount(count + 1); // 0+1=1
        setCount(count + 1); // 0+1=1
        setCount(count + 1); // 0+1=1
        setCount(count + 1); // 0+1=1

        setCount((prev) => prev + 1); // 0+1=1
        setCount((prev) => prev + 1); // 1+1=2
        setCount((prev) => prev + 1); // 2+1=3
        setCount((prev) => prev + 1); // 3+1=4

        // React puts your updater functions in a queue. Then,
        // during the next render, it will call them in the same order:
        //
        // prev => prev + 1 will receive 0 as the pending state and return 1 as the next state.
        // prev => prev + 1 will receive 1 as the pending state and return 2 as the next state.
        // prev => prev + 1 will receive 2 as the pending state and return 3 as the next state.
        // prev => prev + 1 will receive 3 as the pending state and return 4 as the next state.
        //
        // There are no other queued updates, so React will store 4  as the current state in the end.
    }

    return (
        <section>
            <p>Count: {count}</p>
            <button onClick={increment}>Increment</button>
        </section>
    );
}
