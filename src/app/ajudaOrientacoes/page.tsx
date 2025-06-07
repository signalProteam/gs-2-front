"use client";
import { useRef, useState } from "react";

const AjudaOrientacoes = () => {
    const [perguntasAbertas, setPerguntasAbertas] = useState<{ [key: number]: boolean }>({});

    const togglePergunta = (index: number) => {
        setPerguntasAbertas(prev => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    const dados = [
        {
            pergunta: "O que fazer para manter a calma durante um desastre?",
            resposta:
                "Respire profundamente, inspire pelo nariz contando até 4 e expire pela boca contando até 6. Repita até sentir que sua respiração está mais tranquila. Focar na respiração ajuda a controlar o medo e a ansiedade.",
        },
        {
            pergunta: "Como agir se eu estiver em um local perigoso?",
            resposta:
                "Procure um lugar seguro, longe de objetos que possam cair ou causar ferimentos. Evite lugares fechados que possam prender você. Mantenha-se em grupo se possível e siga as instruções das autoridades locais.",
        },
        {
            pergunta: "Como posso ajudar outras pessoas sem me colocar em risco?",
            resposta:
                "Ofereça apoio verbal para tranquilizar, oriente para o local seguro e, se possível, ajude pessoas com mobilidade reduzida a se locomoverem com segurança. Mas nunca coloque sua própria segurança em risco para ajudar.",
        },
        {
            pergunta: "O que fazer se eu começar a sentir pânico?",
            resposta:
                "Pare por um momento, tente sentar ou se apoiar em algo firme. Use a técnica de respiração profunda e concentre-se em coisas ao seu redor, como sons ou objetos, para ancorar sua mente no presente e diminuir o pânico.",
        },
        {
            pergunta: "Como posso evitar o desespero em uma situação de risco?",
            resposta:
                "Lembre-se que o desespero pode atrapalhar suas ações. Fale consigo mesmo de forma calma, repetindo frases como ‘Eu estou seguro’, ‘Eu sei o que fazer’. Mantenha a atenção no que você pode controlar e dê um passo de cada vez.",
        },
        {
            pergunta: "Quais são os sinais para saber se devo evacuar imediatamente?",
            resposta:
                "Se ouvir alertas oficiais, perceber fumaça, fogo, inundações ou estruturas instáveis, não espere — saia rapidamente para um local seguro. Nunca retorne para pegar objetos pessoais enquanto o risco persistir.",
        },
    ];

    const refs = useRef<{ [key: number]: HTMLDivElement | null }>({});

    return (
        <>
            <main>
                <section className="section-conteudo">
                    <h1>Ajuda e Orientações</h1>

                    <div className="space-y-4 w-11/12">
                        {dados.map((item, index) => (
                            <div key={index} className="border-2 border-blue-500 rounded-lg shadow-sm">
                                <button
                                    onClick={() => togglePergunta(index)}
                                    className="font-bold p-4 w-full flex justify-between cursor-pointer"
                                >
                                    {item.pergunta}
                                    <span>{perguntasAbertas[index] ? '−' : '+'}</span>
                                </button>
                                <div
                                    ref={el => {
                                        refs.current[index] = el;
                                    }}
                                    style={{
                                        maxHeight: perguntasAbertas[index]
                                            ? (refs.current[index]?.scrollHeight ?? 0) + "px"
                                            : "0px",
                                        overflow: "hidden",
                                        transition: "max-height 0.4s ease",
                                    }}
                                >
                                    <p className="p-4">{item.resposta}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </>
    );
};

export default AjudaOrientacoes;