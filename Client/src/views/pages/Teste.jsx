// import { useState, useEffect } from "react";
// import axios from "axios";

// const Teste = () => {
//     const [receitaData, setReceitaData] = useState(null);

//     async function fetchReceitaData(){    
//         axios.get('http://127.0.0.1:5000/api/receitas/<id_receita>')
//         .then(response => {
//             setReceitaData(response.data);
//         })
//         .catch(err => console.error("Erro ao buscar receita: ", err))
//     }

//     useEffect(() => {
//         fetchReceitaData();
//     }, []);
    
//     return (
//         <div>
//             <h1>{receitaData}</h1>
//         </div>
//     );
// };


// export default Teste