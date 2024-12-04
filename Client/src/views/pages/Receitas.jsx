import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Card from "../../components/CardReceitas"

const Receitas = () => {
    const [receitas, setReceitas] = useState([]);

    async function fetchReceitas(){
        axios.get("http://127.0.0.1:5000/api/mostrar_receitas")
        .then(response => {
            setReceitas(response.data.receitas);
            console.log(response.data);
        })
        .catch((err) => console.log(err));
    }

    useEffect(() => {
        fetchReceitas();
    }, []);

    return (
        <div className="w-full h-screen">
            <div className="flex flex-col gap-10 mt-8">
                <div className="relative left-16">
                    <h1 className="uppercase text-4xl font-bold text-chocolate-cosmos">Receitas</h1>
                </div>
                <div className="flex justify-center">
                    <div className="flex flex-wrap justify-start gap-6 w-[86.7%]">
                        {receitas.map((receita) => (
                            <Card  key={receita.id} receita={receita} />
                        ))}
                    </div>
                </div>
                
            </div>
            
        </div>
    );
};

export default Receitas;