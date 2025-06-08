import Link from "next/link";
import TextoAnimado from "./components/textoAnimado/textoAnimado";
import BotaoBalao from "./components/botaoBalao/botaoBalao";

export default function Home() {
    return (
        <>
            <main>
                <section className="section-conteudo">
                    <h1><TextoAnimado /></h1>

                    {/* Botões */}
                    <div className="flex-col text-center gap-x-4 justify-items-center sm:flex sm:flex-row  sm:items-center sm:gap-0">
                        <Link href="/solicitarAjuda">
                            <BotaoBalao texto="Solicitar Ajuda" />
                        </Link>

                        <Link href="/ajudaOrientacoes">
                            <BotaoBalao texto="Ajuda e Orientações" />
                        </Link>

                        <Link href="/incidentes">
                            <BotaoBalao texto="Incidentes" />
                        </Link>
                    </div>
                </section>

                <section className="section-conteudo">
                    <h2>Sobre</h2>
                    <p>
                        O <strong>VOZ (Voz de Orientação e Zelo)</strong> é um projeto dedicado a apoiar pessoas em situações de desastre e pós-desastre, com foco especial no bem-estar psicológico de cada indivíduo afetado.
                    </p>
                    <p>
                        Sabemos que momentos de crise podem gerar medo, insegurança e desorientação. Por isso, o VOZ oferece orientações práticas e acolhimento emocional para ajudar cada pessoa a se manter firme, informada e amparada.
                    </p>
                    <p>
                        Nosso objetivo é oferecer uma voz amiga e confiável em tempos difíceis — promovendo calma, segurança e esperança, mesmo nos cenários mais desafiadores.
                    </p>
                </section>

            </main>
        </>
    );
}
