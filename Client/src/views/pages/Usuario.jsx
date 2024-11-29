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
            <div>
                <h1 className="text-5xl text-chocolate-cosmos">Bem vindo, {usuario.usuario}</h1>
            </div>
            <div>
                <button onClick={criarReceita}>criar receita</button>
            </div>
            <div>
                <button onClick={logout}>Sair</button>
            </div>
        </div>
    );
};

export default Usuario;