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

const CompIntegrante = ({ nome, rm, turma, foto, linkedin }: Props) => {
    return (
        <article className="mb-5 border-4 border-blue-600 p-4 sm:p-4 md:p-5 text-center">
            <Image
                src={foto}
                alt={`Foto do integrante ${nome}`}
                width={500}
                height={500}
                className="aspect-square mx-auto rounded-md w-56 h-56 sm:w-60 sm:h-60 md:w-64 md:h-64 max-w-full max-h-full"
            />
            <p className="mb-2.5 text-xl font-semibold mt-3">{nome}</p>
            <p className="mb-2.5">RM: {rm}</p>
            <p className="mb-2.5">Turma: {turma}</p>
            <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 text-5xl hover:text-blue-800 transition mt-2 inline-block"
            >
                <FaLinkedin />
            </a>
        </article>
    )
}

export default CompIntegrante