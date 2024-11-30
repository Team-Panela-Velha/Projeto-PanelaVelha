import React, { useState } from "react";

const CriarReceita = () => {
    const [formReceita, setFormReceita] = useState({
        titulo: "",
        descricao: "",
        imagemReceita: "", // Armazena a URL da imagem
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormReceita({ ...formReceita, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica para enviar a receita (API ou outra ação)
        console.log("Receita Enviada:", formReceita);
    };

    return (
        <div className="flex flex-col pr-[1%] w-full justify-center items-center">
            <h1 className="text-5xl text-jet m-5 font-bold text-center">Envie sua Receita</h1>
            <div className="w-full">
            <form   
                onSubmit={handleSubmit}
                className="w-full h-full border-redwood bg-red-100 p-6"
            >
                <div className="flex flex-col justify-center items-center">
                <div className="m-1 w-[50%]">
                    <label className="block text-lg font-semibold text-jet mb-1">
                        Título
                    </label>
                    <input
                        type="text"
                        name="titulo"
                        value={formReceita.titulo}
                        onChange={handleChange}
                        className="w-full p-2 border border-redwood bg-transparent rounded"
                        placeholder="Digite o título da receita"
                        required
                    />
                </div>

                <div className="m-1 w-[50%]">
                    <label className="block text-lg font-semibold text-jet mb-1">
                        Descrição
                    </label>
                    <textarea
                        name="descricao"
                        value={formReceita.descricao}
                        onChange={handleChange}
                        className="w-full p-2 h-36 border border-redwood bg-transparent rounded"
                        placeholder="Descreva sua receita"
                        required
                    ></textarea>
                </div>

                <div className="m-1 w-[50%]">
                    <label className="block text-lg font-semibold text-jet mb-1">
                        URL da Imagem
                    </label>
                    <input
                        type="text"
                        name="imagemReceita"
                        value={formReceita.imagemReceita}
                        onChange={handleChange}
                        className="w-full p-2 border border-redwood bg-transparent rounded"
                        placeholder="Cole a URL da imagem"
                        required
                    />
                </div>

                <div className="m-1 w-[30%]">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
                    >
                        Enviar Receita
                    </button>
                </div>
                </div>
                <div>
                    <div>
                        <h1>Informacoes chave</h1>
                    </div>
                    <div>
                        Ingredientes
                    </div>
                </div>
            </form>
            </div>
        </div>
    );
};

export default CriarReceita;
