"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { API_BASE, getHeaders } from "../services/api";
import Botao from "../components/botao/botao";


const Login = () => {
    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");
    const [carregando, setCarregando] = useState(false);
    const [erroCampos, setErroCampos] = useState({ usuario: false, senha: false });
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErro("");
        setErroCampos({ usuario: !usuario, senha: !senha });

        if (!usuario || !senha) {
            setErro("Por favor, preencha todos os campos.");
            return;
        }

        setCarregando(true);

        try {
            const response = await fetch(`${API_BASE}/login`, {
                method: "POST",
                headers: getHeaders(),
                body: JSON.stringify({ username: usuario, password: senha }),
            });

            if (response.ok) {
                const data = await response.json();

                localStorage.setItem("authToken", "logado");

                window.dispatchEvent(new Event("storage"));
                router.push("/incidentes");
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
                            placeholder="Digite seu Usuário"
                            className={`border-2 border-blue-500 p-2 rounded-md w-11/12 bg-white mx-auto ${erroCampos.usuario ? "border-2 border-red-500" : ""}`}
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
                            className={`border-2 border-blue-500 p-2 rounded-md w-11/12 bg-white mx-auto ${erroCampos.senha ? "border-2 border-red-500" : ""}`}
                        />
                    </div>
                    {erro && <p className="text-red-500 mb-4">{erro}</p>}

                    <Botao type="submit" texto="Conectar" carregando={carregando} />
                </form>
            </section>
        </main>
    );
};

export default Login;
