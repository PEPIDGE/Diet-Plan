export const Header = () => {
    //   const logged = (
    //     <div id="user">
    //       <a to="/create">Create Game</a>
    //       <a to="/logout">Logout</a>
    //     </div>
    //   );
    //   const guest = (
    //     <div id="guest">
    //       <a to="/login">Login</a>
    //       <a to="/register">Register</a>
    //     </div>
    //   );

    return (
        <>
            <nav>
                <div className="logo">
                    <a href="#">
                        <img src="./images/logo.png" alt="Your Logo" />
                    </a>
                </div>
                <ul>
                    <li>
                        <a href="#">Create</a>
                    </li>
                    <li>
                        <a href="#">Login</a>
                    </li>
                    <li>
                        <a href="#">Register</a>
                    </li>
                    <li>
                        <a href="#">Logout</a>
                    </li>
                    <li>
                        <a href="#">My profile</a>
                    </li>
                </ul>
            </nav>
        </>
    );
};
