import { useEffect, useRef, useState } from "react";

export default function App(): JSX.Element {
    const countRef = useRef<number>(0);
    const [count, setCount] = useState<number>(0);

    useEffect(
        function () {
            countRef.current += 1;
            console.log("[useEffect] ", countRef.current);
        },
        [count]
    );

    countRef.current += 1;
    console.log("[render] ", countRef.current);

    return (
        <section>
            <h2>Current count ref: {countRef.current}</h2>

            <button onClick={handleClick}>Count: {count}</button>
        </section>
    );

    function handleClick(): void {
        setCount(function (prev) {
            console.log("[setCount]");
            return prev + 1;
        });
    }
}

// Output in the initial render:
// [render]  1
// [render]  1
// [useEffect]  2
// [useEffect]  3
