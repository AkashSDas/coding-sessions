import { EffectCallback, useEffect, useState } from "react";

export default function BasicUsage(): JSX.Element {
    const [show, setShow] = useState<boolean>(true);

    function handleClick(): void {
        setShow((prev) => !prev);
    }

    return (
        <div>
            <button onClick={handleClick}>Toggle Timer</button>
            {show && <Timer />}
        </div>
    );
}

function Timer(): JSX.Element {
    const [time, setTime] = useState<number>(0);
    const [refresh, setRefresh] = useState<boolean>(false);

    useEffect(
        function setup(): ReturnType<EffectCallback> {
            console.log("component did mount/update");
            const intervalId = setInterval(function () {
                setTime((prev) => prev + 1);
            }, 1000);

            return function cleanup(): void {
                console.log("component will unmount");
                clearInterval(intervalId);
            };
        },
        [refresh]
    );

    function handleRefresh(): void {
        setTime(0);
        setRefresh((prev) => !prev);
    }

    return (
        <div>
            <h1>Timer: {time}</h1>
            <button onClick={handleRefresh}>Refresh</button>
        </div>
    );
}
