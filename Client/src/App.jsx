
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './css/App.css';
import Aside from './layouts/aside/Aside';
import Content from './layouts/content/Content';
import { SidebarProvider } from './context/SidebarContext';




function App() {

    return (


        <div className="flex min-h-screen bg-peaches overflow-x-hidden">

            <BrowserRouter>
                <SidebarProvider>
                    <Aside />
                    <Content />
                </SidebarProvider>

            </BrowserRouter>
        </div>


    );
}

export default App;
