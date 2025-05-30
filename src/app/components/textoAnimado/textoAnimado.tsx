'use client'

import { TypeAnimation } from "react-type-animation";

export default function TextoAnimado() {
    return (
        <TypeAnimation
            sequence={[
                'Olá, Tudo bem?', 3000,
                'Como posso ajudar?', 3000,
            ]}
            wrapper="span"
            speed={60}
            style={{ display: 'inline-block', color: 'black' }}
            repeat={Infinity}
        />
    );
}