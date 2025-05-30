import React from "react";

type BotaoProps = {
    type?: "button" | "submit";
    texto?: string;
}

const BotaoBalao: React.FC<BotaoProps> = ({
    type = "button",
    texto = ""
}) => {
    return (
        <>
            <button type={type} className="relative bg-blue-500 text-white font-bold p-4 rounded-lg w-32 h-32 m-4 transition-colors duration-300 hover:bg-blue-600">
                {texto}
                <div className="absolute bottom-0 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-blue-500 translate-y-full"></div>
            </button>
        </>
    )
}

export default BotaoBalao;