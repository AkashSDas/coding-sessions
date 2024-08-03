export default function DocPage(props: { params: { slug: string[] } }) {
    return (
        <main className="p-4">
            <h1 className="mb-2">Doc Page</h1>
            <p>Params: {props.params.slug.join(", ")}</p>
        </main>
    );
}
