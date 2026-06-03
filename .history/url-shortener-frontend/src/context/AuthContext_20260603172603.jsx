import {
    createContext,
    useContext,
    useState,
    useEffect
} from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    const [token, setToken] = useState(
        localStorage.getItem("token")
    );

    useEffect(() => {

        const storedToken =
            localStorage.getItem("token");

        if (storedToken) {
            setToken(storedToken);
        }

    }, []);

    const login = (tokenData, userData = null) => {

        localStorage.setItem(
            "token",
            tokenData
        );

        setToken(tokenData);

        setUser(userData);
    };

    const logout = () => {

        localStorage.removeItem("token");

        setToken(null);

        setUser(null);
    };

    return (

        <AuthContext.Provider
            value={{
                token,
                user,
                login,
                logout,
                isAuthenticated: !!token
            }}
        >
            {children}
        </AuthContext.Provider>

    );
}

export const useAuth = () =>
    useContext(AuthContext);