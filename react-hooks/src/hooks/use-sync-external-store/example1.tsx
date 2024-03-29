import { useState, useSyncExternalStore } from "react";

// ======================================
// STORE
// ======================================

let nextId = 0;
let todos = [
    { id: nextId++, text: "Learn React" },
    { id: nextId++, text: "Learn TypeScript" },
];
let listeners: CallableFunction[] = [];

const todoStore = {
    addTodo: function (text: string) {
        // todos.push({ id: nextId++, text }); // This is wrong and won't work
        todos = [...todos, { id: nextId++, text }];
        console.log("[addTodo] todos", todos);
        listeners.forEach((listener) => listener());
    },
    getSnapshot: function () {
        console.log("[getSnapshot] todos", todos);
        return todos;
    },
    subscribe: function (listener: CallableFunction) {
        listeners.push(listener);
        console.log("[subscribe] listeners", listeners);

        return function unsubscribe() {
            console.log("[unsubscribe] listeners", listeners);
            listeners = listeners.filter((l) => l !== listener);
        };
    },
};

// ======================================
// COMPONENT
// ======================================

export default function App(): JSX.Element {
    const [show, setShow] = useState(false);

    return (
        <div>
            <OnlineStatus />
            <button onClick={() => setShow(!show)}>Toggle</button>
            {show && <Todos />}
        </div>
    );
}

function Todos(): JSX.Element {
    const todos = useSyncExternalStore(
        todoStore.subscribe,
        todoStore.getSnapshot
    );

    return (
        <div>
            <h2>Good morning</h2>

            <ul>
                {todos.map((todo) => (
                    <li key={todo.id.toString()}>{todo.text}</li>
                ))}

                <li>
                    <button onClick={() => todoStore.addTodo("Learn Hooks")}>
                        Add Todo
                    </button>

                    <button onClick={() => todoStore.addTodo("Learn Redux")}>
                        Add Todo
                    </button>

                    <button onClick={() => todoStore.addTodo("Learn MobX")}>
                        Add Todo
                    </button>
                </li>
            </ul>
        </div>
    );
}

function OnlineStatus(): JSX.Element {
    const isOnline = useOnlineStatus();

    return (
        <div>
            <h2>Good morning</h2>

            <p>Are you online? {isOnline ? "Yes" : "No"}</p>
        </div>
    );
}

function useOnlineStatus() {
    const isOnline = useSyncExternalStore(subscribe, getSnapshot);
    return isOnline;
}

function getSnapshot() {
    return navigator.onLine;
}

function subscribe(callback: () => void) {
    window.addEventListener("online", callback);
    window.addEventListener("offline", callback);

    return function unsubscribe(): void {
        window.removeEventListener("online", callback);
        window.removeEventListener("offline", callback);
    };
}
