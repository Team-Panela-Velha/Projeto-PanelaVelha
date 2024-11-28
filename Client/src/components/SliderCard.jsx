import React, { useState, useEffect } from 'react';

const SliderCard = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const cards = [
    {
      title: "Card 1",
      description: "Descrição do Card 1",
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
                <h2 className="text-xl font-semibold">{card.title}</h2>
                <p className="text-gray-600">{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SliderCard;
