import React from "react";

const Categoria = () => {
  return (
    <div className="bg-red-100 w-full flex justify-center gap-5 p-5">
      <div className="flex flex-col items-center">
        <div className="rounded-full overflow-hidden shadow-2xl">
          <img
            className="object-cover w-32 h-32 rounded-full transition-transform duration-500 ease-in-out transform hover:scale-110"
            src="https://www.receiteria.com.br/wp-content/uploads/bolo-simples-com-cobertura-de-ninho-774x477.jpeg"
            alt="Sobremesa"
          />
        </div>
        <h3 className="mt-2 text-lg font-semibold text-gray-800">Sobremesas</h3>
      </div>
    </div>
  );
};

export default Categoria;
