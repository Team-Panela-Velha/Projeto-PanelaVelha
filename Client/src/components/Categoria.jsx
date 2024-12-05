import { Link } from "react-router-dom";

const CardCategoria = ({ receita }) => {
  const { id, imagem_categoria, nome_categoria } = receita;

  return (
    <div className="flex flex-col items-center justify-center">
      <Link to={"/receitas"}>
        <div className="rounded-full overflow-hidden shadow-2xl shadow-slate-400">
          <img
            className="object-cover w-24 h-24 rounded-full transition-transform duration-500 ease-in-out transform hover:scale-110"
            src={imagem_categoria}
            alt={nome_categoria}
          />
        </div>
      </Link>
      <div className="pt-4">
        <Link to={"/receitas"}>
          <p className="font-bold text-sm leading-tight text-center font-mono">
            {nome_categoria}
          </p>
        </Link>
      </div>
      
    </div>
  );
};

const Categoria = () => {
 
  const receitas = [
    {
      id: 1,
      imagem_categoria: "https://www.receiteria.com.br/wp-content/uploads/receitas-de-massas-0.jpg",
      nome_categoria: "Massas",
    },
    {
      id: 2,
      imagem_categoria: "https://st2.depositphotos.com/3833507/7122/i/450/depositphotos_71220693-stock-photo-sole-with-cherry-tomatoes.jpg",
      nome_categoria:"Peixes",
    },
    {
      id: 2,
      imagem_categoria: "https://www.bahianoticias.com.br/fotos/hall_noticias/3440/mg/WhatsApp%20Image%202023-04-15%20at%2011.07.43..jpg",
      nome_categoria:"Carnes",
    },
    {
      id: 2,
      imagem_categoria: "https://www.guiadasemana.com.br/contentFiles/image/opt_w1280h960/2021/04/FEA/66992_shutterstock-483777991.jpg",
      nome_categoria:"Sobremesas",
    },
    {
      id: 2,
      imagem_categoria: "https://www.receiteria.com.br/wp-content/uploads/coquetel-de-morango-sem-alcool-01-730x730.jpg",
      nome_categoria:"Bebidas",
    },
    {
      id: 2,
      imagem_categoria: "https://www.receiteria.com.br/wp-content/uploads/massa-para-empadao-sem-gluten-1-730x730.jpg",
      nome_categoria:"Sem Gluten",
    },
    
    
  ];

  return (
    <div className="w-full flex ml-3 bg-slate-100 rounded-md justify-between p-5">
      {receitas.map((receita) => (
        <CardCategoria key={receita.id} receita={receita} />
      ))}
    </div>
  );
};

export default Categoria;
