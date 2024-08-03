// For catch all route, for base path there's no slug
export default function SupportPage(props: { params: { slug?: string[] } }) {
    return (
        <main className="p-4">
            <h1 className="mb-2">Support Page</h1>
            <p>Params: {props.params.slug?.join(", ")}</p>
        </main>
    );
}
