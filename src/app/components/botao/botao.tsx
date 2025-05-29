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
            <button type={type} className="bg-blue-600 font-bold text-white border border-blue-800 rounded-md py-3 m-1.5 cursor-pointer w-[90px] h-[90px] transition-colors duration-300 hover:bg-blue-700 sm:m-2 sm:w-24 sm:h-24 md:w-28 md:h-28">
                {texto}
            </button>
        </>
    )
}

export default Botao;