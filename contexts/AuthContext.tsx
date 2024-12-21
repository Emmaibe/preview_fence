import React, {createContext, useContext, useEffect, useState} from "react";
import {axiosInstance} from "@/api/AxiosInstance";
import {deleteFromSecureStorage, getFromSecureStorage, saveToSecureStorage} from "@/api/SecureStorage";
import {UserType} from "@/utils/Types";


interface AuthProps {
    authState?: { token: string | null; authenticated: boolean | null };
    user?: UserType;
    onRegister?: ( email: string, phoneNumber: string, firstName: string, lastName: string, companyName: string ) => Promise<any>;
    onVerifyEmail?: ( email: string, otp: string ) => Promise<any>;
    onLogin?: ( email: string ) => Promise<any>;
    onVerify?: ( email: string, otp: string ) => Promise<any>;
    onLogout?: () => Promise<any>;
}

const AuthContext = createContext<AuthProps>({});

interface AuthProviderProps {
    children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {

    const [authState, setAuthState] = useState<{
        token: string | null;
        authenticated: boolean | null;
    }>({
        token: null,
        authenticated: null
    });

    const [user, setUser] = useState<UserType>({});

    useEffect(() => {
        const checkAuth = async () => {
            const token = await getFromSecureStorage("token");

            if (token) {
                setAuthState({
                    token,
                    authenticated: true
                });

                axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            } else {
                setAuthState({
                    token: null,
                    authenticated: false
                });
            }
        }

        checkAuth();
    }, []);

    const register = async (email: string, phoneNumber: string, firstName: string, lastName: string, companyName: string) => {
        try {
            return await axiosInstance.post("/users/register", {
                email,
                phoneNumber,
                firstName,
                lastName,
                companyName
            })
        } catch (e) {
            return {error: e, msg: (e as any).response.data.msg}
        }
    }

    const verifyEmail = async (email: string, otp: string) => {
        try {
            return await axiosInstance.post("/users/verify-email", {
                email,
                otp
            });

        } catch (e) {
            return {error: e, msg: (e as any).response.data.msg}
        }
    }

    const login = async (email: string) => {
        try {
            return await axiosInstance.post("/users/login", {
                email
            });

        } catch (e) {
            return {error: e, msg: (e as any).response.data.msg}
        }
    }

    const verifyLogin = async (email: string, otp: string) => {
        try {
            const result = await axiosInstance.post("/users/login/verify", {
                email,
                otp
            });

            setAuthState({
                token: result.data.token,
                authenticated: true
            });

            axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${result.data.token}`;

            await saveToSecureStorage("token", result.data.token);
            setUser(result.data.user);

            return result;

        } catch (e) {
            return {error: e, msg: (e as any).response.data.msg}
        }
    }

    const logout = async () => {
        try {
            await deleteFromSecureStorage("token");

            delete axiosInstance.defaults.headers.common["Authorization"];

            setAuthState({
                token: null,
                authenticated: false
            });

        } catch (e) {
            return {error: e, msg: (e as any).response.data.msg}
        }
    }

    const value = {
        authState,
        user,
        onRegister: register,
        onVerifyEmail: verifyEmail,
        onLogin: login,
        onVerify: verifyLogin,
        onLogout: logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuthContext must be used within a AuthProvider");
    }
    return context;
};
