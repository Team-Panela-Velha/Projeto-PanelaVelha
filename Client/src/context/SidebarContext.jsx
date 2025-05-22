import React, { createContext, useContext, useState } from 'react';

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
    const [isAsideOpen, setIsAsideOpen] = useState(true);

    const toggleAside = () => setIsAsideOpen(!isAsideOpen);

    return (
        <SidebarContext.Provider value={{ isAsideOpen, toggleAside }}>
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebar = () => useContext(SidebarContext);
