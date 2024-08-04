export default function PostPage(props: { params: { id: string } }) {
    const { id } = props.params;

    return (
        <main className="p-4 bg-yellow-100 min-h-dvh">
            <h1 className="mb-2 font-bold text-3xl">Post Page</h1>
            <p>ID {id}</p>
        </main>
    );
}
