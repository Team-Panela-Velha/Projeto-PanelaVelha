import { Link } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css'

const CardReceitasFav = ({ receita }) => {
  
  const { id_receita, imagem_receita, nome_receita } = receita;

  
  return (
    <div className="flex flex-col items-center bg-red-100 p-1 rounded-md shadow-xl">
      <Link 
        to={`/receitas/${id_receita}`}>
        <div
          className="bg-orange-200 w-44 h-32 lg:h-[120px] lg:w-[12vw] rounded-md transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg"
          style={{
            backgroundImage: `url(${imagem_receita})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
      </Link>
      <div className="pt-4 w-full">
        <p className="font-bold text-sm sm:text-lg lg:text-sm leading-tight text-center first-letter:uppercase font-mono">
          <Link 
            to={`/receitas/${id_receita}`}>
              {nome_receita}
          </Link>
        </p>    
      </div>
    </div>
  );
};

export default CardReceitasFav;
