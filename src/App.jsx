
import React from 'react';
import './App.css';
import Aside from './components/Aside';
import Slider from "./components/Slider";

function App() {
    return (
        <div className="flex min-h-screen bg-peaches">
            <Aside />
            <main className='flex flex-col w-[80%] ml-[21%] bg-peaches'>
                <div className="w-full h-screen">
                    <div className='mt-6'>
                        <Slider />
                    </div>
                </div>
            </main>
        </div>
    );
}

export default App;
