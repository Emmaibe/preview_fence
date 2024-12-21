import React, {createContext} from "react";
import {UserType} from "@/utils/Types";

interface UserContextType {
    user: UserType;
    setUser: (user: UserType) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserContextProviderProps {
    children: React.ReactNode;
}

const UserContextProvider: React.FC<UserContextProviderProps> = ({children}) => {
    const [user, setUser] = React.useState<UserType>({});

    const value = {user, setUser};

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;

export const useUserContext = () => {
    const context = React.useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUserContext must be used within a ModalContextProvider");
    }
    return context;
};
