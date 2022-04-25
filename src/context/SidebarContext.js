import { createContext, useContext, useState, } from "react";

const SidebarContext = createContext();

function SidebarProvider({ children }) {
    const [showSidebar, setShowSidebar] = useState(false)
    return (
        <SidebarContext.Provider value={{ showSidebar, setShowSidebar }}>
            {children}
        </SidebarContext.Provider>
    )
}

const useSidebar = () => useContext(SidebarContext)

export { SidebarProvider, useSidebar }