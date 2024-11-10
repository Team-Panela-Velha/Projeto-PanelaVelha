import React from 'react';
import Searchbar from './Searchbar';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Aside() {
    return (
        <>
            <aside className='flex flex-col w-1/5 bg-redwood h-screen'>
                <div className='flex justify-center gap-3 items-center w-full h-1/6 m-3'>
                    <img className="rounded-full w-12 h-12" src="src/assets/img/logo.png" alt="Logo Panela Velha" />
                    <h1 className='font-black text-jet text-3xl'>PANELA VELHA</h1>
                </div>
                <div className="px-3 pb-9 w-full">
                    <Searchbar />
                </div>
                <nav className='flex justify-start pl-4 w-full'>
                    <ul className='flex flex-col items-start uppercase text-sm font-semibold text-snow'>
                        <li className='pb-2'>home</li>
                        <li className='pb-2'>receitas</li>
                        <li className='pb-2'>prateleira</li>
                        <li className='pb-2'>salvas</li>
                        <li className='pb-2'>cadastro</li>
                    </ul>
                </nav>
                <div className='flex flex-col justify-end items-start pl-4 pb-5 w-full h-full'>
                    <div className='flex'>
                        <i class="bi bi-instagram pr-2 text-jet"></i>
                        <i class="bi bi-github text-jet"></i>
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
