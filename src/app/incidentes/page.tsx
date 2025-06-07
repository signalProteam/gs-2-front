"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { API_BASE, getHeaders } from "../services/api";
import Link from "next/link";
import Botao from "../components/botao/botao";

type HelpRequest = {
    id: number;
    cep: string;
    contactInfo: string;
    notes: string;
    enderecoAproximado?: string | null;
    latitude: number;
    longitude: number;
    status: "PENDENTE" | "EM_ANDAMENTO" | "CONCLUIDO";
};

const buscarEnderecoPorCep = async (cep: string): Promise<string | null> => {
    try {
        const res = await fetch(`https://viacep.com.br/ws/${cep.replace(/\D/g, "")}/json/`);
        if (!res.ok) throw new Error("Erro ao buscar CEP");
        const data = await res.json();
        if (data.erro) return null;
        return `${data.logradouro || ""}, ${data.bairro || ""}, ${data.localidade || ""} - ${data.uf || ""
            }`
            .replace(/^(, )+|(, )+$/g, "")
            .trim();
    } catch {
        return null;
    }
};

const Incidentes = () => {
    const router = useRouter();
    const [solicitacoes, setSolicitacoes] = useState<HelpRequest[]>([]);
    const [erro, setErro] = useState("");
    const [verificandoLogin, setVerificandoLogin] = useState(true);
    const [carregandoId, setCarregandoId] = useState<number | null>(null);

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

    const fetchSolicitacoes = async () => {
        try {
            const response = await fetch(`${API_BASE}/incidentes`, {
                headers: getHeaders(),
            });

            if (response.status === 204) {
                setSolicitacoes([]);
                setErro("");
                return;
            }

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

            setSolicitacoes(dadosComEndereco);
            setErro("");
        } catch (err) {
            console.error(err);
            setErro("Erro ao carregar dados da API.");
        }
    };


    useEffect(() => {
        fetchSolicitacoes();
    }, []);

    if (verificandoLogin) {
        return <></>;
    }

    const formatarStatus = (status: HelpRequest["status"]) => {
        switch (status) {
            case "PENDENTE":
                return "Pendente";
            case "EM_ANDAMENTO":
                return "Em andamento";
            case "CONCLUIDO":
                return "Concluído";
            default:
                return status;
        }
    };


    const atualizarStatusIncidente = async (id: number) => {
        setCarregandoId(id);
        try {
            const response = await fetch(`${API_BASE}/incidentes/${id}`, {
                method: "PUT",
                headers: getHeaders(),
            });

            if (!response.ok) {
                const textoErro = await response.text();
                throw new Error(`Status ${response.status}: ${textoErro}`);
            }

            setSolicitacoes((prev) => {
                const atualizados = prev.map((item) => {
                    if (item.id === id) {
                        if (item.status === "PENDENTE") {
                            return { ...item, status: "EM_ANDAMENTO" as const };
                        } else if (item.status === "EM_ANDAMENTO") {
                            return { ...item, status: "CONCLUIDO" as const };
                        }
                    }
                    return item;
                });

                const filtrados = atualizados.filter((item) => item.status !== "CONCLUIDO");

                return filtrados;
            });


        } catch (error) {
            const mensagemErro =
                error instanceof Error ? error.message : "erro desconhecido";
            alert("Erro ao atualizar status do incidente: " + mensagemErro);
        } finally {
            setCarregandoId(null);
        }
    };

    return (
        <section className="section-conteudo">
            <h1>Incidentes</h1>

            {erro && <p className="text-red-500 mt-2">{erro}</p>}

            {solicitacoes.length === 0 && !erro ? (
                <p className="mt-4">Nenhuma solicitação encontrada.</p>
            ) : (
                <ul className="mt-4 space-y-10 w-3/4">
                    {solicitacoes.map((item) => (
                        <li
                            key={item.id}
                            className="border-2 border-blue-500 bg-blue-50 rounded-md p-4"
                        >
                            <p>
                                <strong>CEP:</strong> {item.cep}
                            </p>
                            <p>
                                <strong>Endereço:</strong>{" "}
                                {item.enderecoAproximado ? (
                                    <Link
                                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                                            item.enderecoAproximado
                                        )}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 underline"
                                    >
                                        {item.enderecoAproximado}
                                    </Link>
                                ) : (
                                    "Não informado"
                                )}
                            </p>
                            <p>
                                <strong>Telefone:</strong> {item.contactInfo}
                            </p>
                            <p>
                                <strong>Descrição:</strong> {item.notes}
                            </p>
                            <p>
                                <strong>Status:</strong> {formatarStatus(item.status)}
                            </p>


                            {item.status !== "CONCLUIDO" && (
                                <div className="flex justify-center mt-4">
                                    <Botao
                                        texto={
                                            item.status === "PENDENTE"
                                                ? "Iniciar Atendimento"
                                                : "Finalizar Incidente"
                                        }
                                        carregando={carregandoId === item.id}
                                        type="button"
                                        onClick={() => atualizarStatusIncidente(item.id)}
                                    />
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
};

export default Incidentes;