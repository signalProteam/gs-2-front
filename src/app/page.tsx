import Link from "next/link";
import Botao from "./components/botao/botao";

export default function Home() {
    return (
        <>
            <main>
                <section className="section-conteudo">
                    <h1>Como posso ajudar?</h1>
                    {/* Botões */}
                    <div className="flex flex-row">
                        <Link href="/faq">
                            <Botao texto="FAQ" />
                        </Link>

                        <Link href="/ajudaChat">
                            <Botao texto="Chat" />
                        </Link>

                        <Link href="/pagEmail">
                            <Botao texto="E-Mail" />
                        </Link>
                    </div>
                </section>

                <section className="section-conteudo">
                    <h2>Lorem</h2>
                    <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus aperiam, id natus eveniet dolores porro? Alias ab ea ducimus assumenda laboriosam maiores consequuntur dolore placeat necessitatibus! Eaque, hic. Explicabo, minus.</p>
                </section>
            </main>
        </>
    );
}
