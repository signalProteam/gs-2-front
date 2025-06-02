export function Footer() {
    const anoAtual = new Date().getFullYear();

    return (
        <>
            <footer className="text-center font-bold bg-blue-400 py-1 mt-auto bottom-0 inset-x-0 text-white">
                <p>&copy; VOZ - {anoAtual}</p>
            </footer>
        </>
    )
}