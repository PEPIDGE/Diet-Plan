import { Link } from "react-router-dom";
export const Header = () => {
    //   const logged = (
    //     <div id="user">
    //       <Link to="/create">Create Game</Link>
    //       <Link to="/logout">Logout</Link>
    //     </div>
    //   );
    //   const guest = (
    //     <div id="guest">
    //       <Link to="/login">Login</Link>
    //       <Link to="/register">Register</Link>
    //     </div>
    //   );

    return (
        <>
            <nav>
                <div className="logo">
                    <Link to="/">
                        <img src="./images/logo.png" alt="Your Logo" />
                    </Link>
                </div>
                <ul>
                    <li>
                        <Link to="/create">Create</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                    <li>
                        <Link to="/register">Register</Link>
                    </li>
                    <li>
                        <Link to="/logout">Logout</Link>
                    </li>
                    <li>
                        <Link to="/myProfile">My profile</Link>
                    </li>
                </ul>
            </nav>
        </>
    );
};
