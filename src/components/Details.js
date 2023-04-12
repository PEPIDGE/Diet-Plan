import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getPublicUser } from "../services/authService";
import { getOne } from "../services/dietDayService";
import { AuthContext } from "../contexts/AuthContext";

export const Detals = () => {
    
    const { dietDayId } = useParams();
    const [dietDay, setdietDay] = useState({});
    const [user, setUser] = useState({});
    const {auth} = useContext(AuthContext);

    useEffect(() => {
      (async () => {
        const dietDayData = await getOne(dietDayId);
        console.log(dietDayData);
        setdietDay(dietDayData);

        const userData = await getPublicUser(dietDayData._ownerId);
        console.log(userData);
        setUser(userData);
        
      })();
    }, []);

    const ownerButtons = <><Link className="btn detailsPage-btn" to={`/edit/${dietDay._id}`}>Edit</Link> <Link className="btn detailsPage-btn" to={`/delete/${dietDay._id}`}>Delete</Link></>;
    const guestButtons =  <Link className="btn detailsPage-btn" to={`/myProfile/${user._id}`}>View profile</Link>;
    
    return(
        <>
          <h1 className="details-title">Details</h1>
          <div className="details-container">
            <div className="details"> 
            {user && dietDay ? <h1>{user.username}'s day {dietDay.day}</h1> : ""}
            <table>
              <thead>
              <tr>
                <th>Meal type</th>
                <th>Meal</th>
                <th>Calories</th>
              </tr>
              </thead>
             <tbody>
             <tr>
                <td>Breakfast</td>
                {dietDay ? <td>{dietDay.breakfast}</td> : ""}
                {dietDay ? <td>{dietDay["breakfast-calories"]}</td> : ""}
              </tr>
              <tr>
                <td>Lunch</td>
                {dietDay ? <td>{dietDay.lunch}</td> : ""}
                {dietDay ? <td>{dietDay["lunch-calories"]}</td> : ""}
              </tr>
              <tr>
                <td>Afternoon</td>
                {dietDay ? <td>{dietDay.afternoon}</td> : ""}
                {dietDay ? <td>{dietDay["afternoon-calories"]}</td> : ""}
              </tr>
              <tr>
                <td>Dinner</td>
                {dietDay ? <td>{dietDay.dinner}</td> : ""}
                {dietDay ? <td>{dietDay["dinner-calories"]}</td> : ""}
              </tr>
             </tbody>
            </table>
            
              
            {dietDay ? <h2>Total calories: {dietDay.totalCalories}</h2> : ""}
            {user && user?.calories === 0 ? <h2>{user.username} hasn't calculated their calories intake</h2> : <h2>Calories limit: {user.calories}</h2> }
            {user && user?.calories > 0 && user?.calories >= dietDay?.totalCalories ? <h2 className="successful">The diet day was succesful!</h2> : ""}
            {user && user?.calories > 0 && user?.calories < dietDay?.totalCalories ? <h2 className="unsuccessful">The diet day was unsuccesful!</h2> : ""}
            
            <div className="buttons">

            {user._ownerId === auth._id ? ownerButtons : guestButtons}
            </div>
            </div>
          </div>
          
        </>
    );
} 