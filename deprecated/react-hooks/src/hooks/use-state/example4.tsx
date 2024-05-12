import { Dispatch, SetStateAction, useState } from "react";

// Cannot call setter of other component during rendering
// @ref - https://react.dev/reference/react/useState#storing-information-from-previous-renders

export default function App(): JSX.Element {
    const [count, setCount] = useState(0);

    function increment(): void {
        setCount((prevCount) => prevCount + 1);
    }

    return (
        <section>
            <button onClick={increment}>Increment</button>
            <CountLabel count={count} updateCount={setCount} />
        </section>
    );
}

type CountLabelProps = {
    count: number;
    updateCount: Dispatch<SetStateAction<number>>;
};

function CountLabel(props: CountLabelProps): JSX.Element {
    const { count, updateCount } = props;
    const [previousCount, setPreviousCount] = useState(count);

    if (count !== previousCount) {
        setPreviousCount(count);
        updateCount((prev) => prev + 1);
    }

    return <p>Count: {count}</p>;
}
