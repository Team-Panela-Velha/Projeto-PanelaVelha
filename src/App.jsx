
import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import Aside from './components/Aside';
import Slider from "./components/Slider";

function App() {

    return (
        <div className="flex min-h-screen">
            <Aside />
            <main className='flex flex-col w-[80%] ml-[20%] bg-peaches'>
                <div className="w-full h-screen">
                    <Slider />
                </div>
            </main>
        </div>
    );
}

export default App;
