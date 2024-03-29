import {
    useEffect,
    useInsertionEffect,
    useLayoutEffect,
    useState,
} from "react";

export default function App(): JSX.Element {
    const [show, setShow] = useState(false);

    return (
        <div>
            <button onClick={() => setShow(!show)}>Toggle</button>
            {show && <Child />}
            {show && <Child2 />}
        </div>
    );
}

function Child(): JSX.Element {
    const [show, setShow] = useState(false);

    useInsertionEffect(function () {
        console.log("[insertion 1]");

        return function () {
            console.log("[destruction 1]");
        };
    });

    useInsertionEffect(function () {
        console.log("[insertion 11]");

        return function () {
            console.log("[destruction 11]");
        };
    });

    useLayoutEffect(function () {
        console.log("[effect 1]");

        return function () {
            console.log("[effect cleanup 1]");
        };
    });

    useLayoutEffect(function () {
        console.log("[effect 11]");

        return function () {
            console.log("[effect cleanup 11]");
        };
    });

    useEffect(function () {
        console.log("[*effect 1]");

        return function () {
            console.log("[*effect cleanup 1]");
        };
    });

    return (
        <div>
            <h2>Child</h2>
            <button onClick={() => setShow(!show)}>Toggle</button>
        </div>
    );
}

function Child2(): JSX.Element {
    const [show, setShow] = useState(false);

    useInsertionEffect(function () {
        console.log("[insertion 2]");

        return function () {
            console.log("[destruction 2]");
        };
    });

    useLayoutEffect(function () {
        console.log("[effect 2]");

        return function () {
            console.log("[effect cleanup 2]");
        };
    });

    return (
        <div>
            <h2>Child</h2>
            <button onClick={() => setShow(!show)}>Toggle</button>
        </div>
    );
}

// Output after Toggle btn is clicked on initial render:
// [insertion 1]
// [insertion 11]
// [insertion 2]
// [effect 1]
// [effect 11]
// [effect 2]
// [*effect 1]
// [effect cleanup 1]
// [effect cleanup 11]
// [effect cleanup 2]
// [*effect cleanup 1]
// [effect 1]
// [effect 11]
// [effect 2]
// [*effect 1]
