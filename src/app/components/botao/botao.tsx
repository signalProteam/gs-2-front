import React from "react";

type BotaoProps = {
    type?: "button" | "submit";
    texto?: string;
}

const Botao: React.FC<BotaoProps> = ({
    type = "button",
    texto = ""
}) => {
    return (
        <>
            <button type={type} className="bg-blue-500 font-bold text-white border border-blue-600 rounded-md py-3 m-4 cursor-pointer w-64 max-w-3/4 transition-colors duration-300 hover:bg-blue-600">
                {texto}
            </button >
        </>
    )
}

export default Botao;