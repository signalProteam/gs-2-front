import { FaGithub } from "react-icons/fa";
import CompIntegrante from "../components/compIntegrante/compIntegrante";

const Integrantes = () => {

    return (
        <>
            <main>
                <section className="section-conteudo">
                    <h1>
                        Conheça nossa equipe
                    </h1>

                    <div>
                        <CompIntegrante
                            nome="Eduardo Osterloh Bindo"
                            rm="559755"
                            turma="1TDSPA"
                            foto="/images/foto-eduardo.jpg"
                            linkedin="https://www.linkedin.com/in/eduardo-osterloh-bindo-500b02268/"
                        />

                        <CompIntegrante
                            nome="Lucas José Lima"
                            rm="561160"
                            turma="1TDSPA"
                            foto="/images/foto-lucas.jpg"
                            linkedin="https://www.linkedin.com/in/lucasjos%C3%A9lima/"
                        />

                        <CompIntegrante
                            nome="Rangel Bernardi Jordão"
                            rm="560547"
                            turma="1TDSPA"
                            foto="/images/foto-rangel.jpg"
                            linkedin="https://www.linkedin.com/in/rangel-bernardi-jord%C3%A3o-819334234/"
                        />
                    </div>

                    <h2 className="text-2xl font-semibold mt-10">
                        GitHub da equipe
                    </h2>
                    <a
                        href="https://github.com/signalProteam"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-800 text-5xl hover:text-black transition inline-block mt-2"
                    >
                        <FaGithub />
                    </a>
                </section>
            </main>
        </>
    );
};

export default Integrantes;