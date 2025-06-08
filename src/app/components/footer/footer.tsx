export function Footer() {
    const anoAtual = new Date().getFullYear();

    return (
        <>
            <footer className="text-center font-semibold bg-blue-400 py-3 mt-auto text-white">
                <p>&copy; VOZ - {anoAtual}</p>
            </footer>
        </>
    )
}