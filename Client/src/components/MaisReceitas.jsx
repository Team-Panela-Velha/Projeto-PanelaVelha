import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/CardReceitas"; // Importando o componente Card


const MaisReceitas = () => {

  const [receitas, setReceitas] = useState([]);

  async function fetchReceitas() {
    axios.get("http://127.0.0.1:5000/api/mostrar_receitas_mais")
      .then(response => {
        setReceitas(response.data.receitas);
      })
      .catch(err => console.log(err))
  };

  useEffect(() => {
    fetchReceitas();
  }, []);

  return (
    <div className="w-[98%] overflow-x-auto snap-x snap-mandatory bg-slate-100 rounded-md">
      <div className="flex lg:justify-center gap-3 p-4 ">
        {receitas.map((receita) => (
          <Card key={receita.id} receita={receita} />
        ))}
      </div>
    </div>
  );
};

export default MaisReceitas;
