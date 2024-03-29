import { forwardRef, useRef } from "react";

export default function App(): JSX.Element {
    const ref = useRef<HTMLInputElement | null>(null);

    return (
        <div>
            <button onClick={focusOnInput}>Focus</button>
            <CustomTextInput ref={ref} />
        </div>
    );

    // A pattern to ensure that ref.current is not null
    function getInputRef(): HTMLInputElement {
        if (ref.current === null) {
            throw new Error("Input ref is null");
        }

        return ref.current;
    }

    function focusOnInput(): void {
        const currentRef = getInputRef();
        currentRef.focus();
        currentRef.placeholder = "Hello";

        // ref.current?.focus();
        // ref.current!.placeholder = "Hello";
    }
}

const CustomTextInput = forwardRef(function CustomTextInput(
    _props: Record<string, unknown>,
    ref: React.Ref<HTMLInputElement>
) {
    return (
        <div>
            <input type="text" ref={ref} />
        </div>
    );
});
