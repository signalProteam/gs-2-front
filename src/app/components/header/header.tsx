"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function Header() {
    const [logado, setLogado] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const [menuAberto, setMenuAberto] = useState(false);

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem("authToken");
            setLogado(!!token);
            setLoading(false);
        };

        checkAuth();
        window.addEventListener("storage", checkAuth);

        return () => {
            window.removeEventListener("storage", checkAuth);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        setLogado(false);
        router.push("/")
    };


    const handleLogin = () => {
        router.push("/login");
    };

    return (
        <>
            <header className="flex font-bold bg-blue-400 py-4 sm:text-xl relative z-50 text-white">
                <div className="max-w-4xl mx-auto px-4 flex flex-col items-center">
                    {/* Botão de Login e Logout */}
                    {!loading && (
                        <div className="absolute top-2 right-2 flex flex-col items-end">
                            <button
                                onClick={logado ? handleLogout : handleLogin}
                                className="flex items-center gap-2 border-2 px-4 py-2 rounded-xl text-white hover:border-blue-200 transition hover:cursor-pointer text-sm sm:text-base md:text-lg"
                            >
                                {logado ? "Logout" : "Login"}
                            </button>
                        </div>
                    )}

                    {/* Logo */}
                    <Link href="/" aria-label="Ir para a página inicial">
                        <Image
                            src="/images/logo.png"
                            alt="Logo"
                            width={80}
                            height={80}
                            className="mb-5 w-20 h-20 md:w-24 md:h-24"
                        />
                    </Link>

                    {/* Menu normal */}
                    <nav className="hidden sm:block">
                        <ul className="flex space-x-4 text-lg">
                            <li><Link className="hover:underline" href="/">Início</Link></li>
                            <li><Link className="hover:underline" href="/apoiar">Parceria</Link></li>
                            <li><Link className="hover:underline" href="/integrantes">Integrantes</Link></li>
                        </ul>
                    </nav>

                    {/* Botão de menu mobile */}
                    <button
                        className="sm:hidden w-24 px-4 py-2 border-2 text-white rounded font-bold"
                        onClick={() => setMenuAberto(!menuAberto)}
                    >
                        {menuAberto ? "Fechar" : "Menu"}
                    </button>

                    {/* Menu mobile */}
                    {menuAberto && (
                        <div className="sm:hidden font-bold w-40 absolute top-full bg-blue-400 shadow-md">
                            <ul className="flex flex-col items-center py-2.5 space-y-2.5 w-full">
                                <li className="w-full">
                                    <Link
                                        href="/"
                                        onClick={() => setMenuAberto(false)}
                                        className="block w-full text-center py-0.5"
                                    >
                                        Início
                                    </Link>
                                </li>
                                <li className="w-full">
                                    <Link
                                        href="/apoiar"
                                        onClick={() => setMenuAberto(false)}
                                        className="block w-full text-center py-0.5"
                                    >
                                        Parceria
                                    </Link>
                                </li>
                                <li className="w-full">
                                    <Link
                                        href="/integrantes"
                                        onClick={() => setMenuAberto(false)}
                                        className="block w-full text-center py-0.5"
                                    >
                                        Integrantes
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </header>
        </>
    );
}
