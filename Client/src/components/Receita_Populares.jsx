import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// obs: talvez seja melhor separar os componentes

const Card = ({ receita }) => {

    const { id, imagem_receita, nome_receita } = receita
    
    return (
        <div className="flex flex-col items-center">
            <div 
                className="bg-orange-200 h-3/4 w-[12vw] rounded-md transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg"
                style={{
                    backgroundImage: `url(${imagem_receita})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            ></div>
            <div className="pt-4 ">
                <p className="font-bold text-sm leading-tight text-center">
                    <Link to={`/receitas/${id}`}>{nome_receita}</Link>
                </p>
            </div>
        </div>
    );
};

const Receita_Populares = () => {

    const [receitas, setReceitas] = useState([]);

    async function fetchReceitas(){
        axios.get("http://127.0.0.1:5000/api/mostrar_receitas")
        .then(response => {
            setReceitas(response.data.receitas);
            console.log(response.data);
        })
        .catch(err => console.log(err))
    };

    useEffect(() => {
        fetchReceitas();
    }, []);

    return (
        <div className="flex justify-between w-[97%] h-40 p-3 bg-gray-100 relative shadow-lg rounded-md">
            {receitas.map((receita) => (
                <Card 
                    key={receita.id} 
                    receita={receita}
                />
            ))};
        </div>
    );
};

export default Receita_Populares;
