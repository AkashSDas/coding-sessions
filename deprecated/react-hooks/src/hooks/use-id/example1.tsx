import { useId } from "react";

export default function App(): JSX.Element {
    const usernameHintId = useId();

    return (
        <div>
            {/* With useId */}
            <input type="text" aria-describedby={usernameHintId} />
            <p id={usernameHintId}>Enter your username</p>

            {/* Without useId */}
            <label>
                Password:
                <input type="password" aria-describedby="password-hint" />
            </label>
            <p id="password-hint">
                The password should contain at least 18 characters
            </p>
        </div>
    );
}
