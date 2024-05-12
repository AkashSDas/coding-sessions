import { useState, useDeferredValue, ChangeEvent } from "react";

export default function App(): JSX.Element {
    const [input, setInput] = useState("");
    const deferredValue = useDeferredValue(input);

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setInput(e.target.value);
    }

    return (
        <section>
            <input type="text" value={input} onChange={handleChange} />
            <List text={deferredValue} />
        </section>
    );
}

function List({ text }: { text: string }) {
    return (
        <div>
            {Array.from({ length: 10_000 }).map((_, index) => (
                <div key={index}>{text}</div>
            ))}
        </div>
    );
}
