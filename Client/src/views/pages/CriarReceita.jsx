import React, { useState } from "react";

const CriarReceita = () => {
    const [formReceita, setFormReceita] = useState({
        titulo: "",
        descricao: "",
        imagemReceita: "",
        numeroPessoas: "",
        categoria: "",
        ingredientes: "",
        dificuldade: "", // Armazena o nível de dificuldade
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormReceita({ ...formReceita, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Receita Enviada:", formReceita);
    };

    

    
    
    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div className="flex flex-col w-[85%]">
                <div className="flex flex-col mt-10">
                    <h1 className="font-bold text-jet text-6xl text-center">Envie sua Receita</h1>
                    <form
                        onSubmit={handleSubmit}
                        className="w-full h-auto mt-10 bg-red-100"
                    >
                        <div className="flex justify-center items-center flex-col mt-10">
                            <label className="w-[50%] px-3 mb-1 mt-2 font-semibold text-gray-700">
                                Título
                            </label>
                            <input
                                type="text"
                                id="titulo"
                                name="titulo"
                                value={formReceita.titulo}
                                onChange={handleChange}
                                className="bg-transparent mt-1 block w-[50%] h-10 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-redwood focus:border-redwood placeholder:text-gray-500 placeholder:text-sm"
                                placeholder="Título da Receita"
                                required
                            />
                        </div>
                        <div className="flex justify-center items-center flex-col">
                            <label className="w-[50%] px-3 mb-1 mt-2 font-semibold text-gray-700">
                                Descrição
                            </label>
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
                        <div className="flex justify-center items-center flex-col mb-10">
                            <label className="w-[50%] px-3 mb-1 mt-2 font-semibold text-gray-700">
                                Imagem
                            </label>
                            <input
                                type="url"
                                id="imagemReceita"
                                name="imagemReceita"
                                value={formReceita.imagemReceita}
                                onChange={handleChange}
                                className="bg-transparent block w-[50%] h-10 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-redwood focus:border-redwood placeholder:text-gray-500 placeholder:text-sm"
                                placeholder="https://example.com"
                                required
                            />
                        </div>
                        <div className="flex w-full justify-center items-center">
                            <div className="bg-yellow-200 p-2 w-[40%]">
                                <h2 className="uppercase font-bold text-redwood text-2xl pb-5">
                                    Informações Chaves
                                </h2>
                                <div className="m-6 w-[30%]">
                                <fieldset>
                                <legend className="font-semibold text-chocolate-cosmos pb-1">
                                    <h2>Dificuldade*</h2>
                                </legend>
                                <select
                                            id="dificuldade"
                                            name="dificuldade"
                                            required
                                            onChange={handleChange}
                                            value={formReceita.dificuldade}
                                            className="w-28 text-xs p-1 text-jet border border-collapse border-gray-300 focus:ring-redwood focus:border-redwood focus:outline-none"
                                        >
                                            <option value="MuitoFacil">Muito Facíl</option>
                                            <option value="Facil">Facíl</option>
                                            <option value="Medio">Médio</option>
                                            <option value="Dificil">Díficil</option>
                                            <option value="MuitoDificil">Muito Díficil</option>
                                        </select>
                                </fieldset>
                                
                                
                            </div>
                            </div>
                            <div className="w-[60%] p-2">
                                <h2 className="uppercase font-bold text-redwood text-2xl pb-5">
                                    Ingredientes
                                </h2>
                                <fieldset className="mb-10">
                                    <div className="h-6">
                                        <legend className="font-semibold text-chocolate-cosmos pb-1">
                                            Número de pessoas ou porções*
                                        </legend>
                                        <input
                                            type="number"
                                            id="numeroPessoas"
                                            name="numeroPessoas"
                                            required
                                            value={formReceita.numeroPessoas}
                                            onChange={handleChange}
                                            className="w-14 h-full text-sm p-1 text-jet border border-collapse border-gray-300 focus:ring-redwood focus:outline-none"
                                        />
                                        <select
                                            id="categoria"
                                            name="categoria"
                                            required
                                            onChange={handleChange}
                                            value={formReceita.categoria}
                                            className="h-full text-xs p-1 text-jet border border-collapse border-gray-300 focus:ring-redwood focus:border-redwood focus:outline-none"
                                        >
                                            <option value="">Selecione</option>
                                            <option value="Porção">Porção</option>
                                            <option value="Pratos">Prato(s)</option>
                                            <option value="Pedaços">Pedaço(s)</option>
                                            <option value="Fatias">Fatia(s)</option>
                                            <option value="Pessoas">Pessoa(s)</option>
                                        </select>
                                    </div>
                                </fieldset>
                                <fieldset>
                                    <legend className="font-semibold text-chocolate-cosmos pb-1">
                                        Ingredientes*
                                    </legend>
                                    <textarea
                                        id="ingredientes"
                                        name="ingredientes"
                                        value={formReceita.ingredientes}
                                        onChange={handleChange}
                                        className="bg-transparent block w-full h-32 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-redwood focus:border-redwood placeholder:text-gray-500 placeholder:text-sm"
                                        placeholder="Insira um ingrediente por linha"
                                        required
                                    ></textarea>
                                </fieldset>
                            </div>
                            
                        </div>
                        <div className="w-full text-center">
                            <button
                                type="submit"
                                className="w-44 bg-redwood text-white py-2 px-4 rounded-full shadow hover:bg-butterscotch focus:outline-none focus:ring-2 focus:ring-redwood"
                            >
                                Enviar Receita
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CriarReceita;
