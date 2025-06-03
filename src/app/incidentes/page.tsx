"use client"

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Incidentes = () => {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("authToken");

        if (!token) {
            router.push("/login");
            return;
        }
    }, [router]);


    return (
        <>
            <section className="section-conteudo">
                <h1>Incidentes</h1>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Esse, ipsa alias! Eum enim, qui quia sequi aliquid totam provident consectetur fugit dolor, magni quam dolorum repudiandae cumque velit? Quod, nobis.</p>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione voluptas earum, iusto est iure totam veritatis nulla dolor delectus officiis ducimus impedit perferendis tenetur, cum vero excepturi maxime. Illo, dolores.</p>
            </section>
        </>
    )
}

export default Incidentes;