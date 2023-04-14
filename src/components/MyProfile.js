import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPublicUserWithPublicUserId } from "../services/authService";

export const MyProfile = () => {

  const { publicUserId } = useParams();

  const userAuth = localStorage.getItem('authData');
  const auth = JSON.parse(userAuth || "{}");
  const userId = auth ? auth._id : "{}";

  const [user, setUser] = useState({});

  useEffect(() => {
    (async () => {
      const data = await getPublicUserWithPublicUserId(publicUserId);
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
              {user._ownerId === userId ? <Link to={`/updateProfile/${publicUserId}`} className="btn update-profile-btn">Update profile</Link> : ""}
              
              {user.calories > 0 ? caloriesIntake : ""}
              <h3>Descripton:</h3>
              {user.description ? <p> {user.description} </p> : <p>No description yet</p>}
            </div>
          </div>
        </>

    );
}