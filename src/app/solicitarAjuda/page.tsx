"use client";

import { useState } from "react";
import Botao from "@/app/components/botao/botao";
import { API_BASE, getHeaders } from "@/app/services/api";

const SolicitarAjuda = () => {

    const [formData, setFormData] = useState({
        cep: "",
        contactInfo: "",
        notes: "",
    });

    const [errors, setErrors] = useState({
        cep: "",
        contactInfo: "",
        notes: "",
    });

    const [message, setMessage] = useState("");

    const formatCep = (value: string) => {
        return value
            .replace(/\D/g, "")
            .replace(/^(\d{5})(\d{0,3})/, "$1-$2")
            .slice(0, 9);
    };

    const formatTelefone = (value: string) => {
        return value
            .replace(/\D/g, "")
            .replace(/^(\d{2})(\d{0,5})(\d{0,4})/, "($1) $2-$3")
            .slice(0, 15);
    };

    const validarCampos = () => {
        const cepRegex = /^\d{5}-\d{3}$/;
        const telefoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;

        const novosErros = {
            cep: formData.cep.trim() === ""
                ? "Informe o CEP"
                : !cepRegex.test(formData.cep)
                    ? "CEP inválido"
                    : "",

            contactInfo: formData.contactInfo.trim() === ""
                ? "Informe o telefone"
                : !telefoneRegex.test(formData.contactInfo)
                    ? "Telefone inválido"
                    : "",

            notes: formData.notes.trim() === ""
                ? "Informe a descrição"
                : "",
        };

        setErrors(novosErros);
        return !Object.values(novosErros).some((erro) => erro !== "");
    };

    const verificarCepExiste = async (cep: string): Promise<boolean> => {
        try {
            const res = await fetch(`https://viacep.com.br/ws/${cep.replace(/\D/g, "")}/json/`);
            if (!res.ok) return false;
            const data = await res.json();
            return !data.erro;
        } catch {
            return false;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");

        if (!validarCampos()) return;

        // Verifica se o CEP existe antes de enviar
        const cepValido = await verificarCepExiste(formData.cep);
        if (!cepValido) {
            setErrors(prev => ({ ...prev, cep: "CEP não encontrado." }));
            return;
        } else {
            setErrors(prev => ({ ...prev, cep: "" }));
        }

        try {
            const resposta = await fetch(`${API_BASE}/solicitar-ajuda`, {
                method: "POST",
                headers: getHeaders(),
                body: JSON.stringify(formData),
            });

            if (resposta.ok) {
                setMessage("Solicitação enviada com sucesso!");
                setFormData({ cep: "", contactInfo: "", notes: "" });
                setErrors({ cep: "", contactInfo: "", notes: "" });
            } else {
                setMessage("Erro ao enviar a solicitação.");
            }
        } catch (error) {
            setMessage("Erro ao conectar com o servidor.");
        }
    };


    return (
        <section className="section-conteudo">
            <h1 className="text-3xl font-bold text-center mb-4">Solicitar Ajuda</h1>
            <form
                className="w-full max-w-md border-2 rounded-md bg-blue-100 text-center mx-auto p-4"
                onSubmit={handleSubmit}
            >
                <div className="flex flex-col items-center">
                    <label htmlFor="cep" className="mt-4">CEP:</label>
                    <input
                        type="text"
                        id="cep"
                        maxLength={9}
                        value={formData.cep}
                        onChange={(e) =>
                            setFormData({ ...formData, cep: formatCep(e.target.value) })
                        }
                        className={`p-2 rounded-md w-11/12 bg-white mx-auto border ${errors.cep ? "border-red-500" : "border-blue-500"}`}
                        placeholder="00000-000"
                    />
                    {errors.cep && <p className="text-red-500 mt-1">{errors.cep}</p>}

                    <label htmlFor="contactInfo" className="mt-4">Telefone:</label>
                    <input
                        type="text"
                        id="contactInfo"
                        maxLength={15}
                        value={formData.contactInfo}
                        onChange={(e) =>
                            setFormData({ ...formData, contactInfo: formatTelefone(e.target.value) })
                        }
                        className={`p-2 rounded-md w-11/12 bg-white mx-auto border ${errors.contactInfo ? "border-red-500" : "border-blue-500"}`}
                        placeholder="(00) 00000-0000"
                    />
                    {errors.contactInfo && <p className="text-red-500 mt-1">{errors.contactInfo}</p>}

                    <label htmlFor="notes" className="mt-4">Descrição:</label>
                    <textarea
                        id="notes"
                        value={formData.notes}
                        onChange={(e) =>
                            setFormData({ ...formData, notes: e.target.value })
                        }
                        className={`p-2 rounded-md w-11/12 h-36 resize-none bg-white mx-auto border ${errors.notes ? "border-red-500" : "border-blue-500"}`}
                        placeholder="Descreva sua situação."
                    />
                    {errors.notes && <p className="text-red-500 mt-1">{errors.notes}</p>}

                    <Botao type="submit" texto="Enviar" />
                </div>
            </form>

            {message && (
                <p className={`mt-4 text-center font-semibold ${message.startsWith("Erro") ? "text-red-500" : "text-blue-500"}`}>
                    {message}
                </p>
            )}
        </section>
    );
};

export default SolicitarAjuda;