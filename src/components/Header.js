import { Link as a } from "react-router-dom";

export const Header = () => {

  const logged = 
    (<div id="user">
      <a to="/create">Create Game</a>
      <a to="/logout">Logout</a>
    </div>)
  const guest = 
    (
      <div id="guest">
          <a to="/login">Login</a>
          <a to="/register">Register</a>
      </div>
    )
  return (
    <header>
      <nav>
        <a to=""></a>
        <a to="/catalog">All games</a>
        {/*authData.accessToken ? logged : guest*/}
        
      </nav>
    </header>
    
  );
};
