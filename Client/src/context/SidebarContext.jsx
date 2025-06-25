import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
    const [isAsideOpen, setIsAsideOpen] = useState(false);

    const toggleAside = () => setIsAsideOpen(!isAsideOpen);

    const location = useLocation();

    // Fecha o aside automaticamente ao navegar para outra página
    useEffect(() => {
        setIsAsideOpen(false);
    }, [location.pathname]);

    return (
        <SidebarContext.Provider value={{ isAsideOpen, toggleAside }}>
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebar = () => useContext(SidebarContext);
