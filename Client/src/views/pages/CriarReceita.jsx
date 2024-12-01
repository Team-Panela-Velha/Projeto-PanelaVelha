import React, { useState } from "react";

const CriarReceita = () => {
    const [formReceita, setFormReceita] = useState({
        titulo: "",
        descricao: "",
        imagemReceita: "",
        numeroPessoas: "",
        categoria: "",

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
        <div className="w-full flex justify-center items-center">
            <div className="flex flex-col w-[85%]">

                <div className="flex flex-col mt-10">
                    <h1 className="font-bold text-jet text-6xl text-center">Envie sua Receita</h1>
                    <form
                        onSubmit={handleSubmit}
                        className="w-full h-auto mt-10 bg-red-100"
                    >

                        <div className="flex justify-center items-center flex-col mt-10">
                            <label className="w-[50%] px-3 mb-1 mt-2 font-semibold text-gray-700">Título</label>
                            <input
                                type="text"
                                id="titulo"
                                name="titulo"
                                value={formReceita.titulo}
                                onChange={handleChange}
                                className="bg-transparent mt-1 block w-[50%] h-10 px-3  border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-redwood focus:border-redwood placeholder:text-gray-500 placeholder:text-sm"
                                placeholder="Título da Receita"
                                required
                            />
                        </div>
                        <div className="flex justify-center items-center flex-col">
                            <label className="w-[50%] px-3 mb-1 mt-2 font-semibold text-gray-700">Descrição</label>
                            <textarea
                                id="descricao"
                                name="descricao"
                                value={formReceita.descricao}
                                onChange={handleChange}
                                className="bg-transparent block w-[50%] h-32 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-redwood focus:border-redwood placeholder:text-gray-500 placeholder:text-sm"
                                placeholder="Descreva sua Receita"
                                required
                            ></textarea>
                        </div>

                        <div className="flex justify-center items-center flex-col">
                            <label className="w-[50%] px-3 mb-1 mt-2 font-semibold text-gray-700">Imagem</label>
                            <input
                                type="text"
                                id="imagem"
                                name="imagem"
                                value={formReceita.imagem}
                                onChange={handleChange}
                                className="bg-transparent block w-[50%] h-10 px-3  border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-redwood focus:border-redwood placeholder:text-gray-500 placeholder:text-sm"
                                placeholder="Cole a URL da imagem aki"
                                required
                            />
                        </div>
                    </form>
                </div>





            </div>
        </div>
    );
};

export default CriarReceita;
