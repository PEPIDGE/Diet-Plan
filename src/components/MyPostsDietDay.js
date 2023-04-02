import { Link } from "react-router-dom";

export const MyPostsDietDay = ({day, user}) => {

    return (
        <div className="dietDayHome">
            <img src={user.profilePic} alt="Profile picture" className="profileImg"/>
            <h3>{user.username}'s</h3>
            <h3>Day {day.day}</h3>
            <Link to={`/details/${day._id}`} className="btn details-btn">
                Details
            </Link>
        </div>
    );
};
