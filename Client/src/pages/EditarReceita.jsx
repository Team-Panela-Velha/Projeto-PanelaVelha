import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from "axios"; 


const EditarReceita = () => {
    const [receita, setReceita] = useState(null);
    const [tiposCategoria, setTiposCategoria] = useState([]);
    const [categoria, setCategoria] = useState([]);

    async function fetchReceita() {
        axios.get(`http://127.0.0.1:5000/api/receita/${id}`)         // puxando as informaçoes ja existentes da receita
        .then(response => {
            setReceita(response.data.receita);
        })
        .catch(err => console.log(err));
    };

    async function fetchCategorias() {        // pegar todas as categorias do banco de dados
        axios.get("http://127.0.0.1:5000/api/categorias")
        .then(response => {
            setTiposCategoria(response.data.categorias)
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
        fetchReceita();
        fetchCategorias();
    }, []);

    const [formReceita, setFormReceita] = useState({
        titulo: "",
        descricao: "",
        imagemReceita: "",
        numeroPessoas: "",
        tipoPorcao: "",
        dificuldade: "",
        tempoPreparoH: "",
        tempoPreparoM: "",
        desc: ""
    });

    const [steps, setSteps] = useState([]); // Estado para os passos do modo de preparo
    const [items, setItems] = useState([]); // ingredientes

    useEffect(() => {
        if(receita) {
            setFormReceita({           // deixar todos os campos ja preenchidos com os dados da receita
                titulo: receita.nome_receita,          
                descricao: receita.descricao,
                imagemReceita: receita.imagem_receita,
                numeroPessoas: receita.num_porcao,
                tipoPorcao: receita.tipo_porcao,
                dificuldade: receita.dificuldade,
                tempoPreparoH: receita.tempo_hora,
                tempoPreparoM: receita.tempo_min,
                desc: receita.desc
            })

            setSteps(JSON.parse(receita.passos_receita))
            setItems(JSON.parse(receita.ingredientes))
            setCategoria(receita.categoria.map(categoria => categoria.id_categoria))
        }
    }, [receita])

    const token = localStorage.getItem('jwtToken'); // Obter o token do localStorage
    const [usuario, setUsuario] = useState(null);
    const { id } = useParams();


    async function fetchUsuario(){            // pegando nome e id do usuario
        axios.get('http://127.0.0.1:5000/api/verificar_usuario', {      
            headers: {
            "Authorization": token, // Passa o token no cabeçalho Authorization
            },
        })
        .then(response => {
            setUsuario(response.data);
        })
        .catch(err => console.error("Erro ao buscar dados do usuário: ", err))
    };    

    useEffect(() => {
        fetchUsuario();
    }, []);
    
    async function editarReceita(e) {
        e.preventDefault()

        if (categoria.length === 0) {
            alert("Selecione ao menos uma categoria para sua receita")
            return;
        }

        axios.patch(`http://127.0.0.1:5000/api/editar_categoria/${id}`, {
            "categoria": categoria
        })
        .then(response => {
            console.log(response);
        })

        axios.patch(`http://127.0.0.1:5000/api/editar_receita/${id}`, {
            "nome_receita": formReceita.titulo, 
            "imagem_receita": formReceita.imagemReceita, 
            "ingredientes": items,
            "passos_receita": steps,
            "num_porcao": formReceita.numeroPessoas,
            "tipo_porcao": formReceita.tipoPorcao,
            "dificuldade": formReceita.dificuldade,
            "tempo_min": formReceita.tempoPreparoM,
            "tempo_hora": formReceita.tempoPreparoH,
            "desc": formReceita.desc,
            "id_usuario": usuario.id
        })
        .then(response => {
            console.log(response);
            alert("Receita atualizada");
            window.location.href = "/usuario";
        })
        .catch(err => console.log(err))
    }
    


    // Atualiza os campos do formulário principal
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormReceita({ ...formReceita, [name]: value });
    };

    // atualiza o valor a ser enviado da categoria da receita
    const handleCategoriaChange = (e, id_categoria) => {
        if (e.target.checked) {
            setCategoria([...categoria, id_categoria]);
        } else {
            setCategoria(
                categoria.filter((catId) => catId !== id_categoria)
            );
        }
    };

    // Adiciona um novo passo vazio ao estado
    const addStep = () => {
        setSteps([...steps, ""]);
    };

    // o msm para os ingredientes
    const addItem = () => {
        setItems([...items, ""]);
    };

    // Atualiza o conteúdo de um passo específico (título ou descrição)
    const handleStepChange = (index, step) => {
        const updatedSteps = [...steps];
        updatedSteps[index] = step;
        setSteps(updatedSteps);
    };

    // o msm para os ingredientes
    const handleItemChange = (index, item) => {
        const updatedItems = [...items];
        updatedItems[index] = item;
        setItems(updatedItems);
    }

    // Remove um passo específico
    const removeStep = (index) => {
        const updatedSteps = steps.filter((_, stepIndex) => stepIndex !== index);
        setSteps(updatedSteps);
    };

    // o msm para os ingredientes
    const removeItem = (index) => {
        const updatedItems = items.filter((_, itemIndex) => itemIndex !== index);
        setItems(updatedItems);
    }


    const textAreaResize = (event) => {
        event.target.style.height = "auto"; // Reseta a altura para recalcular
        event.target.style.height = `${event.target.scrollHeight}px`; // Define a altura com base no scrollHeight
    };    

    return (
        <div className="w-full h-screen flex justify-center items-center">
            
            <div className="flex flex-col h-full w-full max-sm:pr-[8%] lg:w-[95%]">
                <div className="flex flex-col mt-10">

                    <h1 className="font-bold text-jet text-6xl text-center ">Envie sua Receita</h1>
                    <form
                        onSubmit={editarReceita}
                        className="w-full h-auto max-sm:p-2 my-10 bg-red-100"
                    >
                        <div className="flex justify-center items-center flex-col mt-10">
                            <h2 className="uppercase font-bold text-redwood text-xl sm:text-2xl lg:text-xl sm:ml-8 pb-5 max-sm:self-center self-start p-5">Sua Receita</h2>
                            <label className="w-full sm:w-[50%] relative sm:right-32 px-3 mb-1 mt-2 font-semibold text-gray-700 text-md sm:text-xl lg:text-md">
                                Nome da receita*
                            </label>
                            <input
                                type="text"
                                id="titulo"
                                name="titulo"
                                value={formReceita.titulo}
                                onChange={handleChange}
                                className="bg-transparent relative sm:right-32 mt-1 block w-full sm:w-[50%] h-10 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-redwood focus:border-redwood placeholder:text-gray-500 placeholder:text-sm sm:placeholder:text-lg lg:placeholder:text-sm"
                                placeholder="Título da Receita"
                                required
                            />
                        </div>
                        <div className="flex justify-center items-center flex-col mb-3">
                            <label className="w-full sm:w-[50%] relative sm:right-32 px-3 mb-1 mt-2 font-semibold text-gray-700 text-md sm:text-xl lg:text-md">
                                Imagem*
                            </label>
                            <input
                                type="url"
                                id="imagemReceita"
                                name="imagemReceita"
                                value={formReceita.imagemReceita}
                                onChange={handleChange}
                                className="bg-transparent block relative sm:right-32 w-full sm:w-[50%] h-10 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-redwood focus:border-redwood placeholder:text-gray-500 placeholder:text-sm sm:placeholder:text-lg lg:placeholder:text-sm"
                                placeholder="https://example.com"
                                required
                            />
                        </div>
                        <div className="flex justify-center items-center flex-col mb-10">
                            <label className="w-full sm:w-[50%] relative sm:right-32 px-3 mb-1 mt-2 font-semibold text-gray-700 text-md sm:text-xl lg:text-md">
                                Descrição da receita*
                            </label>
                            <textarea
                                type="text"
                                id="desc"
                                name="desc"
                                value={formReceita.desc}
                                onChange={handleChange}
                                onInput={textAreaResize}
                                className="bg-transparent relative sm:right-32 mt-1 block w-full sm:w-[50%] h-auto overflow-hidden px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-redwood focus:border-redwood placeholder:text-gray-500 placeholder:text-sm sm:placeholder:text-lg lg:placeholder:text-sm"
                                placeholder="Fale um pouco sobre a receita"
                                required
                            />
                        </div>
                        <div className="flex w-full justify-start relative sm:left-8">
                            <div className="p-2 w-full sm:w-[40%] sm:pl-5 flex max-sm:flex-col justify-start sm:gap-16">       
                                <div>
                                    <h2 className="uppercase font-bold text-redwood text-xl sm:text-2xl lg:text-xl pb-5">
                                        Informações Adicionais
                                    </h2>
                                    <div className=" w-[30%]">
                                        <fieldset className="pb-3" >
                                            <legend className="font-semibold text-chocolate-cosmos pb-1 text-md sm:text-xl lg:text-md">
                                                <h2>Dificuldade*</h2>
                                            </legend>
                                            <select
                                                id="dificuldade"
                                                name="dificuldade"
                                                required
                                                onChange={handleChange}
                                                value={formReceita.dificuldade}
                                                className="w-28 text-xs p-1  text-jet border border-collapse border-gray-300 focus:ring-redwood focus:border-redwood focus:outline-none "
                                            >
                                                <option value="">Selecione</option>
                                                <option value="Muito Fácil">Muito Facíl</option>
                                                <option value="Fácil">Facíl</option>
                                                <option value="Médio">Médio</option>
                                                <option value="Difícil">Díficil</option>
                                                <option value="Muito Difícil">Muito Díficil</option>
                                            </select>
                                        </fieldset>
                                    </div>

                                    <fieldset className="font-semibold text-chocolate-cosmos pb-1 pt-3 text-md sm:text-xl lg:text-md ">
                                        <legend>Tempo de Preparo*</legend>
                                        <div className="flex"> 
                                            <input
                                                type="number"
                                                min="0"
                                                id="tempoPreparoH"
                                                name="tempoPreparoH"
                                                required
                                                value={formReceita.tempoPreparoH}
                                                onChange={handleChange}
                                                className="w-14 h-full text-sm p-1 text-jet border border-collapse border-gray-300 focus:ring-redwood focus:outline-none"
                                            />
                                            <label htmlFor="tempoPreparoH"
                                                className="font-normal text-base pr-2 pl-1 text-md sm:text-xl lg:text-base"
                                            > Hora(s)</label>
                                            <input
                                                type="number"
                                                min="0"
                                                max="59"
                                                required
                                                id="tempoPreparoM"
                                                name="tempoPreparoM"
                                                value={formReceita.tempoPreparoM}
                                                onChange={handleChange}
                                                className="w-14 h-full text-sm p-1 text-jet border border-collapse border-gray-300 focus:ring-redwood focus:outline-none"
                                            />
                                            <label htmlFor="tempoPreparoM"
                                                className="font-normal text-base pr-2 pl-1 text-md sm:text-xl lg:text-md"
                                            > Minuto(s)</label>
                                        </div>
                                        
                                    </fieldset>
                                </div>
                                <div className="relative top-10 lg:top-20 lg:grid lg:grid-cols-3 lg:gap-x-36 lg:gap-y-0">
                                    <div className="col-span-3">
                                        <label className="block font-semibold text-chocolate-cosmos max-lg:my-5 text-md sm:text-xl lg:text-md">
                                        Categorias*
                                        </label>
                                    </div>
                                    {tiposCategoria.map((categoria) => (
                                        <div key={categoria.id_categoria} className="flex items-center gap-2 w-72 leading-none h-3 relative bottom-3 max-lg:mb-2 text-md sm:text-xl lg:text-md">
                                            <input
                                                type="checkbox"
                                                id={`cat-${categoria.id_categoria}`}
                                                value={categoria.id_categoria}
                                                className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-500"
                                                onChange={(e) => handleCategoriaChange(e, categoria.id_categoria)}
                                            />
                                            <label
                                                htmlFor={`cat-${categoria.id_categoria}`}
                                                className="text-gray-700"
                                            >
                                                {categoria.nome_categoria}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="flex max-lg:flex-col-reverse justify-around flex-row-reverse items-start p-5 mt-10 xl:mt-20">
                            <div className="w-full lg:w-1/3">
                                <h2 className="uppercase font-bold text-redwood pb-5  text-xl sm:text-2xl lg:text-xl">Modo de Preparo</h2>
                                <div className="space-y-6">
                                    {steps.map((step, index) => (
                                        <div key={index} className="space-y-3 border-b relative lg:left-8 pb-4">
                                            <div className="flex items-center space-x-4">
                                                <label className="font-bold uppercase text-chocolate-cosmos">
                                                    Passo {index + 1}:
                                                </label>
                                            </div>
                                            <div className="flex flex-col">
                                                <textarea
                                                    value={step}
                                                    onChange={(e) =>
                                                        handleStepChange(index, e.target.value)
                                                    }
                                                    className="bg-transparent block w-full h-30 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-redwood focus:border-redwood placeholder:text-gray-500 placeholder:text-sm sm:placeholder:text-lg lg:placeholder:text-sm"
                                                    placeholder={`Instruções do passo ${index + 1}`}
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
                                    className="mt-4  px-2 py-2 bg-chocolate-cosmos text-white rounded-md hover:bg-butterscotch"
                                >
                                    Adicionar Passo
                                </button>
                            </div>
                            <div className="w-full lg:w-1/3 max-lg:mb-10">
                                <div className="w-full sm:p-2 relative bottom-3">
                                    <h2 className="uppercase font-bold text-redwood pb-5  text-xl sm:text-2xl lg:text-xl">
                                        Ingredientes
                                    </h2>
                                    <fieldset className="mb-10 max-2xl:mb-20">
                                        <div className="h-6">
                                            <legend className="font-semibold text-chocolate-cosmos pb-1 text-md sm:text-xl lg:text-md">
                                                Número de pessoas ou porções*
                                            </legend>
                                            <input
                                                type="number"
                                                min="1"
                                                id="numeroPessoas"
                                                name="numeroPessoas"
                                                required
                                                value={formReceita.numeroPessoas}
                                                onChange={handleChange}
                                                className="w-14 h-full text-sm p-1 text-jet border border-collapse border-gray-300 focus:ring-redwood focus:outline-none"
                                            />
                                            <select
                                                id="tipoPorcao"
                                                name="tipoPorcao"
                                                required
                                                onChange={handleChange}
                                                value={formReceita.tipoPorcao}
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
                                    <div className="space-y-6">
                                    {items.map((item, index) => (
                                        <div key={index} className="space-y-3 border-b relative mt-2 pb-4">
                                            <div className="flex items-center space-x-4">
                                                <label className="font-bold uppercase text-chocolate-cosmos">
                                                    Ingrediente {index + 1}:
                                                </label>
                                            </div>
                                            <div className="flex flex-col">
                                                <textarea
                                                    value={item}
                                                    onChange={(e) =>
                                                        handleItemChange(index, e.target.value)
                                                    }
                                                    className="bg-transparent block w-full h-11 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-redwood focus:border-redwood placeholder:text-gray-500 placeholder:text-sm sm:placeholder:text-lg lg:placeholder:text-sm"
                                                    placeholder={`Quantidade e nome do ingrediente ${index + 1}`}
                                                    rows="3"
                                                    required
                                                ></textarea>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => removeItem(index)}
                                                className="text-butterscotch hover:text-red-700"
                                            >
                                                Remover Ingrediente
                                            </button>
                                        </div>
                                    ))}
                                    </div>
                                    <button
                                        type="button"
                                        onClick={addItem}
                                        className="mt-4 px-2 py-2 bg-chocolate-cosmos text-white rounded-md hover:bg-butterscotch"
                                    >
                                        Adicionar Ingrediente
                                    </button>
                                </div>
                            </div>
                            
                        </div>
                        <div className="w-full text-center my-10">
                            <button
                                type="submit"
                                className="w-44 bg-redwood text-white py-2 px-4 rounded-full shadow hover:bg-butterscotch focus:outline-none focus:ring-2 focus:ring-redwood"
                            >
                                Editar Receita
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            
        </div>
    );
};

export default EditarReceita;
