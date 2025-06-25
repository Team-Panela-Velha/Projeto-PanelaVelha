import axios from "axios";
import { useState, useEffect } from "react";
import AcessoNegadoMsg from "../components/AcessoNegadoMsg";

function GerenciadorUsuarios() {

    const [usuarios, setUsuarios] = useState([]);
    const [user, setUser] = useState(null);

    async function fetchUser() {
        const token = localStorage.getItem('jwtToken'); // Obter o token do localStorage

        axios.get('http://127.0.0.1:5000/api/verificar_usuario', {
            headers: {
                "Authorization": token, // Passa o token no cabeçalho Authorization
            },
        })
            .then(response => {
                setUser(response.data);
            })
    }

    async function fetchUsuarios() {
        axios.get("http://127.0.0.1:5000/api/listar_usuarios")
        .then(response => {
            setUsuarios(response.data.usuarios);
        })
        .catch((err) => console.log(err));
    }

    useEffect(() => {
        fetchUser();
        fetchUsuarios();
    }, []);

    async function isAdmin(e, id, admin) {
        e.preventDefault();

        try {
            await axios.post("http://127.0.0.1:5000/api/is_admin",         // realiza a requisicao e pausa a continuacao do codigo ate receber uma resposta
            {
                "id_usuario": id,
                "admin": admin
            });

            fetchUsuarios();                      // depois de receber um ok, faz fetch usuarios de novo e atualiza as checkboxes
            
        } catch (err) {
            console.log("erro ao atualizar admin: ", err);
        }
    }
    
    return (
        <>
            {user && user.admin == 0 ? (
                <AcessoNegadoMsg />
            ) : (
                <div className="flex flex-col w-full h-full items-center gap-10 mt-12">
                    <h1 className="text-5xl font-semibold text-chocolate-cosmos">Usuarios</h1>
                    <div className="flex flex-col w-full h-auto bg-red-100 mr-[3%] p-5">
                        <h2 className="text-redwood text-sm uppercase font-bold p-5 ">Lista de Úsuario :</h2>
                        <div>
                            {usuarios.map((usuario) => (
                                <div 
                                    key={usuario.id} 
                                    className="flex justify-between px-5 py-2 border-b border-gray-300"
                                >
                                    <h3>{usuario.nome}</h3>
                                    <div className="flex gap-5">
                                        <label>ADM</label>
                                        <input
                                            type="checkbox"
                                            checked={usuario.admin}
                                            onChange={(e) => isAdmin(e, usuario.id, usuario.admin)}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default GerenciadorUsuarios;