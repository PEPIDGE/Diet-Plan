import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPublicUser } from "../services/authService";

export const MyProfile = () => {

  const userId = JSON.parse(localStorage.getItem("authData"))._id;
  const publicUserId = JSON.parse(localStorage.getItem("authData")).publicUserId;
  const [user, setUser] = useState({});
  useEffect(() => {
    const publicUser = (async () => {
      const data = await getPublicUser(userId);
      setUser(data[0])
    })();

  }, []);

    return (
        <>
          <h1 className="title">My Profile</h1>
          <div className="container">
            <div className="profile">
              <img src={user.profilePic ? user.profilePic : "https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg"} alt="Profile picture" />
              <Link to={`/updateProfile/${publicUserId}`} className="btn update-profile-btn">Update profile</Link>
              
              <h1>{user.username}</h1>
              <h3>Descripton:</h3>
              <p>
               {user.description}
              </p>
            </div>
          </div>
        </>

    );
}