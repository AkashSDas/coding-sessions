export default function RootLayout(
    props: Readonly<{ children: React.ReactNode }>
) {
    return (
        <div className="p-4">
            <h4 className="font-bold mb-4">Marketing Layout</h4>

            <div className="border-2 border-black rounded">
                {props.children}
            </div>
        </div>
    );
}
