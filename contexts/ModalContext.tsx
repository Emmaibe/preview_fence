import React, { createContext, useContext, useState } from "react";

type ModalContextType = {
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ModalContext = createContext<ModalContextType | undefined>(undefined);

type ModalProviderProps = {
    children: React.ReactNode;
};

const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    return (
        <ModalContext.Provider value={{ isModalOpen, setIsModalOpen }}>
            {children}
        </ModalContext.Provider>
    );
};

export default ModalProvider;

export const useModalContext = (): ModalContextType => {
    const context = useContext(ModalContext);

    if (context === undefined) {
        throw new Error('useModalContext must be used within a ModalProvider');
    }

    return context;
};
