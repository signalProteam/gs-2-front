"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { API_BASE, getHeaders } from "../../services/api";
import Botao from "../botao/botao";
import Link from "next/link";

const CompLogin = () => {
    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");
    const [carregando, setCarregando] = useState(false);
    const [erroCampos, setErroCampos] = useState({ usuario: false, senha: false });

    const router = useRouter();
    const searchParams = useSearchParams();
    const redirect = searchParams.get("redirect") || "/";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErro("");

        if (!usuario || !senha) {
            setErro("Por favor, preencha todos os campos.");
            setErroCampos({ usuario: !usuario, senha: !senha });
            return;
        } else {
            setErroCampos({ usuario: false, senha: false });
        }

        setCarregando(true);

        try {
            const response = await fetch(`${API_BASE}/login`, {
                method: "POST",
                headers: getHeaders(),
                body: JSON.stringify({ username: usuario, password: senha }),
            });

            if (response.ok) {
                localStorage.setItem("authToken", "logado");
                window.dispatchEvent(new Event("storage"));
                router.push(redirect);
            } else if (response.status === 401) {
                setErro("Usuário ou senha inválidos!");
            } else {
                setErro("Erro inesperado. Tente novamente mais tarde.");
            }
        } catch (error) {
            console.error("Erro ao conectar à API:", error);
            setErro("Não foi possível conectar ao servidor.");
        } finally {
            setCarregando(false);
        }
    };


    return (
        <main>
            <section className="section-conteudo">
                <form className="w-full max-w-md text-center" onSubmit={handleSubmit}>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="usuario" className="mb-2">Usuário:</label>
                        <input
                            type="text"
                            id="usuario"
                            value={usuario}
                            onChange={(e) => setUsuario(e.target.value)}
                            placeholder="Digite seu usuário"
                            className={`border-2 p-2 rounded-md w-11/12 bg-white mx-auto ${erroCampos.usuario ? "border-red-500" : "border-blue-500"
                                }`}

                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="senha" className="mb-2">Senha:</label>
                        <input
                            type="password"
                            id="senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            placeholder="Digite sua senha"
                            className={`border-2 p-2 rounded-md w-11/12 bg-white mx-auto ${erroCampos.senha ? "border-red-500" : "border-blue-500"
                                }`}
                        />
                    </div>
                    {erro && <p className="text-red-500 mb-4">{erro}</p>}

                    <Botao type="submit" texto="Conectar" carregando={carregando} />

                    <p>
                        <Link href="/cadastro" className="hover:text-blue-600 hover:underline">Cadastre-se</Link>
                    </p>
                </form>
            </section>
        </main>
    );
};

export default CompLogin;
