import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Garfo from "../assets/img/garfo-e-faca.png";

const SliderCard = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const cards = [
    {
      id_receita: 5,
      title: "Fondue de Queijo",
      description: "Cremoso, aromático e irresistível, o fondue de queijo é a escolha ideal para reunir pessoas queridas ao redor de uma deliciosa experiência compartilhada. Simples de preparar e cheio de sabor, ele transforma qualquer ocasião em um momento inesquecível!",
      imgUrl: "https://www.receiteria.com.br/wp-content/uploads/fondue-de-queijo-simples-1.jpg",
    },
    {
      id_receita: 6,
      title: "Filé Mignon à Parmegiana",
      description: "O Filé Mignon à Parmegiana é uma versão sofisticada do clássico, unindo a maciez do filé empanado ao molho de tomate caseiro e uma camada irresistível de queijo derretido. Ideal para momentos especiais, é uma refeição completa e deliciosa quando acompanhada de arroz branco e batatas fritas.",
      imgUrl: "https://frigorificoarvoredo.com.br/blog/wp-content/uploads/2023/07/receita-bife-a-parmegiana-.jpg",
    },
    {
      id_receita: 7,
      title: "Batida de Vinho",
      description: "A Batida de Vinho é uma bebida prática, deliciosa e perfeita para momentos de descontração. Feita com vinho tinto, leite condensado e um toque de gelo, ela combina o sabor marcante do vinho com a cremosidade e doçura dos ingredientes. Ideal para reuniões com amigos, festas ou até para saborear em um fim de tarde, essa bebida é simples de preparar e sempre agrada. Sirva bem gelada e aproveite!",
      imgUrl: "https://vocegastro.com.br/app/uploads/2021/09/como-fazer-batida-de-vinho.jpg",
    },
    {
      id_receita: 8,
        title: "Palha Italiana",
        description: "A Palha Italiana é a combinação perfeita de brigadeiro cremoso com biscoitos crocantes, formando um doce fácil de fazer e irresistível. Com sua textura única e sabor marcante, ela é ideal para lanches, sobremesas ou até para presentear. Simples, prática e deliciosa, essa receita agrada a todos e é perfeita para qualquer ocasião. Experimente e apaixone-se!",
        imgUrl: "https://www.estadao.com.br/resizer/v2/JDR73DXIZJEB5P6QV2HMKWPKPE.jpg?quality=80&auth=6505661bad79a909da49828f02df308f4fd258d886dedd1f3b3634efd7e0f137&width=1200&height=1200&focal=4378,4755",
      },
  ];

  // Função para passar automaticamente para o próximo card
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
    }, 5000); // Muda o card a cada 5 segundos

    // Limpeza do intervalo quando o componente for desmontado
    return () => clearInterval(interval);
  }, [cards.length]);

  return (
    <div className="relative w-full mx-3">
      <div className="flex justify-center overflow-hidden">
        <div
          className="flex transition-transform duration-[800ms] sm:duration-1000 "
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {cards.map((card, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row flex-shrink-0 w-full bg-transparent rounded-lg  justify-center items-center gap-2"
            >
              <img
                src={card.imgUrl}
                alt={card.title}
                className="w-[300px] sm:w-[45%] h-48 sm:h-96 lg:h-80  sm:px-0 object-cover rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none"
              />
              <div className="w-[300px] sm:w-[45%] h-auto sm:h-96 lg:h-80 p-2 mr-2 sm:mr-0 bg-slate-100">
                <div className="flex flex-col justify-center items-center w-full h-full gap-2 p-2 sm:p-5 lg:p-2">
                  <div className="w-full flex justify-center">
                    <img className="w-8 h-8 sm:w-14 sm:h-14 lg:w-16 lg:h-16" src={Garfo} alt="Ícone de garfo" />
                  </div>
                  <h2 className=" text-sm sm:text-lg text-center font-semibold">
                    {card.title}
                  </h2>
                  <p className="text-jet text-xs sm:text-sm text-justify px-5">
                    "{card.description}"
                  </p>
                  <Link 
                    to={`receitas/${card.id_receita}`}>
                      <button className="bg-redwoodOP px-4 py-2 rounded-2xl font-medium text-sm text-jet uppercase">
                        Ver Receita
                      </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
</div>
  );
};

export default SliderCard;
