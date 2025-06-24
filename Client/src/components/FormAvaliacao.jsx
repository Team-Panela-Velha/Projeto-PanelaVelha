import { useState, useEffect } from "react";
import CardComentario from "./CardComentario";
import Logo from "../assets/img/logo.png";

import axios from "axios";

const FormAvaliacao = ({ id_receita, id_usuario, nome_usuario }) => {
    const [formData, setFormData] = useState({ usuario: id_usuario, comentario: "", avaliacao: 0 });
    const [comentarios, setComentarios] = useState([]);

    async function fetchComentarios() {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/api/avaliacoes/${id_receita}`);

        setComentarios(response.data.avaliacoes);
      } catch (err) {
        console.log(err);
      }
    } 
    
    useEffect(() => {
      fetchComentarios();
    }, []);

    async function enviarComentario() {
      axios.post("http://127.0.0.1:5000/api/criar_avaliacao", 
        {
          "id_usuario": formData.usuario,
          "comentario": formData.comentario,
          "avaliacao": formData.avaliacao,
          "id_receita": id_receita
        }
      );
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleStarClick = (rating) => {
        setFormData({ ...formData, avaliacao: rating });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormData({ usuario: id_usuario, comentario: "", avaliacao: 0 });

        enviarComentario();
    };

    return (
        <div className="flex flex-col mt-5 mr-3">
            <form
                onSubmit={handleSubmit}
                className="w-full h-full bg-red-100"
            >
                <h1 className="uppercase font-semibold text-redwood text-3xl text-center mt-1">Comentarios</h1>
                <div className="m-6 w-full sm:w-[30%]">
                    <label className="block text-lg sm:text-xl lg:text-lg font-bold text-jet mb-2">
                        <h2>o que você achou dessa receita?</h2>
                    </label>
                    <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                                key={star}
                                onClick={() => handleStarClick(star)}
                                xmlns="http://www.w3.org/2000/svg"
                                fill={formData.avaliacao >= star ? "gold" : "gray"}
                                viewBox="0 0 576 512"
                                height="1em"
                                class="star-solid w-6 h-6"
                            >
                                <path
                                    d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
                                ></path>
                            </svg>
                        ))}
                    </div>
                    <label
                        htmlFor="comentario"
                        className="block text-lg sm:text-xl lg:text-lg mt-10 text-jet font-bold">
                        deixe seu comentario
                    </label>
                </div>
                <div className="flex w-full justify-start">
                    <div className="flex max-sm:flex-col w-full sm:w-10/12 h-full">
                        <div className="w-full sm:w-1/4 flex flex-col justify-start items-center text-center max-sm:mb-3 sm:m-6">
                            <img className="rounded-full w-14 h-14 mb-2" src={ Logo } alt="Logo Panela Velha" />
                            <p className="text-lg">{nome_usuario}</p>
                        </div>
                        <div className="flex flex-col items-center w-full sm:w-3/4">
                            {/* <div className="mb-4">
                                <input
                                    type="text"
                                    id="nome"
                                    name="nome"
                                    value={formData.nome}
                                    onChange={handleChange}
                                    className="bg-transparent mt-1 block w-full sm:text-xl px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-redwood focus:border-redwood"
                                    placeholder="Seu nome"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="bg-transparent mt-1 block w-full sm:text-xl px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-redwood focus:border-redwood"
                                    placeholder="Seu e-mail"
                                    required
                                />
                            </div> */}
                            <div className="mb-4 max-sm:w-[90%] w-full">
                              <textarea
                                  id="comentario"
                                  name="comentario"
                                  value={formData.comentario}
                                  onChange={handleChange}
                                  className="mt-1 bg-transparent block w-full h-44 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-redwood focus:border-redwood"
                                  placeholder="Sua opinião sobre a receita"
                                  rows="4"
                                  required
                              ></textarea>
                            </div>
                            <div className="w-full text-center">
                              <button
                                  type="submit"
                                  className="w-44 text-center bg-redwood text-white py-2 px-4 mb-10 rounded-full shadow hover:bg-butterscotch focus:outline-none focus:ring-2 focus:ring-redwood"
                              >
                                  Enviar Avaliação
                              </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            {/* Exibindo o comentário postado, caso exista */}
            {comentarios.map((avaliacao) => (
                <CardComentario 
                key={avaliacao.id_avaliacao} 
                nome={avaliacao.nome_usuario} 
                comentario={avaliacao.comentario_avaliacao}
                aval={avaliacao.estrela_avaliacao}/>
            ))}
        </div>
    );
};

export default FormAvaliacao;
