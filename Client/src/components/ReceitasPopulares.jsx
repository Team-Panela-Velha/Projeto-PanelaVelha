import { useEffect, useState } from "react";
import axios from "axios";
import Card from "./CardReceitas"; // Importando o componente Card

const ReceitasPopulares = () => {
  
  const [receitas, setReceitas] = useState([]);
  
  async function fetchReceitas() {
    axios
      .get("http://127.0.0.1:5000/api/mostrar_receitas_populares")
      .then((response) => {
        setReceitas(response.data.receitas);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    fetchReceitas();
  }, []);

  return (
      <div className="flex flex-wrap md:flex-nowrap justify-center xl:justify-start 2xl:justify-center gap-4 p-4 mr-10 bg-slate-100 rounded-md shadow-lg w-[98%] md:overflow-x-auto md:snap-x md:snap-mandatory">
        {receitas.map((receita) => (
          <Card 
            key={receita.id} 
            receita={receita} />
      ))}
      </div>
  );
};

export default ReceitasPopulares;
