import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPublicUser } from "../services/authService";

export const MyProfile = () => {

  const userId = JSON.parse(localStorage.getItem("authData"))._id;
  const publicUserId = JSON.parse(localStorage.getItem("authData")).publicUserId;
  const [user, setUser] = useState({});

  useEffect(() => {
    (async () => {
      const data = await getPublicUser(userId);
      setUser(data)
    })();

  }, []);
  const caloriesIntake = <h3>Calories intake: <span>{user.calories}</span></h3>
    return (
        <>
          <h1 className="title">My Profile</h1>
          <div className="container">
            <div className="profile">
              <h1 className="username">{user.username}</h1>
              <img src={user.profilePic} alt="Profile picture" />
              <Link to={`/updateProfile/${publicUserId}`} className="btn update-profile-btn">Update profile</Link>
              {user.calories > 0 ? caloriesIntake : ""}
              <h3>Descripton:</h3>
              <p>
               {user.description}
              </p>
            </div>
          </div>
        </>

    );
}