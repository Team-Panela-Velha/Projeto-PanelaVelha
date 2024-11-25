import React from "react";
import { Link } from "react-router-dom";

const Card = ({ title, link, image }) => {
    return (
        <div className="flex flex-col items-center">
            <div 
                className="bg-orange-200 h-3/4 w-[12vw] rounded-md transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg"
                style={{
                    backgroundImage: `url(${image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            ></div>
            <div className="pt-4 ">
                <p className="font-bold text-sm leading-tight text-center">
                    <Link to={link}>{title}</Link>
                </p>
            </div>
        </div>
    );
};

const Receita_Populares = () => {
    const receitas = [
        { id: 1, title: "Caipirinha de Morango", link: "/ReceitaPage", image: "https://images.pexels.com/photos/27626304/pexels-photo-27626304/free-photo-of-comida-alimento-refeicao-frio.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
        { id: 2, title: "Fricassê de Frango", link: "/receita/torta-limao", image: "https://www.receitasnestle.com.br/sites/default/files/styles/recipe_detail_desktop/public/srh_recipes/06a057b345a11916c7f5027c96cf43d1.webp?itok=4qbztB4j" },
        { id: 3, title: "Brigadeiro", link: "/receita/brigadeiro", image: "https://example.com/brigadeiro.jpg" },
        { id: 4, title: "Pão de Queijo", link: "/receita/pao-queijo", image: "https://example.com/pao-queijo.jpg" },
        { id: 5, title: "Moqueca", link: "/receita/moqueca", image: "https://example.com/moqueca.jpg" },
        { id: 6, title: "Feijoada", link: "/receita/feijoada", image: "https://example.com/feijoada.jpg" },
    ];

    return (
        <div className="flex justify-between w-[97%] h-40 p-3 bg-gray-100 relative shadow-lg rounded-md">
            {receitas.map((receita) => (
                <Card 
                    key={receita.id} 
                    title={receita.title} 
                    link={receita.link} 
                    image={receita.image} 
                />
            ))}
        </div>
    );
};

export default Receita_Populares;
