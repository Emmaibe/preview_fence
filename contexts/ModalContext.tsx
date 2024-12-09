import React, {createContext} from "react";

interface ModalContextType {
    modal: boolean;
    setModal: (modal: boolean) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

interface ModalContextProviderProps {
    children: React.ReactNode;
}

const ModalContextProvider: React.FC<ModalContextProviderProps> = ({children}) => {
    const [modal, setModal] = React.useState<boolean>(false);

    return (
        <ModalContext.Provider value={{modal, setModal}}>
            {children}
        </ModalContext.Provider>
    );
};

export default ModalContextProvider;

export const useModalContext = () => {
    const context = React.useContext(ModalContext);
    if (context === undefined) {
        throw new Error("useModalContext must be used within a ModalContextProvider");
    }
    return context;
};
