import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
    const [isAsideOpen, setIsAsideOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    const location = useLocation();

    // Atualiza isMobile quando o tamanho da tela mudar
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 1280);
        };

        window.addEventListener('resize', handleResize);

        // Chamada inicial
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Fecha o aside quando muda de rota, mas só se for mobile
    useEffect(() => {
        if (isMobile) {
            setIsAsideOpen(false);
        }
    }, [location.pathname, isMobile]);

    // Abre o aside automaticamente se não for mobile
    useEffect(() => {
        if (!isMobile) {
            setIsAsideOpen(true);
        }
    }, [isMobile]);

    const toggleAside = () => setIsAsideOpen(prev => !prev);

    return (
        <SidebarContext.Provider value={{ isAsideOpen, toggleAside }}>
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebar = () => useContext(SidebarContext);
