import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPublicUser } from "../services/authService";
export const DietDay = (props) => {

  const [user, setUser] = useState({});

  useEffect(() => {
    (async () => {
      const data = await getPublicUser(props.day._ownerId);
      setUser(data[0])
    })();

  }, []);
    return (
        <div className="dietDayHome">
            <img src={user.profilePic} alt="Profile picture" className="profileImg"/>
            <h3>{user.username}'s</h3>
            <h3>Day {props.day.day}</h3>
            <Link to={`/details/${props.day._id}`} className="btn details-btn">
                Details
            </Link>
        </div>
    );
};
