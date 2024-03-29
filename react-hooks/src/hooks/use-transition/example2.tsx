import { ChangeEvent, useState, useTransition } from "react";

export default function App(): JSX.Element {
    const [input, setInput] = useState<string>("");
    const [lists, setLists] = useState<string[]>([]);
    const [isPending, startTransition] = useTransition();

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const { value } = e.target;
        setInput(value);

        startTransition(() => {
            const dataList: string[] = [];
            for (let i: number = 0; i < 100_000; i++) {
                dataList.push(value);
            }
            setLists(dataList);
        });
    }

    return (
        <div>
            <input type="text" value={input} onChange={handleChange} />

            {isPending ? (
                <div>Loading...</div>
            ) : (
                lists.map((list: string) => {
                    return <div key={list}>{list}</div>;
                })
            )}
        </div>
    );
}
