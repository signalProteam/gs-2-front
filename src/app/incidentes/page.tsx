"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { API_BASE, getHeaders } from "../services/api";

type HelpRequest = {
    id: number;
    cep: string | null;
    contactInfo: string;
    notes: string;
    enderecoAproximado: string | null;
    requestTimestamp: string;
    status: string;
};

const Incidentes = () => {
    const router = useRouter();
    const [solicitacoes, setSolicitacoes] = useState<HelpRequest[]>([]);
    const [erro, setErro] = useState("");

    const extrairCep = (endereco: string | null, cep: string | null): string | null => {
        if (cep) return cep;
        if (!endereco) return null;

        const matchHifen = endereco.match(/\b\d{5}-\d{3}\b/);
        if (matchHifen) return matchHifen[0];

        const matchSemHifen = endereco.match(/\b\d{8}\b/);
        if (matchSemHifen) return matchSemHifen[0];

        const matchCinco = endereco.match(/\b\d{5}\b/);
        if (matchCinco) return matchCinco[0];

        return null;
    };


    useEffect(() => {
        const fetchSolicitacoes = async () => {
            try {
                const response = await fetch(`${API_BASE}/solicitar-ajuda`, {
                    headers: getHeaders(),
                });

                if (!response.ok) {
                    throw new Error("Erro ao buscar solicitações.");
                }

                const data = await response.json();

                data.sort((a: HelpRequest, b: HelpRequest) => {
                    return new Date(b.requestTimestamp).getTime() - new Date(a.requestTimestamp).getTime();
                });

                console.log("Dados recebidos da API:", data);

                setSolicitacoes(data);
            } catch (err) {
                setErro("Erro ao carregar dados da API.");
            }
        };

        fetchSolicitacoes();
    }, [router]);

    return (
        <section className="section-conteudo">
            <h1>Incidentes</h1>

            {erro && <p className="text-red-500 mt-2">{erro}</p>}

            {solicitacoes.length === 0 && !erro ? (
                <p className="mt-4">Nenhuma solicitação encontrada.</p>
            ) : (
                <ul className="mt-4 space-y-10 w-3/4">
                    {solicitacoes.map((item) => (
                        <li key={item.id} className="border-2 border-blue-500 bg-blue-50 rounded-md p-4">
                            <p><strong>CEP:</strong> {extrairCep(item.enderecoAproximado, item.cep) || "Não informado"}</p>

                            <p>
                                <strong>Endereço:</strong>{" "}
                                <a
                                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.enderecoAproximado || "nao informado")}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 underline"
                                >
                                    {item.enderecoAproximado || "Não informado"}
                                </a>
                            </p>

                            <p><strong>Telefone:</strong> {item.contactInfo}</p>
                            <p><strong>Descrição:</strong> {item.notes}</p>
                            <p>
                                <strong>Data:</strong>{" "}
                                {new Date(item.requestTimestamp).toLocaleDateString("pt-BR", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
};

export default Incidentes;
