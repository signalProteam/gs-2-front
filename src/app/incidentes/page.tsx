"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { API_BASE, getHeaders } from "../services/api";

type HelpRequest = {
    id: number;
    cep: string | null;
    contactInfo: string;
    notes: string;
    enderecoAproximado?: string | null;
    requestTimestamp?: string;
    status?: string;
};

const buscarEnderecoPorCep = async (cep: string): Promise<string | null> => {
    try {
        const res = await fetch(`https://viacep.com.br/ws/${cep.replace(/\D/g, "")}/json/`);
        if (!res.ok) throw new Error("Erro ao buscar CEP");
        const data = await res.json();
        if (data.erro) return null;
        return `${data.logradouro || ""}, ${data.bairro || ""}, ${data.localidade || ""} - ${data.uf || ""}`.replace(/^(, )+|(, )+$/g, "").trim();
    } catch {
        return null;
    }
};

const Incidentes = () => {
    const router = useRouter();
    const [solicitacoes, setSolicitacoes] = useState<HelpRequest[]>([]);
    const [erro, setErro] = useState("");
    const [verificandoLogin, setVerificandoLogin] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("authToken");

        if (!token) {
            const redirectTo = window.location.pathname;
            router.push(`/login?redirect=${encodeURIComponent(redirectTo)}`);
            return;
        } else {
            setVerificandoLogin(false);
        }
    }, [router]);

    useEffect(() => {
        const fetchSolicitacoes = async () => {
            try {
                const response = await fetch(`${API_BASE}/incidentes`, {
                    headers: getHeaders(),
                });

                if (!response.ok) {
                    throw new Error("Erro ao buscar solicitações.");
                }

                const data: HelpRequest[] = await response.json();

                const dadosComEndereco = await Promise.all(
                    data.map(async (item) => {
                        if (item.cep) {
                            const endereco = await buscarEnderecoPorCep(item.cep);
                            return { ...item, enderecoAproximado: endereco };
                        }
                        return { ...item, enderecoAproximado: null };
                    })
                );

                dadosComEndereco.sort((a, b) => {
                    const dateA = a.requestTimestamp ? new Date(a.requestTimestamp).getTime() : 0;
                    const dateB = b.requestTimestamp ? new Date(b.requestTimestamp).getTime() : 0;
                    return dateB - dateA;
                });

                setSolicitacoes(dadosComEndereco);
            } catch (err) {
                setErro("Erro ao carregar dados da API.");
            }
        };

        fetchSolicitacoes();
    }, [router]);

    const extrairCep = (cep: string | null) => cep || "Não informado";

    if (verificandoLogin) {
        return (
            <>
            </>
        );
    }

    return (
        <section className="section-conteudo">
            <h1>Incidentes</h1>

            {erro && <p className="text-red-500 mt-2">{erro}</p>}

            {solicitacoes.length === 0 && !erro ? (
                <p className="mt-4">Nenhuma solicitação encontrada.</p>
            ) : (
                <ul className="mt-4 space-y-10 w-3/4">
                    {solicitacoes.map((item, index) => (
                        <li
                            key={item.id ?? `${item.cep ?? "semcep"}-${index}`}
                            className="border-2 border-blue-500 bg-blue-50 rounded-md p-4"
                        >
                            <p><strong>CEP:</strong> {extrairCep(item.cep)}</p>
                            <p>
                                <strong>Endereço:</strong>{" "}
                                {item.enderecoAproximado ? (
                                    <a
                                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                                            item.enderecoAproximado
                                        )}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 underline"
                                    >
                                        {item.enderecoAproximado}
                                    </a>
                                ) : (
                                    "Não informado"
                                )}
                            </p>
                            <p><strong>Telefone:</strong> {item.contactInfo}</p>
                            <p><strong>Descrição:</strong> {item.notes}</p>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
};

export default Incidentes;
