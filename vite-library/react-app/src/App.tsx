// import { Button, Input } from "ui-library";

import { Suspense, lazy } from "react";

// if the component is named exported in host app
// import { Button } from "JamesUILibrary/Button";

const Button = lazy(() =>
    import("JamesUILibrary/Button").then((module) => {
        return {
            default: module.default.Button,
        };
    })
);

export default function App() {
    return (
        <div>
            <h1>React App</h1>

            <Suspense fallback={<div>Not working</div>}>
                <Button />
            </Suspense>

            {/* <Button />
            <Input /> */}
        </div>
    );
}
