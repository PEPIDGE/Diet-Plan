import { Route, Routes } from "react-router";
import "./App.css";
import { CreateDietDay } from "./components/CreateDietDay";
import { Header } from "./components/Header";
import { HomePage } from "./components/HomePage";
import { Login } from "./components/Login";
import { MyProfile } from "./components/MyProfile";
import { Register } from "./components/Register";
import { UpdateProfile } from "./components/UpdateProfile";

function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/myProfile" element={<MyProfile />} />
                <Route path="/create" element={<CreateDietDay />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/updateProfile/:userId" element={<UpdateProfile />} />
                 {/* <Route path="/logout" element={<Logout />} />
                 <Route path="/details/:gameId" element={<Details />} />
                 <Route path="/edit/:gameId" element={<EditGame />} />  */}
            </Routes>
        </>
    );
}

export default App;
