'use client'

import { useState } from "react";
import Botao from "../components/botao/botao";
type HelpRequestDTO = {
    localizacao: string;
    descricao: string;
    telefone: string;
};

const solicitarAjudar = () => {
    const [formData, setFormData] = useState<HelpRequestDTO>({
        localizacao: '',
        descricao: '',
        telefone: ''
    });

    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/api/help', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) throw new Error('Erro ao enviar solicitação.');

            const data = await response.json();
            setMessage(`Pedido registrado com sucesso! ID: ${data.id}`);
        } catch (error: any) {
            setMessage(`Erro: ${error.message}`);
        }
    };

    return (
        <>
            <section className="section-conteudo">
                <h1>Solicitar Ajudar</h1>
                <p className="mx-4 mb-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci optio quisquam aut architecto iusto harum sequi rem quis modi, sapiente voluptate minus dolorum. Voluptas doloremque iure animi doloribus officia veniam!</p>
                <form className="w-full max-w-md border-2 rounded-md bg-blue-100" onSubmit={handleSubmit}>
                    <div className="flex flex-col items-center">
                        <label htmlFor="titulo" className="mt-4">Titulo:</label>
                        <input
                            type="text"
                            id="titulo"
                            name="titulo"
                            className={`p-2 text-black rounded-md w-11/12 bg-white mx-auto border-2`}
                        />

                        <label htmlFor="tel" className="mt-4">Telefone:</label>
                        <input
                            type="tel"
                            id="tel"
                            name="tel"
                            className={`p-2 text-black rounded-md w-11/12 bg-white mx-auto border-2`}
                        />

                        <label htmlFor="descricao" className="mt-4">Descrição:</label>
                        <textarea
                            id="descricao"
                            name="descricao"
                            className={`p-2 text-black rounded-md w-11/12 h-36 resize-none bg-white mx-auto border-2`}
                        />
                        <Botao texto="Enviar" />
                    </div>
                </form>
            </section>
        </>
    )
}

export default solicitarAjudar;