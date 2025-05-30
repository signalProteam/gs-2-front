import Link from "next/link";
import TextoAnimado from "./components/textoAnimado/textoAnimado";
import BotaoBalao from "./components/botaoBalao/botaoBalao";
import Botao from "./components/botao/botao";

export default function Home() {
    return (
        <>
            <main>
                <section className="section-conteudo">
                    <h1><TextoAnimado /></h1>

                    {/* Botões */}
                    <div className="grid grid-cols-2 gap-x-4 justify-items-center sm:flex sm:flex-row  sm:items-center sm:gap-0">
                        <Link href="/faq">
                            <BotaoBalao texto="FAQ" />
                        </Link>

                        <Link href="/ajudaChat">
                            <BotaoBalao texto="Chat" />
                        </Link>

                        <Link href="/solicitarAjuda">
                            <BotaoBalao texto="Solicitar Ajuda" />
                        </Link>

                        <Link href="/incidentes">
                            <BotaoBalao texto="Incidentes" />
                        </Link>
                    </div>

                    <div className="mt-10 flex ml-10 sm:flex-row flex-col items-center">
                        <Link href="/apoiar">
                            <Botao texto="Apoiar" />
                        </Link>

                        <Link href="/">
                            <Botao texto="Teste" />
                        </Link>
                    </div>
                </section>

                <section className="section-conteudo">
                    <h2>Sobre</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus aperiam, id natus eveniet dolores porro? Alias ab ea ducimus assumenda laboriosam maiores consequuntur dolore placeat necessitatibus! Eaque, hic. Explicabo, minus.</p>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus sint animi modi quas quidem in ad, dolor sunt quae placeat adipisci cumque obcaecati illum, explicabo et quos excepturi amet vero!</p>
                </section>
            </main>
        </>
    );
}
