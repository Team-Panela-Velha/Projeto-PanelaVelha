import React, { useState } from "react";

const CriarReceita = () => {
    const [formReceita, setFormReceita] = useState({
        titulo: "",
        descricao: "",
        imagemReceita: "",
        numeroPessoas: "",
        categoria: "",
        ingredientes: "",
        dificuldade: "",
        tempoPreparoH: "",
        tempoPreparoM: "",

    });

    const [steps, setSteps] = useState([]); // Estado para os passos do modo de preparo
    const [enviado, setEnviado] = useState(false); // Estado para verificar se o formulário foi enviado

    // Atualiza os campos do formulário principal
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormReceita({ ...formReceita, [name]: value });
    };

    // Adiciona um novo passo vazio ao estado
    const addStep = () => {
        setSteps([...steps, { titulo: "", descricao: "" }]);
    };

    // Atualiza o conteúdo de um passo específico (título ou descrição)
    const handleStepChange = (index, field, value) => {
        const updatedSteps = [...steps];
        updatedSteps[index][field] = value;
        setSteps(updatedSteps);
    };

    // Remove um passo específico
    const removeStep = (index) => {
        const updatedSteps = steps.filter((_, stepIndex) => stepIndex !== index);
        setSteps(updatedSteps);
    };

    // Manipula o envio do formulário
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Receita Enviada:", { ...formReceita, modoDePreparo: steps });
        setEnviado(true); // Marca o formulário como enviado
    };

    // Redefine o estado para exibir o formulário novamente
    const handleVoltar = () => {
        setEnviado(false);
        setFormReceita({
            titulo: "",
            descricao: "",
            imagemReceita: "",
            numeroPessoas: "",
            categoria: "",
            ingredientes: "",
            dificuldade: "",
            tempoPreparoH: "",
            tempoPreparoM: "",
        });
        setSteps([]);
    };


    return (
        <div className="w-full h-screen flex justify-center items-center">
            {enviado ? (
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-green-600">Receita enviada com sucesso!</h1>
                    <p className="text-lg mt-4 text-gray-700">
                        Obrigado por compartilhar sua receita! 🎉
                    </p>
                    <button
                        onClick={handleVoltar}
                        className="mt-6 px-4 py-2 bg-redwood text-white rounded-full hover:bg-butterscotch"
                    >
                        Criar outra receita
                    </button>
                </div>
            ) : (
            <div className="flex flex-col h-full w-[95%]">
                <div className="flex flex-col mt-10">

                    <h1 className="font-bold text-jet text-6xl text-center">Envie sua Receita</h1>
                    <form
                        onSubmit={handleSubmit}
                        className="w-full h-auto my-10 bg-red-100"
                    >
                        <div className="flex justify-center items-center flex-col mt-10">
                            <h2 className="uppercase font-bold text-redwood text-xl pb-5 self-start p-5">Sua Receita</h2>
                            <label className="w-[50%] px-3 mb-1 mt-2 font-semibold text-gray-700">
                                Título*
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
                                Descrição*
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
                                Imagem*
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
                        <div className="flex w-full justify-center">
                            <div className="p-2 w-[40%] pl-5">
                                <h2 className="uppercase font-bold text-redwood text-xl pb-5">
                                    Informações Chaves
                                </h2>
                                <div className=" w-[30%]">
                                    <fieldset className="pb-3" >
                                        <legend className="font-semibold text-chocolate-cosmos pb-1">
                                            <h2>Dificuldade*</h2>
                                        </legend>
                                        <select
                                            id="dificuldade"
                                            name="dificuldade"
                                            required
                                            onChange={handleChange}
                                            value={formReceita.dificuldade}
                                            className="w-28 text-xs p-1  text-jet border border-collapse border-gray-300 focus:ring-redwood focus:border-redwood focus:outline-none"
                                        >
                                            <option value="MuitoFacil">Muito Facíl</option>
                                            <option value="Facil">Facíl</option>
                                            <option value="Medio">Médio</option>
                                            <option value="Dificil">Díficil</option>
                                            <option value="MuitoDificil">Muito Díficil</option>
                                        </select>
                                    </fieldset>
                                </div>

                                <fieldset className="font-semibold text-chocolate-cosmos pb-1 pt-3 ">
                                    <legend>Tempo de Preparo*</legend>

                                    <input
                                        type="number"
                                        id="tempoPreparoH"
                                        name="tempoPreparoH"
                                        required
                                        value={formReceita.tempoPreparoH}
                                        onChange={handleChange}
                                        className="w-14 h-full text-sm p-1 text-jet border border-collapse border-gray-300 focus:ring-redwood focus:outline-none"
                                    />
                                    <label htmlFor="tempoPreparoH"
                                        className="font-normal text-base pr-2 pl-1"
                                    > Hora(s)</label>
                                    <input
                                        type="number"
                                        id="tempoPreparoM"
                                        name="tempoPreparoM"
                                        required
                                        value={formReceita.tempoPreparoM}
                                        onChange={handleChange}
                                        className="w-14 h-full text-sm p-1 text-jet border border-collapse border-gray-300 focus:ring-redwood focus:outline-none"
                                    />
                                    <label htmlFor="tempoPreparoM"
                                        className="font-normal text-base pr-2 pl-1"
                                    > Minuto(s)</label>
                                </fieldset>

                            </div>
                            <div className="w-[60%] p-2">
                                <h2 className="uppercase font-bold text-redwood text-xl pb-5">
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
                        <div className="flex flex-col justify-center items-start p-5 mt-10">
                            <h2 className="uppercase font-bold text-redwood text-xl pb-5">Modo de Preparo</h2>
                            <div className="space-y-6">
                                {steps.map((step, index) => (
                                    <div key={index} className="space-y-3 border-b pb-4">
                                        <div className="flex items-center space-x-4">
                                            <label className="font-bold uppercase text-chocolate-cosmos">
                                                Passo {index + 1} - Título:*
                                            </label>
                                            <input
                                                type="text"
                                                value={step.titulo}
                                                onChange={(e) =>
                                                    handleStepChange(index, "titulo", e.target.value)
                                                }
                                                className="flex-1 px-4 py-2 bg-transparent block border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-redwood focus:border-redwood placeholder:text-gray-500 placeholder:text-sm"
                                                placeholder={`Título do passo ${index + 1}`}
                                                required
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label className="font-bold uppercase text-chocolate-cosmos">
                                                Descrição:*
                                            </label>
                                            <textarea
                                                value={step.descricao}
                                                onChange={(e) =>
                                                    handleStepChange(index, "descricao", e.target.value)
                                                }
                                                className="bg-transparent block w-full h-36 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-redwood focus:border-redwood placeholder:text-gray-500 placeholder:text-sm"
                                                placeholder={`Descrição detalhada do passo ${index + 1}`}
                                                rows="3"
                                                required
                                            ></textarea>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeStep(index)}
                                            className="text-butterscotch hover:text-red-700"
                                        >
                                            Remover Passo
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <button
                                type="button"
                                onClick={addStep}
                                className="mt-4 px-2 py-2 bg-chocolate-cosmos text-white rounded-md hover:bg-butterscotch"
                            >
                                Adicionar Passo
                            </button>
                        </div>
                        <div className="w-full text-center my-10">
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
            )}
        </div>
    );
};

export default CriarReceita;
