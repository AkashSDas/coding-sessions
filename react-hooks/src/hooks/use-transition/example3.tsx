import { memo, startTransition, useState } from "react";

export default function App(): JSX.Element {
    const [tab, setTab] = useState("about");

    function selectTab(nextTab: string) {
        startTransition(function () {
            setTab(nextTab);
        });
    }

    return (
        <div>
            <TabButton
                label="About"
                tabId="about"
                selectTab={selectTab}
                currentTab={tab}
            />
            <TabButton
                label="Posts (slow)"
                tabId="posts"
                selectTab={selectTab}
                currentTab={tab}
            />
            <TabButton
                label="Contact"
                tabId="contact"
                selectTab={selectTab}
                currentTab={tab}
            />

            <hr />
            <TabContent tab={tab} />
        </div>
    );
}

function TabButton({
    label,
    tabId,
    selectTab,
    currentTab,
}: {
    label: string;
    tabId: string;
    selectTab: (tabId: string) => void;
    currentTab: string;
}): JSX.Element {
    const isActive = currentTab === tabId;

    return (
        <button
            onClick={() => selectTab(tabId)}
            style={{ fontWeight: isActive ? "bold" : "normal" }}
        >
            {label}
        </button>
    );
}

function TabContent({ tab }: { tab: string }): JSX.Element | null {
    switch (tab) {
        case "about":
            return <AboutTab />;
        case "posts":
            return <PostsTab />;
        case "contact":
            return <ContactTab />;
        default:
            return null;
    }
}

function AboutTab(): JSX.Element {
    return <p>About page</p>;
}

function ContactTab(): JSX.Element {
    return <p>Contact page</p>;
}

const PostsTab = memo(function PostsTab() {
    const items: JSX.Element[] = [];
    for (let i = 0; i < 500; i++) {
        items.push(<SlowPost key={i} index={i} />);
    }
    return <ul className="items">{items}</ul>;
});

function SlowPost({ index }: { index: number }): JSX.Element {
    const startTime = performance.now();
    while (performance.now() - startTime < 1) {
        // Do nothing for 1 ms per item to emulate extremely slow code
    }

    return <li className="item">Post #{index + 1}</li>;
}
