import { Link as a } from "react-router-dom";

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
    <nav>
    <div className="logo">
      <a href="#"><img src="./images/logo.png" alt="Your Logo"/></a>
    </div>
    <ul>
      <li><a href="#">Home</a></li>
      <li><a href="#">About</a></li>
      <li><a href="#">Services</a></li>
      <li><a href="#">Contact</a></li>
    </ul>
  </nav>
  );
};
