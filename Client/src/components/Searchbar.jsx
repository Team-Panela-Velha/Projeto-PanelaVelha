import React, { useState, useEffect } from 'react';
import './css/Searchbar.css'

function Searchbar() {
    const [input, setInput] = useState("")
    const [ingredientes, setIngredientes] = useState([]);
    const [resultados, setResultados] = useState([]);

    useEffect(() => {
        const fetchIngredientes = async () => {
            try {
                const response = await fetch("http://127.0.0.1:5000/api/ingredientes"); // Ajuste conforme necessário
                const data = await response.json();
                console.log("Dados recebidos da API:", data);  // Verifique a estrutura dos dados
                setIngredientes(data);
            } catch (error) {
                console.error("Erro ao buscar ingredientes:", error);
            }
        };

        fetchIngredientes();
    }, []);

    useEffect(() => {
        if (input) {
            // Filtra os ingredientes com base no input
            const filtrados = ingredientes.filter(ingrediente =>
                ingrediente.toLowerCase().includes(input.toLowerCase())  // Verifica a string
            );
            console.log("Filtrados:", filtrados);  // Verifique os resultados filtrados
            setResultados(filtrados);
        } else {
            setResultados([]);  // Se não houver input, limpa os resultados
        }
    }, [input, ingredientes]);

    // Função que será chamada quando o usuário clicar em um item da lista
    const handleClick = (ingrediente) => {
        setInput(ingrediente);  // Preenche o input com o nome do ingrediente
        setResultados([]);  // Limpa os resultados após o clique
    };

    return (
        <div className="relative">
            <form className="relative flex items-center w-[180px] h-[35px] bg-white rounded-2xl">
                <button className="text-[#8b8ba7] p-0 pl-2 bg-none border-none">
                    <svg width="17" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="search">
                        <path d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9" stroke="currentColor" strokeWidth="1.333" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                </button>
                <input
                    className="flex-1 text-sm bg-transparent w-full h-full px-2 py-2 border-none placeholder:text-gray-400 focus:outline-none"
                    placeholder="Pesquisar"
                    required
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}  // Atualiza o input
                />
                <button type="reset" className="opacity-0 invisible border-none bg-none p-0 transition-opacity duration-300 text-gray-400 focus:opacity-100 focus:visible">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </form>
            {resultados.length > 0 && (
                <ul className="absolute bg-white border border-gray-300 rounded-md mt-1 z-10">
                    {resultados.map((ingrediente, index) => (
                        <li 
                            key={index} 
                            className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                            onClick={() => handleClick(ingrediente)}  // Chama a função handleClick
                        >
                            {ingrediente}  {/* Exibe o nome do ingrediente */}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Searchbar;