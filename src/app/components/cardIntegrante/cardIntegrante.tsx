'use client'

import Image from 'next/image'
import { FaLinkedin } from 'react-icons/fa'

type Props = {
    nome: string
    rm: string
    turma: string
    foto: string
    linkedin: string
}

const CardIntegrante = ({ nome, rm, turma, foto, linkedin }: Props) => {
    return (
        <article className="mb-8 border-4 border-blue-600 p-4 text-center rounded-2xl shadow-md transition hover:shadow-lg">
            <Image
                src={foto}
                alt={`Foto do integrante ${nome}`}
                width={500}
                height={500}
                className="aspect-square mx-auto rounded-xl shadow w-56 h-56 sm:w-60 sm:h-60 md:w-64 md:h-64 object-cover"
            />
            <p className="text-xl sm:text-2xl font-bold mt-4">
                {nome}
            </p>
            <p>RM: {rm}</p>
            <p className=" mb-3">Turma: {turma}</p>
            <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 text-5xl hover:scale-110 hover:text-blue-800 transition duration-200 inline-block"
            >
                <FaLinkedin />
            </a>
        </article>
    )
}

export default CardIntegrante
