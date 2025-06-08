import React from "react";

type BotaoProps = {
    type?: "button" | "submit";
    carregando?: boolean;
    texto?: string;
    onClick?: () => void;
}

const Botao: React.FC<BotaoProps> = ({
    type = "button",
    carregando = false,
    texto = "",
    onClick
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`bg-blue-500 font-bold text-white border border-blue-600 rounded-md py-3 m-4 cursor-pointer w-64 transition-colors duration-300 hover:bg-blue-600 ${carregando ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={carregando}
        >
            {carregando ? "Carregando..." : texto}
        </button>
    );
}

export default Botao;