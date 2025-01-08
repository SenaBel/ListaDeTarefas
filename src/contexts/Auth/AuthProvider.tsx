import { useEffect, useState } from "react";

import LoginService from "../../services/LoginService";

import { AuthContext } from "./AuthContext";
import IUser from "../../interfaces/IUser";

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const validateToken = async () => {
      const storageData = localStorage.getItem("authToken") ?? "";
      if (storageData) {
        try {
          const data = await LoginService.validateToken(storageData);
          if (data.user) {
            setUser(data.user);
          }
        } catch (error) {
          console.error("Token inválido ou expirado.", error);
          signout(); // Faz logout automático se o token for inválido.
        }
      }
    };
    validateToken();
  }, []);

  const signin = async (email: string, password: string) => {
    try {
      const user: IUser = { email, password };
      const data = await LoginService.signin(user);
      console.log("data..", data);
      if (data.data?.user && data.data?.token) {
        setUser(data.data.user);
        setToken(data.data.token);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      return false;
    }
  };

  const signout = async () => {
    console.log("signout está sendo executada.");
    await LoginService.signout();
    setUser(null);
    setToken("");
  };

  const setToken = (token: string | null) => {
    if (token) {
      localStorage.setItem("authToken", token); // Salva o token apenas se não for null
    } else {
      localStorage.removeItem("authToken"); // Remove o token se for null
    }
  };

  return (
    <AuthContext.Provider value={{ user, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
};
