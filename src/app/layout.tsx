import type { Metadata } from "next";
import "./globals.css";
import { Header } from "./components/header/header";
import { Footer } from "./components/footer/footer";


export const metadata: Metadata = {
    title: "VOZ",
    description: "Voz de orientação e Zelo",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-br">
            <body className="font-sans antialiased bg-blue-100 text-gray-900 text-lg m-0 p-0 leading-relaxed min-h-screen flex flex-col">
                <Header />
                {children}
                <Footer />
            </body>
        </html>
    );
}
