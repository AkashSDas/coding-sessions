import Link from "next/link";

export default function Home() {
    return (
        <main className="p-4">
            <h1 className="mb-2">Home Page</h1>

            <div className="flex flex-col gap-1">
                <NavigateButton href="/about" />
                <NavigateButton href="/dashboard" />
                <NavigateButton href="/post/123" />
                <NavigateButton href="/post/123/comment/456" />

                <NavigateButton href="/docs/123" />
                <NavigateButton href="/docs/123/comment" />
                <NavigateButton href="/docs/123/comment/456" />

                <NavigateButton href="/support" />
                <NavigateButton href="/support/123" />
                <NavigateButton href="/support/123/comment" />
                <NavigateButton href="/support/123/comment/456" />
            </div>
        </main>
    );
}

function NavigateButton(prop: { href: string }) {
    return (
        <Link
            href={prop.href}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded max-w-80"
        >
            {prop.href}
        </Link>
    );
}
