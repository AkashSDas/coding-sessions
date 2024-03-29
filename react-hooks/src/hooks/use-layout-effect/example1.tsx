import { useState, useRef, useLayoutEffect } from "react";
import { createPortal } from "react-dom";

export default function App(): JSX.Element {
    const [show, setShow] = useState<boolean>(false);

    function toggle() {
        setShow((p) => !p);
    }

    return (
        <div>
            <button onClick={toggle}>Toggle</button>
            {show ? <TooltipExample /> : null}
        </div>
    );
}

function TooltipExample(): JSX.Element {
    type BtnDOMRect = Pick<DOMRect, "left" | "top" | "bottom" | "right">;

    const btnRef = useRef<HTMLButtonElement>(null);
    const [btnRect, setBtnRect] = useState<BtnDOMRect>({
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    });

    return (
        <div style={{ margin: "2rem" }}>
            <button ref={btnRef} onMouseEnter={handleBtnMouseEnter}>
                Hover me
            </button>

            {createPortal(<Tooltip btnRect={btnRect} />, document.body)}
        </div>
    );

    function Tooltip({ btnRect }: { btnRect: BtnDOMRect }): JSX.Element {
        const ref = useRef<HTMLDivElement>(null);
        const [tooltipHeight, setTooltipHeight] = useState(0);

        // Measure tooltip height after initial render
        useLayoutEffect(() => {
            const { height } = ref.current?.getBoundingClientRect() ?? {
                height: 0,
            };
            setTooltipHeight(height);
            console.log("Measured tooltip height: " + height);
        }, []);

        // Calculate tooltip position
        let tooltipX = 0;
        let tooltipY = 0;
        if (btnRect !== null) {
            tooltipX = btnRect.left;
            tooltipY = btnRect.top - tooltipHeight;

            // If the tooltip doesn't fit above, place it below
            if (tooltipY < 0) {
                tooltipY = btnRect.bottom;
            }
        }

        return (
            <div
                style={{
                    position: "absolute",
                    pointerEvents: "none",
                    left: 0,
                    top: 0,
                    transform: `translate3d(${tooltipX}px, ${tooltipY}px, 0)`,
                }}
            >
                <div ref={ref} className="tooltip">
                    Content of the tooltip
                </div>
            </div>
        );
    }

    function handleBtnMouseEnter() {
        const rect = btnRef.current?.getBoundingClientRect();

        if (rect) {
            setBtnRect(rect);
        }
    }
}
