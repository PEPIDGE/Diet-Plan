import { useContext, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getPublicUser } from "../services/authService";
import { deleteDietDay, getOne } from "../services/dietDayService";
import { AuthContext } from "../contexts/AuthContext";
import { getLikesCount, getUserLikeAvailability, postLike } from "../services/likeService";


export const Detals = () => {
  
    const navigate = useNavigate();
    const { dietDayId } = useParams();
    const {auth} = useContext(AuthContext);
    
    const [user, setUser] = useState({});
    const [dietDay, setDietDay] = useState({});
    const [show, setShow] = useState(false);
    const [likes, setLikes] = useState(0);
    const [likeAvailability, setLikeAvailability] = useState(false);
    
    useEffect(() => {
      (async () => {
        
      })();
    }, []);
    
    useEffect(() => {
      (async () => {
        const dietDayData = await getOne(dietDayId);
        setDietDay(dietDayData);

        const userData = await getPublicUser(dietDayData._ownerId);
        setUser(userData);

        const isOwner = auth._id === userData._ownerId;

        const likesCountData = await getLikesCount(dietDayId);
        setLikes(likesCountData);

        if (isOwner) {
          setLikeAvailability(false);
        } else if (Object.keys(auth).length > 0) {
          const likeAvailabilityData = await getUserLikeAvailability(auth._id, dietDayId, isOwner);
          setLikeAvailability(likeAvailabilityData);
        } else {
          setLikeAvailability(false);
        }
        
      })();
    }, []);

    const confirmationHandler = () => {
      (async () => {
          const deletedDayData= await deleteDietDay(dietDayId);
          if (deletedDayData.code === 401 || deletedDayData.code === 403) {  
              return navigate("/error401");
          } else if(deletedDayData.message) {
              alert(deletedDayData.message);
          } else {
              navigate(`/`);
          }
      })()
    };
    
    const likeHandler = () => {
      (async () => {
        const isOwner = auth._id === user._ownerId;
        setLikes(oldLikes => oldLikes+1);
        setLikeAvailability(false);
        await postLike(auth._id, dietDayId, isOwner);
    })()
    };
    

    const ownerButtons = <>
    
      <Link className="btn detailsPage-btn" to={`/edit/${dietDay._id}`}>Edit</Link> <button onClick={() => setShow(true)} className="btn delete-btn" >Delete</button>
      {show && (
            <div className="overlay">
              <div className="modal">
                <p className="confirm-message">Are you sure that you want to delete this diet day?</p>
                <div className="button-group">
                  <button className="btn button-popup" onClick={confirmationHandler}>Confirm</button>
                  <button className="btn button-popup" onClick={() => setShow(false)}>Cancel</button>
                </div>
              </div>
            </div>
          )}
    </>;
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

            <button onClick={likeHandler} className={likeAvailability ? "btn enabled-like" : "btn disabled-like"} disabled={!likeAvailability}>Like: {likes}</button>

            {user?._ownerId === auth?._id ? ownerButtons : guestButtons}
            </div>
            </div>
          </div>
          
        </>
    );
} 