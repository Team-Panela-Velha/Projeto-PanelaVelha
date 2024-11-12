import React, { useEffect, useState } from 'react';
import Searchbar from './Searchbar';
import './css/Aside.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Aside() {

    const [data, setData] = useState({});
    // Essa função busca os dados no local host do flask e os adiciona às variáveis
    useEffect(() => {
        fetch("http://127.0.0.1:5000/membros").then(
            res => res.json()
        ).then(
            data => {
                setData(data)
                console.log(data)
            }
        )
    }, [])
    // Adicionei uma div para mostrar a lista de membros abaixo da lista de paginas

    return (
        <>

            <aside className='aside-fixo flex flex-col w-1/5 bg-redwood h-screen'>
                <div className='flex justify-center items-center gap-5 pt-6'>
                    <img className="rounded-full w-14 h-14 border-2 border-chocolate-cosmos" src="src/assets/img/logo.png" alt="Logo Panela Velha" />
                    <h1 className='font-black text-jet text-3xl w-1/2'>PANELA VELHA</h1>
                </div>
                <div className="flex justify-center pt-6 pb-6 w-full">
                    <Searchbar />
                </div>
                <nav className='flex justify-start pl-7 w-full'>
                    <ul className='flex flex-col items-start uppercase text-sm font-semibold text-snow'>
                        <li className='pb-2'>home</li>
                        <li className='pb-2'>receitas</li>
                        <li className='pb-2'>prateleira</li>
                        <li className='pb-2'>salvas</li>
                        <li className='pb-2'>cadastro</li>
                    </ul>
                </nav>
                <div>
                    {(typeof data.membros === 'undefined') ? (
                        <p>Carregando...</p>
                    ) : (
                        data.membros.map((membros, i) => (
                            <p key={i}>{membros}</p>
                        ))
                    )}
                </div>
                <div className='flex flex-col justify-end items-start pl-7 pb-5 w-full h-full'>
                    <div className='flex'>
                        <a href='#'><i className="icons bi bi-instagram pr-2 text-jet"></i></a>
                        <a href="#"><i class="icons bi bi-github text-jet"></i></a>
                    </div>
                    <div>
                        <p className='text-xs text-snow pt-2'>
                            © Panela Velha, Todos os direitos reservados.
                        </p>
                    </div>
                </div>
            </aside>
        </>
    );
}

export default Aside;
