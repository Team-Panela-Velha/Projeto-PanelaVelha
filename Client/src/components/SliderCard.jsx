import React, { useState, useEffect } from 'react';
import Garfo from "../../src/assets/img/garfo-e-faca.png";

const SliderCard = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const cards = [
    {
      title: "Fondue de Queijo: A Receita Perfeita para Momentos Especiais",
      description: "Cremoso, aromático e irresistível, o fondue de queijo é a escolha ideal para reunir pessoas queridas ao redor de uma deliciosa experiência compartilhada. Simples de preparar e cheio de sabor, ele transforma qualquer ocasião em um momento inesquecível!",
      imgUrl: "https://www.receiteria.com.br/wp-content/uploads/fondue-de-queijo-simples-1.jpg",
    },
    {
      title: "Card 2",
      description: "Descrição do Card 2",
      imgUrl: "https://via.placeholder.com/400",
    },
    {
      title: "Card 3",
      description: "Descrição do Card 3",
      imgUrl: "https://via.placeholder.com/400",
    },
    {
        title: "Card 4",
        description: "Descrição do Card 4",
        imgUrl: "https://via.placeholder.com/400",
      },
  ];

  // Função para passar automaticamente para o próximo card
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
    }, 3000); // Muda o card a cada 3 segundos

    // Limpeza do intervalo quando o componente for desmontado
    return () => clearInterval(interval);
  }, [cards.length]);

  return (
    <div className="relative w-full mx-3">
      <div className="flex overflow-hidden ">
        <div
          className="flex transition-transform duration-1000 mr-10"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {cards.map((card, index) => (
            <div
              key={index}
              className="flex flex-shrink-0 w-full gap-3 bg-transparent rounded-lg mx-2"
            >
              <img
                src={card.imgUrl}
                alt={card.title}
                className="w-1/2 h-80 object-cover rounded-l-lg mb-4"
              />
              <div className='w-1/2 h-80 bg-red-100'>
                <div className='flex flex-col justify-center items-center w-full h-full gap-2'>
                  <div className="w-full">
                    <img className="w-16 h-16 justify-self-center " src={Garfo} alt="" />
                  </div>
                  <h2 className="text-lg text-center w-4/5 font-semibold">{card.title}</h2>
                  <p className="text-jet text-sm text-center w-5/6">"{card.description}"</p>
                  <button className='bg-redwoodOP w-28 rounded-2xl h-8 font-medium text-sm text-jet uppercase'>
                    Ver Receita
                  </button>
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
