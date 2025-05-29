"use client";
import { useRef, useState } from "react";

const faq = () => {
    const [perguntasAbertas, setPerguntasAbertas] = useState<{ [key: number]: boolean }>({});

    const togglePergunta = (index: number) => {
        setPerguntasAbertas(prev => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    const dadosFAQ = [
        {
            pergunta: "Pergunta 1",
            resposta: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus sapiente odio at dolores iure consequatur! Ullam porro maxime omnis hic rem voluptatem. Mollitia veniam vitae tenetur consectetur libero adipisci. Tempora?",
        },
        {
            pergunta: "Pergunta 2",
            resposta: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus sapiente odio at dolores iure consequatur! Ullam porro maxime omnis hic rem voluptatem. Mollitia veniam vitae tenetur consectetur libero adipisci. Tempora?",
        },
        {
            pergunta: "Pergunta 3",
            resposta: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus sapiente odio at dolores iure consequatur! Ullam porro maxime omnis hic rem voluptatem. Mollitia veniam vitae tenetur consectetur libero adipisci. Tempora?",
        }
    ];

    const refs = useRef<{ [key: number]: HTMLDivElement | null }>({});

    return (
        <>
            <section className="section-conteudo">
                <h1>FAQ</h1>

                <div className="space-y-4 w-11/12">
                    {dadosFAQ.map((item, index) => (
                        <div key={index} className="bg-blue-50 border border-blue-500 rounded-lg shadow-sm">
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
        </>
    );
};

export default faq;