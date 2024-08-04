import Link from "next/link";

export default function Home() {
    return (
        <main className="p-4">
            <h1 className="mb-2 font-bold text-3xl">Home Page</h1>

            <hr className="my-4" />

            <div className="flex flex-col gap-1">
                <h2 className="mb-2 font-bold">Routing</h2>
                <div className="my-2" />

                <NavigateButton href="/routing/about" />
                <NavigateButton href="/routing/dashboard" />
                <NavigateButton href="/routing/marketing" />
                <div className="my-2" />

                <NavigateButton href="/routing/post/123" />
                <NavigateButton href="/routing/post/123/comment/456" />
                <div className="my-2" />

                <NavigateButton href="/routing/docs/123" />
                <NavigateButton href="/routing/docs/123/comment" />
                <NavigateButton href="/routing/docs/123/comment/456" />
                <div className="my-2" />

                <NavigateButton href="/routing/support" />
                <NavigateButton href="/routing/support/123" />
                <NavigateButton href="/routing/support/123/comment" />
                <NavigateButton href="/routing/support/123/comment/456" />
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
