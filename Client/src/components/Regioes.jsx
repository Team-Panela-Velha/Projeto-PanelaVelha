import React from "react";
import { Link } from "react-router-dom";


const Card_Regiao = ({ title, image }) => {
    return (
        <div className="flex flex-col items-center">
            <Link to={`/receitas/categoria/${title}`}>
                <div 
                    className="h-[11rem] w-[14vw] rounded-md transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg flex justify-start items-end text-white uppercase relative overflow-hidden"
                >
                
                    <div 
                        className="absolute w-full h-full bg-cover bg-center transition-all duration-300 ease-in-out"
                        style={{
                            backgroundImage: `url(${image})`,
                        }}
                    >
                        
                    </div>
                    {/* Camada de sobreposição escura */}
                    <div className="absolute flex w-full h-full bg-black/15 z-10"></div>

                
                    <div className="absolute w-full h-full"></div>
                    <p className="font-bold text-lg leading-tight w-full h-full flex justify-center items-center z-20 p-3">
                        {title}
                    </p>
                </div>
            </Link>
        </div>
    );
};

const Regioes = () => {
    const receitas = [
        { id: 1, title: "norte", link: "/RegioesPage/Norte", image: "https://minhasreceitinhas.com.br/wp-content/uploads/2023/02/Pato-no-tucupi-2-730x365.png" },
        { id: 2, title: "nordeste", link: "/RegioesPage/Nordeste", image: "https://superbomsupermercado.com.br/assets/blog/baiao---60.jpg" },
        { id: 3, title: "centro-oeste", link: "/RegioesPage/Centro-Oeste", image: "https://territoriosecreto.com.br/wp-content/uploads/2021/04/arroz-com-pequi-1510596202.jpg" },
        { id: 4, title: "sudeste", link: "/RegioesPage/Sudeste", image: "https://images.pexels.com/photos/15656545/pexels-photo-15656545/free-photo-of-comida-alimento-refeicao-jantar.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
        { id: 5, title: "sul", link: "/RegioesPage/Sul", image: "https://www.minhareceita.com.br/app/uploads/2024/03/barreado990-portal-minha-receita.jpg" },
    ];

    return (
        <div className="flex flex-wrap justify-between w-[97%] h-[13rem] p-3">
            {receitas.map((receita) => (
                <Card_Regiao
                    key={receita.id} 
                    title={receita.title} 
                    link={receita.link} 
                    image={receita.image} 
                />
            ))}
        </div>
    );
};

export default Regioes;
