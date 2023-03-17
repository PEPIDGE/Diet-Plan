import "./App.css";
import { CreateDietDay } from "./components/CreateDietDay";
import { Header } from "./components/Header";
import { HomePage } from "./components/HomePage";
import { Login } from "./components/Login";
import { MyProfile } from "./components/MyProfile";
import { Register } from "./components/Register";

function App() {
    return (
        <>
            <Header />
            <MyProfile />
            <HomePage />
        </>
    );
}

export default App;
