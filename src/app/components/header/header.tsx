"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export function Header() {
    const [menuAberto, setMenuAberto] = useState(false);

    return (
        <>
            <header className="flex font-bold bg-blue-300 py-4 sm:text-xl relative">
                <div className="max-w-4xl mx-auto px-4 flex flex-col items-center">
                    {/* Logo */}
                    <Link href="/" aria-label="Ir para a página inicial">
                        <Image
                            src="/images/logo.png"
                            alt="Logo"
                            width={80}
                            height={80}
                            className="mb-5 w-14 h-14 md:w-16 md:h-16 lg:h-24 lg:w-24"
                        />
                    </Link>

                    {/* Menu normal */}
                    <nav className="hidden sm:block">
                        <ul className="flex space-x-4 text-lg">
                            <li><Link className="hover:underline" href="/">Início</Link></li>
                            <li><Link className="hover:underline" href="/apoiar">Doações</Link></li>
                            <li><Link className="hover:underline" href="/integrantes">Integrantes</Link></li>
                        </ul>
                    </nav>

                    {/* Botão de menu mobile */}
                    <button
                        className="sm:hidden w-24 px-4 py-2 bg-blue-500 text-white rounded font-bold"
                        onClick={() => setMenuAberto(!menuAberto)}
                    >
                        {menuAberto ? "Fechar" : "Menu"}
                    </button>

                    {/* Menu lateral mobile */}
                    {menuAberto && (
                        <div className="sm:hidden font-bold w-2/4 absolute top-full bg-blue-300 shadow-md">
                            <ul className="flex flex-col items-center py-2.5 space-y-2.5">
                                <li><Link href="/" onClick={() => setMenuAberto(false)}>Início</Link></li>
                                <li><Link href="/apoiar" onClick={() => setMenuAberto(false)}>Doações</Link></li>
                                <li><Link href="/integrantes" onClick={() => setMenuAberto(false)}>Integrantes</Link></li>
                            </ul>
                        </div>
                    )}
                </div>
            </header>
        </>
    );
}
