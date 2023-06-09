import { Route, Routes } from "react-router";
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
import { MyPosts } from "./components/MyPosts";
import { CalorieCalculator } from "./components/CalorieCalculator";
import { Detals } from "./components/Details";
import { EditDietDay } from "./components/EditDietDay";
import { Page401 } from "./components/errorPages/page401";
import { Page404 } from "./components/errorPages/page404";

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
                <Route path="/myPosts" element={<MyPosts />} />
                <Route path="/calorieCalculator" element={<CalorieCalculator />} />
                <Route path="/create" element={<CreateDietDay />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/error401" element={<Page401/>} />
                <Route path="/myProfile/:publicUserId" element={<MyProfile />} />
                <Route path="/updateProfile/:publicUserId" element={<UpdateProfile />} />
                <Route path="/details/:dietDayId" element={<Detals />} />
                <Route path="/edit/:dietDayId" element={<EditDietDay />} /> 
                <Route path="*" element={<Page404/>} />

            </Routes>
        </AuthContext.Provider>
    );
}

export default App;
