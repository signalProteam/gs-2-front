"use client"

import { useState } from "react";
import { API_BASE, getHeaders } from "../services/api";

type Mensagem = {
    autor: "usuario" | "assistente";
    texto: string;
};

const ajudaChat = () => {
    const [mensagem, setMensagem] = useState("");
    const [conversa, setConversa] = useState<Mensagem[]>([]);
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState<string | null>(null);

    const enviarMensagem = async () => {
        const texto = mensagem.trim();
        if (!texto) return;

        // Adiciona mensagem do usuário
        setConversa((prev) => [...prev, { autor: "usuario", texto }]);
        setMensagem("");
        setErro(null);
        setCarregando(true);

        try {
            const res = await fetch(`${API_BASE}/chat`, {
                method: "POST",
                headers: getHeaders(),
                body: JSON.stringify({ message: texto }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || `Erro na requisição: ${res.statusText}`);
            }

            const data = await res.json();
            const respostaAssistente = data.answer;

            // Adiciona resposta do assistente
            setConversa((prev) => [...prev, { autor: "assistente", texto: respostaAssistente }]);
        } catch (e) {
            console.error(e);
            setConversa((prev) => [
                ...prev,
                { autor: "assistente", texto: "Erro ao enviar mensagem. Tente novamente." },
            ]);
        } finally {
            setCarregando(false);
        }
    };

    return (
        <section className="section-conteudo">
            <h1 className="text-2xl font-bold mb-4">Chat com Assistente</h1>

            {/* Área do chat */}
            <div className="bg-blue-100 rounded-lg p-4 min-h-96 w-11/12 overflow-y-auto mb-4">
                {conversa.map((msg, idx) => (
                    <div key={idx} className={`flex mb-2 ${msg.autor === "usuario" ? "justify-end" : "justify-start"}`}>
                        <div
                            className={`px-4 py-2 rounded-xl max-w-10/12 ${msg.autor === "usuario"
                                ? "bg-white"
                                : "bg-white"
                                }`}
                        >
                            {msg.texto}
                        </div>
                    </div>
                ))}
                {carregando && (
                    <p>Assistente está digitando...</p>
                )}
            </div>

            {/* Campo de texto + botão */}
            <div className="flex gap-2">
                <input
                    type="text"
                    value={mensagem}
                    onChange={(e) => setMensagem(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && enviarMensagem()}
                    className="flex-1 border border-gray-400 rounded-lg px-3 py-2 w-11/12"
                    placeholder="Digite sua mensagem..."
                    disabled={carregando}
                />
                <button
                    onClick={enviarMensagem}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
                    disabled={carregando || !mensagem.trim()}
                >
                    Enviar
                </button>
            </div>

            {erro && <p className="text-red-600 mt-2">{erro}</p>}
        </section>
    );
};

export default ajudaChat;