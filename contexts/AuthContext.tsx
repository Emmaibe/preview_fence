import React, { createContext, useContext, useEffect, useState } from "react";
import { axiosInstance } from "@/api/AxiosInstance";
import {
  deleteFromSecureStorage,
  getFromSecureStorage,
  saveToSecureStorage,
} from "@/api/SecureStorage";
import { UserType } from "@/utils/Types";
import {
  getFromAsyncStorage,
  getObjectFromAsyncStorage,
  saveObjectToAsyncStorage,
  saveToAsyncStorage,
} from "@/api/AsynStorage";
import { router } from "expo-router";

interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null };
  user?: UserType;
  loading: boolean;
  onRegister?: (
    email: string,
    phoneNumber: string,
    firstName: string,
    lastName: string,
    companyName: string
  ) => Promise<any>;
  onVerifyEmail?: (email: string, otp: string) => Promise<any>;
  onLogin: (email: string) => Promise<any>;
  onVerify?: (email: string, otp: string) => Promise<any>;
  onLogout?: () => Promise<any>;
}

const AuthContext = createContext<AuthProps>({} as AuthProps);

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>({
    token: null,
    authenticated: null,
  });

  const [user, setUser] = useState<UserType>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await getFromSecureStorage("token");
      const userId = await getFromSecureStorage("userId");

      console.log(token, userId);

      if (token) {
        setAuthState({
          token,
          authenticated: true,
        });

        setUser(user);

        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${token}`;

        const res = await axiosInstance.get("/users/" + userId);
        console.log(res.status);
        if (res.status == 200) {
          setUser(res.data);
          console.log(res.data, "here is the user");
        } else if (res.status == 404) {
          setAuthState({
            token: null,
            authenticated: false,
          });
        }

        // router.replace("/home");
      } else {
        setAuthState({
          token: null,
          authenticated: false,
        });
        // router.replace("/auth/login");
      }
    };

    checkAuth().finally(() => {
      setLoading(false);
      setTimeout(() => {
        router.replace("/");
      }, 2000);
    });
  }, []);

  const register = async (
    email: string,
    phoneNumber: string,
    firstName: string,
    lastName: string,
    companyName: string
  ) => {
    try {
      return await axiosInstance.post("/users/register", {
        email,
        phoneNumber,
        firstName,
        lastName,
        companyName,
      });
    } catch (e) {
      return { error: e, msg: (e as any).response.data.msg };
    }
  };

  const verifyEmail = async (email: string, otp: string) => {
    try {
      return await axiosInstance.post("/users/verify-email", {
        email,
        otp,
      });
    } catch (e) {
      return { error: e, msg: (e as any).response.data.msg };
    }
  };

  const login = async (email: string) => {
    try {
      const res = await axiosInstance.post("/users/login", {
        email,
      });
      return res;
    } catch (e) {
      if ((e as any)?.response.status == 404) {
        router.replace("/auth/register");
      } else return { error: e, msg: (e as any).response.data.msg };
    }
  };

  const verifyLogin = async (email: string, otp: string) => {
    try {
      const result = await axiosInstance.post("/users/login/verify", {
        email,
        otp,
      });

      setAuthState({
        token: result.data.token,
        authenticated: true,
      });

      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${result.data.token}`;

      // await saveToAsyncStorage("token", result.data.token);
      // await saveObjectToAsyncStorage("user", result.data.user);

      await saveToSecureStorage("token", result.data.token);
      await saveToSecureStorage("userId", result.data.user.id);

      setUser(result.data.user);

      return result;
    } catch (e) {
      return { error: e, msg: (e as any).response.data.msg };
    }
  };

  const logout = async () => {
    try {
      await deleteFromSecureStorage("token");

      delete axiosInstance.defaults.headers.common["Authorization"];

      setAuthState({
        token: null,
        authenticated: false,
      });
    } catch (e) {
      return { error: e, msg: (e as any).response.data.msg };
    }
  };

  const value = {
    authState,
    user,
    onRegister: register,
    onVerifyEmail: verifyEmail,
    onLogin: login,
    onVerify: verifyLogin,
    onLogout: logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }
  return context;
};
