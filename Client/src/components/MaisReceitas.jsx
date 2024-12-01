import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/CardReceitas"; // Importando o componente Card


const MaisReceitas = () => {

    const [receitas, setReceitas] = useState([]);

    async function fetchReceitas(){
        axios.get("http://127.0.0.1:5000/api/mostrar_receitas_populares")
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
        <div className="flex justify-between ml-3 w-[95%] h-40 p-3 bg-red-100 relative shadow-lg rounded-md">
            {receitas.map((receita) => (
                <Card 
                    key={receita.id} 
                    receita={receita}
                />
            ))};
        </div>
    );
};

export default MaisReceitas;
