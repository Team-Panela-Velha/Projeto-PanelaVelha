import { useEffect, useState } from "react";
import axios from "axios";

const Usuario = () => {

    const token = localStorage.getItem('jwtToken'); // Obter o token do localStorage
    const [usuario, setUsuario] = useState(null);

    async function fetchUsuario(){
        axios.get('http://127.0.0.1:5000/api/verificar_usuario', {       //usando essa rota apenas como teste
            headers: {
            "Authorization": token, // Passa o token no cabeçalho Authorization
            },
        })
        .then(response => {
            setUsuario(response.data);
            console.log(response.data);
        })
        .catch(err => console.error("Erro ao buscar dados do usuário: ", err))
    };    

    useEffect(() => {
        fetchUsuario();
    }, []);
    
    function logout() { 
        localStorage.removeItem("jwtToken");
        window.location.href = "/";
    }

    // criando receitas teste
    const nome = "Caipirinha de morango"
    const imagem = "https://images.pexels.com/photos/27626304/pexels-photo-27626304/free-photo-of-comida-alimento-refeicao-frio.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"

    const criarReceita = async(e) => {
        e.preventDefault()

        axios.post("http://127.0.0.1:5000/api/postar_receita", 
            {
                "nome_receita": nome, 
                "imagem_receita": imagem, 
                "id_usuario": usuario.id
            })
        .then(response => console.log(response))
        .catch(err => console.log(err))
    }

    return (
        <div className="w-full h-screen">
            {usuario ? (              // as vezes a pag carregava antes de processar os dados, e n gerava o usuario no fetchUsuario
                <div className="flex flex-col items-center gap-10 mt-12">
                    <div className="w-11/12 relative left-3">
                        <h1 className="text-5xl text-chocolate-cosmos">Bem vindo, {usuario.usuario}</h1>  
                    </div>
                    <div className="bg-white w-11/12 h-96">

                    </div>
                    <div className="">
                        <button onClick={logout} className="text-slate-100 text-lg bg-redwood pt-1 pb-1 pl-4 pr-4">Sair</button>
                    </div>
                </div>
            ) : (
                <div className="flex justify-center items-center mt-12">
                    <h1 className="text-5xl text-chocolate-cosmos">Carregando...</h1>
                </div>
            )}
        </div>
    );
};

export default Usuario;