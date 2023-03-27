import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
export const Header = () => {

      const {publicUserId} = useContext(AuthContext);
      const logged = (
        <>
            <li>
                <Link to="/create">Create</Link>
            </li>
            <li>
                <Link to="/logout">Logout</Link>
            </li>
            <li>
                <Link to="/myProfile">My profile</Link>
            </li>
        </>
      );
      const guest = (
        <>
           <li>
                <Link to="/login">Login</Link>
            </li>
            <li>
                <Link to="/register">Register</Link>
            </li>
        </>
      );

    return (
        <>
            <nav>
                <div className="logo">
                    <Link to="/">
                        <img src="http://localhost:3000/images/logo.png" alt="Your Logo" />
                    </Link>
                </div>
                <ul>
                    {publicUserId ? logged : guest}
                </ul>
            </nav>
        </>
    );
};
