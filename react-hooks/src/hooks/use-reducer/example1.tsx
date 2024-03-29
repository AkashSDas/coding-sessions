import { Reducer, useReducer } from "react";

// Basic usage of useReducer

type State = {
    count: number;
};

type Action = {
    type: "increment" | "decrement";
    payload: number;
};

const reducer: Reducer<State, Action> = (state, action) => {
    switch (action.type) {
        case "increment":
            return { count: state.count + action.payload };
        case "decrement":
            return { count: state.count - action.payload };
        default:
            throw new Error("Invalid action type");
    }
};

const initialCount = 9;

export default function App(): JSX.Element {
    const [state, dispatch] = useReducer(
        reducer,
        initialCount,
        function (initialState) {
            // In Strict Mode, React will call your reducer and initializer twice
            return { count: initialState };
        }
    );

    function increment() {
        dispatch({ type: "increment", payload: 1 });
    }

    function decrement() {
        dispatch({ type: "decrement", payload: 1 });
    }

    return (
        <section>
            <h1>Count: {state.count}</h1>
            <button onClick={increment}>Increment</button>
            <button onClick={decrement}>Decrement</button>
        </section>
    );
}
