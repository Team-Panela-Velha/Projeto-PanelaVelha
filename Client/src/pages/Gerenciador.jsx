import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Gerenciador() {
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

    useEffect(() => {
        fetchUser();
    }, []);
    
    return (
        <>
            {/* {user && user.admin === 1 ? (
                <p>usuario é adm</p>
            ) : (
                <p>n tem permissao</p>
            )}   */}
            <div className="flex flex-col items-center gap-10 mt-12">
                <h1 className="text-5xl font-semibold text-chocolate-cosmos">Gerenciador</h1>
                <div className="flex flex-wrap  justify-center items-center gap-5 pb-5 ">
                    <Link 
                        to="/gerenciadorUsuarios"
                    >
                        <div className="flex  flex-col justify-center items-center bg-redwood w-64 h-48 rounded-xl transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg">
                            <i class="bi bi-people-fill text-4xl"></i>
                            <h3 className="text-3xl uppercase">Usuario</h3>
                        </div>
                    </Link>
                    <Link 
                        to="/gerenciadorCategorias"
                    >
                        <div className="flex flex-col justify-center items-center bg-redwood w-64 h-48 rounded-xl transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg">
                            <i class="bi bi-bookmarks-fill text-4xl"></i>
                            <h3 className="text-3xl uppercase">Categorias</h3>
                        </div>
                    </Link>
                    <Link 
                        to="/gerenciadorHistorico"
                    >
                        <div className="flex flex-col justify-center items-center bg-redwood w-64 h-48  rounded-xl transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg">
                            <i class="bi bi-hourglass-bottom text-4xl"></i>
                            <h3 className="text-3xl uppercase">Historico</h3>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Gerenciador;