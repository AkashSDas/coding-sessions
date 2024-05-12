import { useImmerReducer } from "use-immer";

// Using useImmerReducer

type State = {
    tasks: { title: string; done: boolean }[];
};

type Action =
    | { type: "add"; payload: string }
    | { type: "toggle"; payload: number };

export default function App(): JSX.Element {
    const [state, dispatch] = useImmerReducer<State, Action>(
        (draft, action) => {
            switch (action.type) {
                case "add":
                    draft.tasks.push({ title: action.payload, done: false });
                    break;
                case "toggle": {
                    const task = draft.tasks[action.payload];
                    task.done = !task.done;
                    break;
                }
                default:
                    throw new Error("Invalid action type");
            }
        },
        { tasks: [] }
    );

    function toggleTask(index: number): void {
        dispatch({ type: "toggle", payload: index });
    }

    function addTask(): void {
        const title = prompt("Task title");
        if (title) {
            dispatch({ type: "add", payload: title });
        }
    }

    return (
        <section>
            <h3>Tasks</h3>
            <ul>
                {state.tasks.map((task, index) => (
                    <li key={index}>
                        <label>
                            <input
                                type="checkbox"
                                checked={task.done}
                                onChange={() => toggleTask(index)}
                            />
                            {task.title}
                        </label>
                    </li>
                ))}
            </ul>

            <button onClick={addTask}>Add Task</button>
        </section>
    );
}
