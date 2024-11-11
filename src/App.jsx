
import React from 'react';
import './App.css';
import Aside from './components/Aside';

function App() {
    return (
        <div className="flex min-h-screen">
            <Aside />
            <main className='flex flex-col w-[80%] ml-[20%] bg-peaches'>
                <div className="w-full h-screen">
                    <div className='flex justify-center w-[65%] h-[60%] m-5 bg-black'>h</div>
                </div>
            </main>
        </div>
    );
}

export default App;
