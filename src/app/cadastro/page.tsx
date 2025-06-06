"use client";

import { useState } from "react";
import { API_BASE, getHeaders } from "../services/api";
import Botao from "../components/botao/botao";

const Cadastro = () => {
    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState<string[]>([]);
    const [sucesso, setSucesso] = useState("");
    const [carregando, setCarregando] = useState(false);
    const [erroCampos, setErroCampos] = useState({ usuario: false, senha: false });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErro([]);
        setSucesso("");

        const erros: string[] = [];
        const novosErrosCampos = { usuario: false, senha: false };

        if (!usuario) {
            erros.push("Por favor, preencha o campo de usuário.");
            novosErrosCampos.usuario = true;
        } else if (usuario.length < 5) {
            erros.push("O usuário deve ter pelo menos 5 caracteres.");
            novosErrosCampos.usuario = true;
        }

        if (!senha) {
            erros.push("Por favor, preencha o campo de senha.");
            novosErrosCampos.senha = true;
        } else if (senha.length < 5) {
            erros.push("A senha deve ter pelo menos 5 caracteres.");
            novosErrosCampos.senha = true;
        }

        setErro(erros);
        setErroCampos(novosErrosCampos);

        if (erros.length > 0) return;


        setCarregando(true);

        try {
            const response = await fetch(`${API_BASE}/usuarios`, {
                method: "POST",
                headers: getHeaders(),
                body: JSON.stringify({ username: usuario, password: senha })
            });

            if (response.ok) {
                setSucesso("Usuário cadastrado com sucesso!");
                setUsuario("");
                setSenha("");
                setErro([]);
            } else {
                const texto = await response.text();

                if (texto.includes("ORA-00001")) {
                    setErro(["Nome de usuário já está em uso."]);
                } else {
                    setErro([`Erro ao cadastrar: ${texto}`]);
                }
            }
        } catch (error) {
            console.error("Erro ao conectar à API:", error);
            setErro(["Não foi possível conectar ao servidor."]);
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

                    {erro.length > 0 && (
                        <ul className="text-red-500 mb-4">
                            {erro.map((e, i) => (
                                <li key={i}>{e}</li>
                            ))}
                        </ul>
                    )}

                    {sucesso && <p className="text-blue-500 mb-4">{sucesso}</p>}

                    <Botao type="submit" texto="Cadastrar" carregando={carregando} />
                </form>
            </section>
        </main>
    );
};

export default Cadastro;
