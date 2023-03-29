import { Route, Routes } from "react-router";
import "./App.css";
import { CreateDietDay } from "./components/CreateDietDay";
import { Header } from "./components/Header";
import { HomePage } from "./components/HomePage";
import { Login } from "./components/Login";
import {Logout} from "./components/Logout";
import { MyProfile } from "./components/MyProfile";
import { Register } from "./components/Register";
import { UpdateProfile } from "./components/UpdateProfile";
import { AuthContext } from "./contexts/AuthContext";
import { useLocalStorage } from "./hooks/useLocalStorageHook";


function App() {
    const [auth, setAuth] = useLocalStorage('authData', {});

    const userLogin = (authData) => {
        setAuth(authData);
    };
    const publicUserLogin = (authData) => {
        setAuth(authData);
    };

    const userLogout = () => {
        setAuth({});
    };
    return (
        <AuthContext.Provider value={{auth, userLogin, userLogout, publicUserLogin}}>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/myProfile" element={<MyProfile />} />
                <Route path="/create" element={<CreateDietDay />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/updateProfile/:publicUserId" element={<UpdateProfile />} />
                 {/* 
                 <Route path="/details/:gameId" element={<Details />} />
                 <Route path="/edit/:gameId" element={<EditGame />} />  */}
            </Routes>
        </AuthContext.Provider>
    );
}

export default App;
