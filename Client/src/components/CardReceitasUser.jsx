import React, { useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import 'bootstrap-icons/font/bootstrap-icons.css'

const CardReceitas = ({ receita }) => {
  const { id, imagem_receita, nome_receita } = receita;
  const [deleteScreen, setDeleteScreen] = useState(false)

  async function deletarReceita() {
    axios.delete(`http://127.0.0.1:5000/api/deletar_receita/${id}`)
    .then(response => {
      console.log(response);
      alert("Receita deletada");
    })
    .catch(err => console.log(err))

    setDeleteScreen(false);
    window.location.reload();
  }

  return (
    <div className="flex flex-col items-center bg-red-100 p-1 rounded-md shadow-xl">
      <Link to={`/receitas/${id}`}>
      <div
        className="bg-orange-200 h-[120px] w-[12vw] rounded-md transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg"
        style={{
          backgroundImage: `url(${imagem_receita})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div></Link>
      <div className="pt-4 w-full">
        <p className="font-bold text-sm leading-tight text-center first-letter:uppercase font-mono">
          <Link to={`/receitas/${id}`}>{nome_receita}</Link>
        </p>
        <div className="flex justify-start gap-1 mt-1">
          <Link to={`/editar_receita/${id}`}><i className="bi bi-pencil p-[2px] px-[5px] rounded-full text-redwood hover:bg-redwood hover:text-slate-100 duration-200"></i></Link>
          <button onClick={() => setDeleteScreen(true)}><i className="bi bi-trash p-[2px] px-[5px] rounded-full text-redwood hover:bg-redwood hover:text-slate-100 duration-200"></i></button>
        </div>
        {deleteScreen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" 
            onClick={() => setDeleteScreen(false)} // Fecha ao clicar fora
          >
            <div 
              className="bg-slate-100 p-5 w-60 rounded shadow-md" 
              onClick={(e) => e.stopPropagation()} // Impede o fechamento ao clicar dentro
            >
              <h1 className="font-bold">Tem certeza?</h1>
              <div className="flex justify-around mt-4">
                <button onClick={deletarReceita} className="bg-redwood text-white px-4 py-2 rounded">Excluir</button>
                <button onClick={() => setDeleteScreen(false)} className="bg-gray-300 px-4 py-2 rounded">Cancelar</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardReceitas;
