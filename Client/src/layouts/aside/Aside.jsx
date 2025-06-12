import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import Searchbar from '../../components/searchbar/Searchbar'
import axios from "axios"
import Logo from "../../assets/img/logo.png";
import '../aside/Aside.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { useSidebar } from '../../context/SidebarContext';

function Aside() {
    const [user, setUser] = useState(null);
    const { isAsideOpen, toggleAside } = useSidebar();; // Controla se a sidebar está aberta
    const [isMobile, setIsMobile] = useState(false); // Detecta se está em um dispositivo móvel

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

 
    

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1280);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <>
            <aside className={`aside-fixo flex flex-col bg-redwood h-screen relative 
                ${isAsideOpen ? 'w-64' : 'w-16'} duration-300 z-50`}>
                <div className='flex justify-center items-center gap-5 pt-6'>
                    <Link to="/">
                        <img className={`rounded-full w-14 h-14 border-2 border-chocolate-cosmos  ${isAsideOpen ? 'pt-0' : 'mt-10'}`} src={Logo} alt="Logo Panela Velha" />
                    </Link>
                    <Link to="/" className={`${isAsideOpen ? 'w-[40%]' : 'hidden'}`}>
                        {isAsideOpen && (
                            <Link to="/" className="w-[40%]">
                                <h1 className="font-black text-jet text-3xl w-1/2">PANELA VELHA</h1>
                            </Link>
                        )}
                    </Link>
                </div>

                <div className="flex justify-center pt-6 pb-6 w-full">
                    <Searchbar />
                </div>
                <nav className={`flex justify-start w-full ${isAsideOpen ? 'pl-7' : 'pl-0'}`}>
                    <ul className={`flex flex-col items-start uppercase font-semibold text-peaches 
                    ${isAsideOpen ? 'text-lg sm:text-2xl lg:text-lg' : 'text-4xl w-full items-center'}`}>
                        <li className="pb-2 duration-100 hover:text-chocolate-cosmos">
                            <Link to="/" className={`flex items-center ${!isAsideOpen && 'justify-center w-full pb-3'}`}>
                                {isAsideOpen ? 'Início' : <i className="bi bi-house"></i>}
                            </Link>
                        </li>
                        <li className='pb-2 duration-100 hover:text-chocolate-cosmos'>
                            <Link to="/receitas" className={`flex items-center ${!isAsideOpen && 'justify-center w-full pb-3'}`}>
                                {isAsideOpen ? 'Receitas' : <i className="bi bi-cookie"></i>}
                            </Link>
                        </li>
                        <li className='pb-2 duration-100 hover:text-chocolate-cosmos'>
                            {user ? (
                                <Link to="/usuario" className={`flex items-center ${!isAsideOpen && 'justify-center w-full pb-3'}`}>
                                    {isAsideOpen ? user.usuario : <i className="bi bi-person-fill"></i>}
                                </Link>
                            ) : (
                                <Link to="/login" className={`flex items-center ${!isAsideOpen && 'justify-center w-full pb-3'}`}>
                                    {isAsideOpen ? 'Login' : <i className="bi bi-person-fill"></i>}
                                </Link>
                            )}
                        </li>
                        <li>
                            {user && user.admin === 1 && (
                                <Link to="/gerenciador" className={`flex items-center ${!isAsideOpen && 'justify-center w-full pb-3'}`}>
                                    {isAsideOpen ? 'Gerenciador' : <i className='bi bi-person-fill'></i>}
                                </Link>
                            )}
                        </li>
                    </ul>
                </nav>

                {isAsideOpen && (
  <div className="flex flex-col justify-end items-start pl-7 pb-5 w-full h-full">
    <div className='flex'>
      <a href="#"><i className="icons bi bi-instagram pr-2 text-jet max-lg:text-2xl"></i></a>
      <a href="#"><i className="icons bi bi-github text-jet max-lg:text-2xl"></i></a>
    </div>
    <div>
      <p className='text-sm sm:text-lg lg:text-sm  text-snow pt-2'>
        © Panela Velha, Todos os direitos reservados.
      </p>
    </div>
  </div>
)}

                {/* Botão para alternar a sidebar em dispositivos móveis */}
                {isMobile && (
                    <button onClick={toggleAside} className={`absolute top-3 ${isAsideOpen?  'right-[-12px] ' :  'right-[10px]'} text-4xl rounded-full w-10 h-10 flex justify-center items-center border-none cursor-pointer text-peaches`}>
                        <i className={`bi ${isAsideOpen ? 'bi-chevron-left' : 'bi-chevron-right '}`}></i>
                    </button>
                )}
            </aside>
        </>
    );
}

export default Aside;
