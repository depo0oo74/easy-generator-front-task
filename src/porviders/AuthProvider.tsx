import { useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Cookies from 'js-cookie';

type AuthProviderProps = {
    children: React.ReactNode;
};
  
export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [accessToken, setAccessToken] = useState<string>('');
  
    const login = (accessToken: string) => {
        setAccessToken(accessToken);
        Cookies.set('accessToken', accessToken);
    };
  
    const logout = () => {
        setAccessToken('');
        Cookies.remove('accessToken');
    };
  
    return (
      <AuthContext.Provider value={{ accessToken, login, logout }}>
        {children}
      </AuthContext.Provider>
    );
};