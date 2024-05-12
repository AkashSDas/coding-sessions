import { useState } from "react";
import { flushSync } from "react-dom";

// Use flushSync for emergency re-render
export default function App(): JSX.Element {
    const [count, setCount] = useState(0);

    function increment() {
        setCount(count + 1);
        console.log(`Count: ${count}`);

        flushSync(function () {
            setCount(count + 1);
            console.log(`Count [flushSync]: ${count}`);
        });

        setCount(count + 1);
        console.log(`Count: ${count}`);
    }

    console.log("Render");

    return (
        <section>
            <p>Count: {count}</p>
            <button onClick={increment}>Increment</button>
        </section>
    );
}
