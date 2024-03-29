import { PropsWithChildren, useState } from "react";

export default function App(): JSX.Element {
    return <Child />;
}

function Wrapper(props: PropsWithChildren<object>): JSX.Element {
    const [count, setCount] = useState(0);

    function incrementCount(): void {
        setCount(count + 1);
    }

    console.log("[Wrapper] render");

    return (
        <section>
            <h2>Wrapper Component</h2>
            <button onClick={incrementCount}>Increment Count</button>
            <p>Count: {count}</p>
            {props.children}
        </section>
    );
}

function Child(): JSX.Element {
    console.log("[Child] render");

    return (
        <Wrapper>
            <h3>Child Component</h3>
        </Wrapper>
    );
}
