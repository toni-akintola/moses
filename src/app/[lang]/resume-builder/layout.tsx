export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <main className="">
                <div className="bg-white h-screen">{children}</div>
            </main>
        </>
    )
}
