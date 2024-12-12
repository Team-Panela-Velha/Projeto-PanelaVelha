import axios from "axios";
import { useState, useEffect } from "react";
import Card from "../../components/CardReceitas"
import { useParams } from "react-router-dom";

const ReceitasCategoria = () => {
    const [receitas, setReceitas] = useState([]);
    const { categoria } = useParams();

    async function fetchReceitas(){
        axios.get(`http://127.0.0.1:5000/api/mostrar_receitas_categoria/${categoria}`)
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
                    <h1 className="uppercase text-4xl font-bold text-chocolate-cosmos">{categoria}</h1>
                </div>
                <div className="flex justify-center">
                    <div className="flex flex-wrap justify-start gap-6 w-[86.7%] bg-slate-100 pl-4 pt-5 pb-4 rounded-md">
                        {receitas.map((receita) => (
                            <Card  key={receita.id} receita={receita} />
                        ))}
                    </div>
                </div>
                
            </div>
            
        </div>
    );
};

export default ReceitasCategoria;