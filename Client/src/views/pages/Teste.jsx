// import { useState, useEffect } from "react";
// import axios from "axios";

// const Teste = () => {
//     const [userData, setUserData] = useState(null);

//     async function fetchUserData(){
//         const token = localStorage.getItem('jwtToken'); // Obter o token do localStorage
    
//         axios.get('http://127.0.0.1:5000/api/teste', {
//             headers: {
//             "Authorization": token, // Passa o token no cabeçalho Authorization
//             },
//         })
//         .then(response => {
//             setUserData(response.data);
//         })
//         .catch(err => console.error("Erro ao buscar dados do usuário: ", err))
//     }


//     useEffect(() => {
//         fetchUserData();
//     }, []);
    
//     return (
//         <div>
//             {userData ? (
//                 <pre>{JSON.stringify(userData, null, 2)}</pre> // Exibe os dados formatados
//             ) : (
//                 <p>Carregando...</p>
//             )}
//         </div>
//     );
// };


// export default Teste