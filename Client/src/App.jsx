
import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Aside from './components/layouts/Aside';
import Content from "./components/layouts/Content"



function App() {

    return (
        <div className="flex min-h-screen bg-peaches overflow-x-hidden">
            <BrowserRouter>
                <Aside />
                <Content />
            </BrowserRouter>
        </div>
    );
}

export default App;
