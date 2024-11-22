import { useState } from "react";
import axios from "axios";

import "../../components/css/Login.css"

const Cadastro = () => {

    const [nome, setNome] = useState("");
    const [senha, setSenha] = useState("");

    const enviarDados = async(e) => {
        e.preventDefault();

        try{
            const response = await axios.post("http://127.0.0.1:5000/api/cadastro", {nome, senha,});

            if (response.status === 201) {
                alert('Cadastro realizado com sucesso!');
                // Ou atualize um estado para exibir uma mensagem na interface
            }

        } catch (error) {
            console.error("Erro ao enviar dados: ", error);
            alert('Erro ao cadastrar. Tente novamente.');
        }

        setNome("");
        setSenha("");
    };

    return (

        <div className="flex justify-center items-center w-full h-screen">
            <form className="flex flex-col items-center justify-center gap-8 w-2/5 h-3/4 bg-slate-100 rounded-lg tela-login" onSubmit={enviarDados}>
                <h1 className="text-redwood font-bold text-3xl mb-4">CADASTRO</h1>
                <div className="flex flex-col gap-4 w-full">
                    <div className="flex flex-col gap-1">
                        <label className="relative left-1/3" for="username">Usuário</label>
                        <input className="w-1/3 relative left-1/3 h-7" type="text" id="username" name="username" value={nome} onChange={(e) => setNome(e.target.value)} required></input>
                    </div>
                        
                    <div className="flex flex-col gap-1">
                        <label className="relative left-1/3" for="password">Senha</label>
                        <input className="w-1/3 relative left-1/3 h-7" type="password" id="password" name="password" value={senha} onChange={(e) => setSenha(e.target.value)} required></input>
                    </div>
                </div>
                <div className="w-3/12">
                    <div>
                        <button className="bg-redwood w-full h-10 rounded-sm" type="submit"><p className="text-white">Cadastrar</p></button>
                    </div>
                </div>         
            </form>
        </div>

    );
};

export default Cadastro