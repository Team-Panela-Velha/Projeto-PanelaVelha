import { useEffect, useState } from "react";
import axios from "axios";

function Gerenciador () {
    const [user, setUser] = useState(null);

    async function fetchUser() {
        const token = localStorage.getItem('jwtToken'); // Obter o token do localStorage

        axios.get('http://127.0.0.1:5000/api/verificar_usuario', {
            headers: {
                "Authorization": token, // Passa o token no cabeçalho Authorization
            },
        })
            .then(response => {
                console.log(response.data)
                setUser(response.data);
            })
    }

    useEffect(() => {
        fetchUser();
    }, []);
    
    return (
        <>
            {user && user.admin === 1 ? (
                <p>usuario é adm</p>
            ) : (
                <p>n tem permissao</p>
            )}  
        </>
    );
};

export default Gerenciador;