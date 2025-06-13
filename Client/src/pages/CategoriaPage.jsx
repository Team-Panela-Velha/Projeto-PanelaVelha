import axios from "axios";
import { useState, useEffect } from "react";
import Card from "../components/CardReceitas"
import { useParams } from "react-router-dom";
import Slider from "../components/slider/Slider";

const ReceitasCategoria = () => {
    const [receitas, setReceitas] = useState([]);
    const [ReceitasSlider, setReceitasSlider] = useState([]);
    const { categoria } = useParams();

    async function fetchReceitas(){
        axios.get(`http://127.0.0.1:5000/api/mostrar_receitas_categoria/${categoria}`)
        .then(response => {
            setReceitas(response.data.receitas);
        })
        .catch((err) => console.log(err));
    }

    async function fetchSliderReceitas() {
        axios.get(`http://127.0.0.1:5000/api/slider_categoria/${categoria}`)
        .then(response => {
            setReceitasSlider(response.data.receitas);
            console.log(response.data.receitas)
        })
        .catch((err) => console.log(err));
    }

    useEffect(() => {
        fetchReceitas();
        fetchSliderReceitas();
    }, []);

    return (
        <div className="w-full h-screen">
            <div className="flex flex-col gap-10 mt-5">
                <div className="relative">
                        <h1 className="text-5xl text-center uppercase font-bold text-chocolate-cosmos">{categoria}</h1>
                </div>
                <div className='mr-[3%]'>
                    <Slider slides={ReceitasSlider} />
                </div>
                <div className="flex justify-center">
                    <div className="flex flex-wrap justify-center gap-2 w-[97%] h-auto p-3 bg-slate-100 relative shadow-lg rounded-md lg:mr-[3%] mb-6">
                        {receitas.map((receita) => (
                            <Card  
                            key={receita.id} 
                            receita={receita} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReceitasCategoria;