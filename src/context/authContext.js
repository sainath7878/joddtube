import { createContext, useContext, useReducer, useState } from "react"
import { initialState, authReducer } from "reducer/AuthReducer";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify";


const AuthContext = createContext();

function AuthProvider({ children }) {

    const [error, setError] = useState({ msg: "", state: false });
    const [authState, authDispatch] = useReducer(authReducer, initialState);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from || "/";

    const signInHandler = async (loginDetails) => {
        const { email, password } = loginDetails;

        try {
            const response = await axios.post("/api/auth/login", {
                email: email,
                password: password,
            });
            if (response.status === 200) {
                localStorage.setItem("token", response.data.encodedToken);
                authDispatch({
                    type: "SET_USER",
                    payload: { encodedToken: response.data.encodedToken },
                });
                navigate(`${from}`, { replace: true });
                toast.success("Successfully Logged In");
            }
        } catch (err) {
            console.log("Error while signin In ", err);
            setError({ msg: "Please Enter valid Credentials", state: true });
            toast.error(err.response.data.errors[0])
        }
    };

    const signUpHandler = async ({ fullName, email, password }) => {
        try {
            const response = await axios.post("/api/auth/signup", {
                email: email,
                password: password,
                fullName: fullName,
            });
            if (response.status === 201) {
                localStorage.setItem("token", response.data.encodedToken);
                authDispatch({ type: "SET_USER", payload: { encodedToken: response.data.encodedToken } })
                navigate("/", { replace: true });
            }
        } catch (err) {
            setError({ msg: "Try again after some time", status: true });
            console.log("Could not signUp", err);
        }
    };

    const logoutHandler = () => {
        localStorage.removeItem("token");
        authDispatch({ type: "SET_USER", payload: { encodedToken: null } })
        toast.error("Logged Out")
    }

    return (
        <AuthContext.Provider value={{ authState, authDispatch, signInHandler, error, setError, signUpHandler, logoutHandler }}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider }