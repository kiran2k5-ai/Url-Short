import {
    createContext,
    useContext,
    useState
} from "react";

const AuthContext =
    createContext();

export function AuthProvider({
    children
}) {

    const [token, setToken] =
        useState(
            localStorage.getItem(
                "token"
            )
        );

    const login = (
        jwtToken
    ) => {

        localStorage.setItem(
            "token",
            jwtToken
        );

        setToken(jwtToken);
    };

    const logout = () => {

        localStorage.removeItem(
            "token"
        );

        setToken(null);
    };

    return (

        <AuthContext.Provider
            value={{
                token,
                login,
                logout,
                isAuthenticated:
                    !!token
            }}
        >

            {children}

        </AuthContext.Provider>

    );
}

export const useAuth = () =>
    useContext(AuthContext);