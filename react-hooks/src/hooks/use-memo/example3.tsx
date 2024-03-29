import { useState, memo, Dispatch, SetStateAction } from "react";

export default function App(): JSX.Element {
    const [count, setCount] = useState(0);
    const [showExpensiveComponent, setShowExpensiveComponent] = useState(false);

    function toggleExpensiveComponent() {
        setShowExpensiveComponent((prev) => !prev);
    }

    return (
        <section>
            <Counter count={count} setCount={setCount} />

            <button onClick={toggleExpensiveComponent}>
                Toggle ExpensiveComponent
            </button>
            {showExpensiveComponent && <ExpensiveComponent />}
        </section>
    );
}

type CounterProps = {
    count: number;
    setCount: Dispatch<SetStateAction<number>>;
};

function Counter({ count, setCount }: CounterProps): JSX.Element {
    console.log("Counter renders");
    return (
        <section>
            <p>Count: {count}</p>
            <button onClick={() => setCount((prevCount) => prevCount + 1)}>
                Increment
            </button>
        </section>
    );
}

const ExpensiveComponent = memo(function ExpensiveComponent(): JSX.Element {
    console.log("ExpensiveComponent renders");

    const start = performance.now();
    while (performance.now() - start < 1000) {
        // Artificial delay -- do nothing for 1000ms
    }

    return <p>ExpensiveComponent</p>;
});
