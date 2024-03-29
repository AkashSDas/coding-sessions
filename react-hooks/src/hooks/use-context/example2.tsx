import { createContext, useContext, useReducer,  } from "react";

type CountContextType = {
    state: number;
    dispatch: (action: string) => void;
};

const CountContext = createContext<CountContextType>({
    state: 0,
    dispatch: () => {},
});

function reducer(state: number, action: string): number {
    switch (action) {
        case "increment":
            return state + 1;
        case "decrement":
            return state - 1;
        default:
            throw new Error();
    }
}

export default function App(): JSX.Element {
    const [state1, dispatch1] = useReducer(reducer, 0);
    const [state2, dispatch2] = useReducer(reducer, 0);
    const [state3, dispatch3] = useReducer(reducer, 0);

    return (
        <section>
            {/* Separate provider */}
            <CountContext.Provider value={{ state: state1, dispatch: dispatch1 }}>
                <DisplayCount />
                <UpdateCount />
            </CountContext.Provider>

            {/* Separate provider */}
            <CountContext.Provider value={{ state: state2, dispatch: dispatch2 }}>
                <DisplayCount />
                <UpdateCount />

                {/* Overriding context */}
                <CountContext.Provider value={{ state: state1, dispatch: dispatch1 }}>
                    <DisplayCount />
                    <UpdateCount />
                </CountContext.Provider>
            </CountContext.Provider>

            {/* Separate provider */}
            <CountContext.Provider value={{ state: state3, dispatch: dispatch3 }}>
                <DisplayCountOld />
                <UpdateCount />
            </CountContext.Provider>
        </section>
    );
}

function UpdateCount(): JSX.Element {
    const { dispatch } = useContext(CountContext);
    return <button onClick={() => dispatch("increment")}>Increment</button>;
}

function DisplayCount(): JSX.Element {
    const { state } = useContext(CountContext);
    return <div>The current count is {state}</div>;
}

function DisplayCountOld(): JSX.Element {
    return (
        <CountContext.Consumer>
            {({ state }) => <div>The current count is {state}</div>}
        </CountContext.Consumer>
    );
}
